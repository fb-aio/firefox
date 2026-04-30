"use strict";
(() => {

  // scripts/content/fb_blockSeenChat.js
  ((global) => {
    const decoder = new TextDecoder;
    const encoder = new TextEncoder;
    const PACKET_TYPES = [
      null,
      "connect",
      "connack",
      "publish",
      "puback",
      "pubrec",
      "pubrel",
      "pubcomp",
      "subscribe",
      "suback",
      "unsubscribe",
      "unsuback",
      "pingreq",
      "pingresp",
      "disconnect",
      "auth"
    ];
    function readRemainingLength(buffer, start) {
      let value = 0;
      let multiplier = 1;
      let index = start;
      let byte;
      do {
        if (index >= buffer.length)
          throw new Error("Invalid remaining length");
        byte = buffer[index++];
        value += (byte & 127) * multiplier;
        multiplier *= 128;
      } while (byte & 128);
      return { value, bytes: index - start };
    }
    function writeRemainingLength(len) {
      const out = [];
      do {
        let byte = len % 128;
        len = Math.floor(len / 128);
        if (len > 0)
          byte |= 128;
        out.push(byte);
      } while (len > 0);
      return out;
    }
    function createParser() {
      const listeners = { packet: [], error: [] };
      return {
        on(event, fn) {
          if (listeners[event])
            listeners[event].push(fn);
        },
        parse(buffer) {
          let cursor = 0;
          while (cursor < buffer.length) {
            let packet;
            let headerSize, remaining;
            try {
              const byte0 = buffer[cursor];
              const typeId = byte0 >> 4 & 15;
              const cmd = PACKET_TYPES[typeId];
              const rl = readRemainingLength(buffer, cursor + 1);
              headerSize = 1 + rl.bytes;
              remaining = rl.value;
              if (cursor + headerSize + remaining > buffer.length) {
                throw new Error("Incomplete packet");
              }
              packet = { cmd };
              let offset = cursor + headerSize;
              if (typeId === 3) {
                packet.qos = byte0 >> 1 & 3;
                packet.dup = !!(byte0 & 8);
                packet.retain = !!(byte0 & 1);
                const topicLen = buffer[offset] << 8 | buffer[offset + 1];
                offset += 2;
                packet.topic = decoder.decode(buffer.subarray(offset, offset + topicLen));
                offset += topicLen;
                if (packet.qos > 0) {
                  packet.messageId = buffer[offset] << 8 | buffer[offset + 1];
                  offset += 2;
                }
                packet.payload = buffer.slice(offset, cursor + headerSize + remaining);
              }
            } catch (err) {
              listeners.error.forEach((fn) => fn(err));
              return;
            }
            listeners.packet.forEach((fn) => fn(packet));
            cursor += headerSize + remaining;
          }
        }
      };
    }
    function buildPublishPacket(packet) {
      const qos = packet.qos || 0;
      const topicBytes = encoder.encode(packet.topic || "");
      let payloadBytes;
      if (packet.payload instanceof Uint8Array) {
        payloadBytes = packet.payload;
      } else if (typeof packet.payload === "string") {
        payloadBytes = encoder.encode(packet.payload);
      } else {
        payloadBytes = new Uint8Array(0);
      }
      const hasMsgId = qos > 0;
      const remaining = 2 + topicBytes.length + (hasMsgId ? 2 : 0) + payloadBytes.length;
      const rl = writeRemainingLength(remaining);
      const header = 3 << 4 | (packet.dup ? 1 : 0) << 3 | (qos & 3) << 1 | (packet.retain ? 1 : 0);
      const buffer = new Uint8Array(1 + rl.length + remaining);
      let pos = 0;
      buffer[pos++] = header;
      rl.forEach((b) => buffer[pos++] = b);
      buffer[pos++] = topicBytes.length >> 8 & 255;
      buffer[pos++] = topicBytes.length & 255;
      buffer.set(topicBytes, pos);
      pos += topicBytes.length;
      if (hasMsgId) {
        buffer[pos++] = packet.messageId >> 8 & 255;
        buffer[pos++] = packet.messageId & 255;
      }
      buffer.set(payloadBytes, pos);
      return buffer.buffer;
    }
    function safeJSON(str) {
      if (!str)
        return null;
      try {
        return JSON.parse(str);
      } catch {
        return null;
      }
    }
    function getUserIdFromCookie() {
      const match = document.cookie.match(/c_user=([0-9]+)/);
      return match ? match[1] : null;
    }
    function nowMicros() {
      return Date.now() * 1000;
    }
    const config = {
      blockSeen: true,
      blockTyping: true
    };
    const IGNORE_TOPICS = [
      "/send_additional_contacts",
      "/br_sr",
      "/sr_res",
      "/ls_app_settings"
    ];
    const IGNORE_CMDS = ["pingreq", "subscribe"];
    const userId = getUserIdFromCookie();
    if (!global.WebSocket.__patched) {
      const OriginalWS = global.WebSocket;
      const ProxyWS = new Proxy(OriginalWS, {
        construct(Target, args) {
          const socket = new Target(...args);
          function handleIncoming(evt) {
            if (!(evt.data instanceof ArrayBuffer))
              return;
            const bytes = new Uint8Array(evt.data);
            if (bytes.length < 2000)
              return;
            const parser = createParser();
            parser.on("packet", (pkt) => {
              if (pkt.cmd === "publish" && pkt.topic === "/ls_resp" && pkt.qos === 1) {}
            });
            try {
              parser.parse(bytes);
            } catch {}
          }
          socket.addEventListener("message", handleIncoming);
          const originalSend = socket.send;
          socket.send = function(...args2) {
            if (!(args2[0] instanceof ArrayBuffer)) {
              return originalSend.apply(this, args2);
            }
            const bytes = new Uint8Array(args2[0]);
            const parser = createParser();
            const sendOriginal = () => {
              if (socket.readyState === WebSocket.OPEN) {
                originalSend.apply(socket, args2);
              }
            };
            parser.on("packet", (pkt) => {
              try {
                if (IGNORE_TOPICS.includes(pkt.topic) || IGNORE_CMDS.includes(pkt.cmd)) {
                  return sendOriginal();
                }
                if (pkt.topic === "/ls_req" && pkt.payload) {
                  const parsed = safeJSON(decoder.decode(pkt.payload));
                  if (config.blockTyping && parsed?.type === 4) {
                    const inner = safeJSON(parsed.payload);
                    const payload = safeJSON(inner?.payload);
                    if (payload?.thread_key)
                      return;
                  }
                  if (config.blockSeen && parsed?.type === 3) {
                    const seen = safeJSON(parsed.payload);
                    if (seen?.tasks?.length) {
                      let modified = false;
                      for (const task of seen.tasks) {
                        if (task.label === "21" && userId) {
                          modified = true;
                          task.payload = JSON.stringify({
                            thread_id: userId,
                            last_read_watermark_ts: nowMicros()
                          });
                        }
                      }
                      if (modified) {
                        parsed.payload = JSON.stringify(seen);
                        pkt.payload = encoder.encode(JSON.stringify(parsed));
                        args2[0] = buildPublishPacket(pkt);
                        return sendOriginal();
                      }
                    }
                  }
                }
                sendOriginal();
              } catch {
                sendOriginal();
              }
            });
            parser.on("error", sendOriginal);
            parser.parse(bytes);
          };
          return socket;
        }
      });
      ProxyWS.__patched = true;
      global.WebSocket = ProxyWS;
    }
  })(window);
})();
