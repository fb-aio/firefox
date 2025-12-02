(() => {
  // scripts/content/external_bridge.js
  var isFirefox = typeof browser !== "undefined" && typeof browser.runtime !== "undefined";
  if (isFirefox) {
    const MESSAGE_TYPE = "FBAIO_EXTERNAL_MESSAGE";
    const RESPONSE_TYPE = "FBAIO_EXTERNAL_RESPONSE";
    const PING_TYPE = "FBAIO_PING";
    const PONG_TYPE = "FBAIO_PONG";
    window.addEventListener("message", async (event) => {
      if (event.source !== window) return;
      const { type, uuid, payload } = event.data || {};
      if (type === PING_TYPE) {
        window.postMessage(
          {
            type: PONG_TYPE,
            uuid,
            manifest: browser.runtime.getManifest()
          },
          "*"
        );
        return;
      }
      if (type === MESSAGE_TYPE) {
        try {
          const response = await browser.runtime.sendMessage(payload);
          window.postMessage(
            {
              type: RESPONSE_TYPE,
              uuid,
              response
            },
            "*"
          );
        } catch (error) {
          window.postMessage(
            {
              type: RESPONSE_TYPE,
              uuid,
              error: error.message || "Unknown error"
            },
            "*"
          );
        }
      }
    });
    console.log("FB AIO: External bridge loaded for Firefox");
  }
})();
