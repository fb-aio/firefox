(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/content/helper/ajax-hook.js
  var ajax_hook_exports = {};
  __export(ajax_hook_exports, {
    hookFetch: () => hookFetch,
    hookWS: () => hookWS,
    hookXHR: () => hookXHR
  });
  function hook(configs = []) {
    const unsubFn = [];
    for (const { fn, arr } of configs) {
      if (typeof fn !== "function" || !Array.isArray(arr)) continue;
      const id = randId();
      arr.push({ fn, id });
      unsubFn.push(() => {
        const index = arr.findIndex((e) => e.id === id);
        if (index !== -1) arr.splice(index, 1);
      });
    }
    return () => {
      unsubFn.forEach((fn) => fn?.());
    };
  }
  function randId() {
    return Math.random().toString(36).slice(2);
  }
  function initFetch() {
    const originalFetch = window.fetch;
    window.fetch = async function(urlOrRequest, options) {
      let url = urlOrRequest;
      if (urlOrRequest instanceof Request) {
        url = urlOrRequest?.url;
        options = options || {};
        for (const key in urlOrRequest) {
          const type = typeof urlOrRequest[key];
          if (type === "string" || type === "number" || type === "boolean") {
            options[key] = urlOrRequest[key];
          }
        }
      }
      let request = { url, options };
      for (const { fn } of onBeforeFetchFn) {
        const res = await fn?.(request.url, request.options)?.catch(
          console.error
        );
        if (res) request = res;
        if (res === null) return null;
      }
      if (urlOrRequest instanceof Request) {
        try {
          if (urlOrRequest.url !== request.url) {
            urlOrRequest = new Request(request.url, urlOrRequest);
          }
        } catch (e) {
          debugger;
        }
      }
      let response = await originalFetch(urlOrRequest, options);
      for (const { fn } of onAfterFetchFn) {
        const res = await fn?.(request.url, request.options, response)?.catch(
          console.error
        );
        if (res) response = res;
        if (res === null) return null;
      }
      return response;
    };
  }
  function hookFetch({ onBefore, onAfter } = {}) {
    if (!readyFetch) {
      initFetch();
      readyFetch = true;
    }
    return hook([
      { fn: onBefore, arr: onBeforeFetchFn },
      { fn: onAfter, arr: onAfterFetchFn }
    ]);
  }
  function initXhr() {
    const orig = window.XMLHttpRequest;
    window.XMLHttpRequest = new Proxy(orig, {
      construct(target, args) {
        const instance = new target(...args);
        let p;
        const open = instance.open;
        instance.open = async function(method, url, async, user, password, ...rest) {
          p = { method, url, async, user, password };
          for (const { fn } of onBeforeOpenXHRFn) {
            const res = await fn?.(p);
            if (res) p = res;
            if (res === null) return;
          }
          return open.apply(this, [
            p.method,
            p.url,
            p.async,
            p.user,
            p.password,
            ...rest
          ]);
        };
        const send = instance.send;
        instance.send = async function(dataSend) {
          for (const { fn } of onBeforeSendXHRFn) {
            const res = await fn?.(p, dataSend);
            if (res) dataSend = res;
            if (res === null) return;
          }
          instance.addEventListener("load", function() {
            for (const { fn } of onAfterSendXHRFn)
              fn?.(p, dataSend, instance.response);
          });
          return send.apply(this, [dataSend]);
        };
        return instance;
      }
    });
  }
  function hookXHR({ onBeforeOpen, onBeforeSend, onAfterSend } = {}) {
    if (!readyXhr) {
      initXhr();
      readyXhr = true;
    }
    return hook([
      { fn: onBeforeOpen, arr: onBeforeOpenXHRFn },
      { fn: onBeforeSend, arr: onBeforeSendXHRFn },
      { fn: onAfterSend, arr: onAfterSendXHRFn }
    ]);
  }
  function initWS() {
    const _WS = WebSocket;
    WebSocket = function(url, protocols) {
      let WSObject;
      for (let { fn } of modifyUrlWsFn) {
        let _url = fn?.(url);
        if (_url) url = _url;
        if (_url === null) return null;
      }
      this.url = url;
      this.protocols = protocols;
      if (!this.protocols) {
        WSObject = new _WS(url);
      } else {
        WSObject = new _WS(url, protocols);
      }
      const _send = WSObject.send;
      WSObject.send = function() {
        let arg0 = arguments[0];
        for (const { fn } of onBeforeWSFn) {
          const res = fn?.(arg0, WSObject.url, WSObject);
          if (res) arg0 = res;
          if (res === null) return;
        }
        arguments[0] = arg0;
        _send.apply(this, arguments);
      };
      WSObject._addEventListener = WSObject.addEventListener;
      WSObject.addEventListener = function() {
        const eventThis = this;
        if (arguments[0] === "message") {
          arguments[1] = /* @__PURE__ */ function(userFunc) {
            return async function instrumentAddEventListener() {
              let arg0 = arguments[0];
              for (const { fn } of onAfterWSFn) {
                const res = await fn?.(
                  new MutableMessageEvent(arg0),
                  WSObject.url,
                  WSObject
                );
                if (res) arg0 = res;
                if (res === null) return;
              }
              arguments[0] = arg0;
              userFunc.apply(eventThis, arguments);
            };
          }(arguments[1]);
        }
        return WSObject._addEventListener.apply(this, arguments);
      };
      Object.defineProperty(WSObject, "onmessage", {
        set: function() {
          const eventThis = this;
          const userFunc = arguments[0];
          const onMessageHandler = async function() {
            let arg0 = arguments[0];
            for (const { fn } of onAfterWSFn) {
              const res = await fn?.(
                new MutableMessageEvent(arg0),
                WSObject.url,
                WSObject
              );
              if (res) arg0 = res;
              if (res === null) return;
            }
            arguments[0] = arg0;
            userFunc.apply(eventThis, arguments);
          };
          WSObject._addEventListener.apply(this, [
            "message",
            onMessageHandler,
            false
          ]);
        }
      });
      return WSObject;
    };
  }
  function hookWS({ onBefore, onAfter, modifyUrl } = {}) {
    if (!readyWs) {
      initWS();
      readyWs = true;
    }
    return hook([
      { fn: modifyUrl, arr: modifyUrlWsFn },
      { fn: onBefore, arr: onBeforeWSFn },
      { fn: onAfter, arr: onAfterWSFn }
    ]);
  }
  function MutableMessageEvent(o) {
    this.bubbles = o.bubbles || false;
    this.cancelBubble = o.cancelBubble || false;
    this.cancelable = o.cancelable || false;
    this.currentTarget = o.currentTarget || null;
    this.data = o.data || null;
    this.defaultPrevented = o.defaultPrevented || false;
    this.eventPhase = o.eventPhase || 0;
    this.lastEventId = o.lastEventId || "";
    this.origin = o.origin || "";
    this.path = o.path || new Array(0);
    this.ports = o.parts || new Array(0);
    this.returnValue = o.returnValue || true;
    this.source = o.source || null;
    this.srcElement = o.srcElement || null;
    this.target = o.target || null;
    this.timeStamp = o.timeStamp || null;
    this.type = o.type || "message";
    this.__proto__ = o.__proto__ || MessageEvent.__proto__;
  }
  var onBeforeFetchFn, onAfterFetchFn, readyFetch, onBeforeOpenXHRFn, onBeforeSendXHRFn, onAfterSendXHRFn, readyXhr, modifyUrlWsFn, onBeforeWSFn, onAfterWSFn, readyWs;
  var init_ajax_hook = __esm({
    "src/content/helper/ajax-hook.js"() {
      onBeforeFetchFn = [];
      onAfterFetchFn = [];
      readyFetch = false;
      onBeforeOpenXHRFn = [];
      onBeforeSendXHRFn = [];
      onAfterSendXHRFn = [];
      readyXhr = false;
      modifyUrlWsFn = [];
      onBeforeWSFn = [];
      onAfterWSFn = [];
      readyWs = false;
    }
  });

  // src/content/helper/helper.js
  var helper_exports = {};
  __export(helper_exports, {
    closest: () => closest,
    createTrustedHtml: () => createTrustedHtml,
    createTrustedScript: () => createTrustedScript,
    deepFind: () => deepFind,
    downloadData: () => downloadData,
    downloadUrl: () => downloadUrl,
    executeScript: () => executeScript,
    getExtStorage: () => getExtStorage,
    getFBAIODashboard: () => getFBAIODashboard,
    getNumberFormatter: () => getNumberFormatter,
    getTrustedPolicy: () => getTrustedPolicy,
    getURL: () => getURL,
    injectCssCode: () => injectCssCode,
    injectCssFile: () => injectCssFile,
    injectScriptSrc: () => injectScriptSrc,
    injectScriptSrcAsync: () => injectScriptSrcAsync,
    loadingFullScreen: () => loadingFullScreen,
    notify: () => notify,
    onElementRemoved: () => onElementRemoved,
    onElementsAdded: () => onElementsAdded,
    parseSafe: () => parseSafe,
    runInBackground: () => runInBackground,
    runInContentScript: () => runInContentScript,
    sanitizeName: () => sanitizeName,
    sendToContentScript: () => sendToContentScript,
    setExtStorage: () => setExtStorage,
    sleep: () => sleep
  });
  function sendToContentScript(event, data) {
    return new Promise((resolve, reject) => {
      let uuid = Math.random().toString(36);
      let listenerKey = "aio-contentscript-sendto-pagescript" + uuid;
      window.addEventListener(listenerKey, (evt) => resolve(evt.detail.data), {
        once: true
      });
      window.dispatchEvent(
        new CustomEvent("aio-pagescript-sendto-contentscript", {
          detail: { event, data, uuid }
        })
      );
    });
  }
  function runInContentScript(fnPath, params) {
    return sendToContentScript("aio-runInContentScript", {
      fnPath,
      params
    });
  }
  function runInBackground(fnPath, params) {
    return sendToContentScript("aio-runInBackground", {
      fnPath,
      params
    });
  }
  function getURL(filePath) {
    return runInContentScript("chrome.runtime.getURL", [filePath]);
  }
  async function getExtStorage(key) {
    return runInContentScript("utils.Storage.get", [key]);
  }
  async function setExtStorage(key, value) {
    return runInContentScript("utils.Storage.set", [key, value]);
  }
  function notify({
    msg = "",
    x = window.innerWidth / 2,
    y = window.innerHeight - 100,
    align = "center",
    styleText = "",
    duration = 3e3,
    id = "aio_notify_div"
  } = {}) {
    let exist = document.getElementById(id);
    if (exist) exist.remove();
    let div = document.createElement("div");
    div.id = id;
    div.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        padding: 10px;
        background-color: #333;
        color: #fff;
        border-radius: 5px;
        z-index: 2147483647;
        transition: all 1s ease-out;
        ${align === "right" ? "transform: translateX(-100%);" : align === "center" ? "transform: translateX(-50%);" : ""}
        ${styleText || ""}
      `;
    div.innerHTML = createTrustedHtml(msg);
    (document.body || document.documentElement).appendChild(div);
    let timeouts = [];
    function closeAfter(_time) {
      timeouts.forEach((t) => clearTimeout(t));
      timeouts = [
        setTimeout(() => {
          if (div) {
            div.style.opacity = 0;
            div.style.top = `${y - 50}px`;
          }
        }, _time - 1e3),
        setTimeout(() => {
          div?.remove();
        }, _time)
      ];
    }
    if (duration > 0) closeAfter(duration);
    return {
      closeAfter,
      remove() {
        if (div) {
          div.remove();
          div = null;
          return true;
        }
        return false;
      },
      setText(text, duration2) {
        if (div) {
          div.innerHTML = createTrustedHtml(text);
          if (duration2) closeAfter(duration2);
          return true;
        }
        return false;
      },
      setPosition(x2, y2) {
        if (div) {
          div.style.left = `${x2}px`;
          div.style.top = `${y2}px`;
          return true;
        }
        return false;
      }
    };
  }
  function loadingFullScreen(text = "") {
    const noti = notify({
      msg: text,
      styleText: `
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #0006;
    `,
      align: "",
      duration: 0,
      id: "aio_loading_fullscreen"
    });
    return noti;
  }
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  function getNumberFormatter(optionSelect, locale) {
    if (!locale) {
      if (document.documentElement.lang) {
        locale = document.documentElement.lang;
      } else if (navigator.language) {
        locale = navigator.language;
      } else {
        try {
          locale = new URL(
            Array.from(document.querySelectorAll("head > link[rel='search']"))?.find((n) => n?.getAttribute("href")?.includes("?locale="))?.getAttribute("href")
          )?.searchParams?.get("locale");
        } catch {
          console.log(
            "Cannot find browser locale. Use en as default for number formatting."
          );
          locale = "en";
        }
      }
    }
    let formatterNotation;
    let formatterCompactDisplay;
    switch (optionSelect) {
      case "compactLong":
        formatterNotation = "compact";
        formatterCompactDisplay = "long";
        break;
      case "standard":
        formatterNotation = "standard";
        formatterCompactDisplay = "short";
        break;
      case "compactShort":
      default:
        formatterNotation = "compact";
        formatterCompactDisplay = "short";
    }
    let key = locale + formatterNotation + formatterCompactDisplay;
    if (!numberFormatCached[key]) {
      const formatter = Intl.NumberFormat(locale, {
        notation: formatterNotation,
        compactDisplay: formatterCompactDisplay
      });
      numberFormatCached[key] = formatter;
    }
    return numberFormatCached[key];
  }
  function onElementsAdded(selector, callback, once) {
    let nodes = document.querySelectorAll(selector);
    if (nodes?.length) {
      callback(nodes);
      if (once) return;
    }
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (!mutation.addedNodes) return;
        for (let node of mutation.addedNodes) {
          if (node.nodeType != 1) continue;
          let n = node.matches(selector) ? [node] : Array.from(node.querySelectorAll(selector));
          if (n?.length) {
            callback(n);
            if (once) observer.disconnect();
          }
        }
      });
    });
    observer.observe(document, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false
    });
    return () => observer.disconnect();
  }
  function onElementRemoved(element, callback) {
    if (!element.parentElement) throw new Error("element must have parent");
    let observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === "childList") {
          if (mutation.removedNodes.length > 0) {
            for (let node of mutation.removedNodes) {
              if (node === element) {
                callback?.(node);
                observer.disconnect();
              }
            }
          }
        }
      });
    });
    observer.observe(element.parentElement, {
      childList: true
    });
    return () => observer.disconnect();
  }
  function closest(element, selector) {
    let el = element;
    while (el !== null) {
      if (el.matches(selector)) return el;
      let found = el.querySelector(selector);
      if (found) return found;
      el = el.parentElement;
    }
    return el;
  }
  function deepFind(obj, path, once = true, exactPath = false) {
    if (!obj || typeof obj !== "object") return once ? null : [];
    const paths = Array.isArray(path) ? path : path.split(".");
    const result = [];
    const stack = [
      {
        currentObj: obj,
        currentPathIndex: 0,
        correctPath: false
      }
    ];
    let foundFirstPath = false;
    while (stack.length) {
      const { currentObj, currentPathIndex, correctPath } = stack.pop();
      if (currentPathIndex === paths.length) {
        const res = !exactPath ? currentObj : correctPath ? currentObj : null;
        if (once) return res;
        result.push(res);
        continue;
      }
      const key = paths[currentPathIndex];
      if (typeof currentObj === "object" && currentObj !== null) {
        if (key in currentObj) {
          foundFirstPath = true;
          stack.push({
            currentObj: currentObj[key],
            currentPathIndex: currentPathIndex + 1,
            correctPath: true
          });
        }
        if (!exactPath || !foundFirstPath) {
          Object.entries(currentObj).forEach(([_key, value]) => {
            if (_key !== key && typeof value === "object" && value !== null) {
              stack.push({
                currentObj: value,
                currentPathIndex,
                correctPath: false
              });
            }
          });
        }
      }
    }
    return once ? null : result;
  }
  function parseSafe(str = "", defaultValue = {}) {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.log("Cannot parse JSON", e, str);
      return defaultValue;
    }
  }
  function downloadUrl(url, filename) {
    try {
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.style.display = "none";
      a.click();
      a.remove();
    } catch (e) {
      window.open(url, "_blank");
    }
  }
  function downloadData(data, filename, type = "text/plain") {
    let file = new Blob([data], { type });
    if (window.navigator.msSaveOrOpenBlob)
      window.navigator.msSaveOrOpenBlob(file, filename);
    else {
      let a = document.createElement("a"), url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }
  function sanitizeName(name, modifyIfPosible = true) {
    if (typeof name !== "string") {
      throw new Error("Input must be string");
    }
    const replacement = "";
    const illegalRe = /[\/\?<>\\:\*\|"]/g;
    const controlRe = /[\x00-\x1f\x80-\x9f]/g;
    const reservedRe = /^\.+$/;
    const windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
    const windowsTrailingRe = /[\. ]+$/;
    if (modifyIfPosible) {
      name = name.replaceAll("<", "\u2039").replaceAll(">", "\u203A").replaceAll(":", "\u2236").replaceAll('"', "\u2033").replaceAll("/", "\u2215").replaceAll("\\", "\u2216").replaceAll("|", "\xA6").replaceAll("?", "\xBF");
    }
    const sanitized = name.replace(illegalRe, replacement).replace(controlRe, replacement).replace(reservedRe, replacement).replace(windowsReservedRe, replacement).replace(windowsTrailingRe, replacement);
    return sanitized;
  }
  function injectCssCode(code) {
    let css = document.createElement("style");
    if ("textContent" in css) css.textContent = code;
    else css.innerText = code;
    (document.head || document.documentElement).appendChild(css);
    return css;
  }
  function injectCssFile(filePath, id) {
    let css = document.createElement("link");
    css.setAttribute("rel", "stylesheet");
    css.setAttribute("type", "text/css");
    css.setAttribute("href", filePath);
    if (id) css.setAttribute("id", id);
    (document.head || document.documentElement).appendChild(css);
    return css;
  }
  function executeScript(code) {
    let script = document.createElement("script");
    script.textContent = createTrustedScript(code);
    (document.head || document.documentElement).appendChild(script);
    script.onload = function() {
      script.remove();
    };
  }
  function getTrustedPolicy() {
    let policy = window.trustedTypes?.ufsTrustedTypesPolicy || null;
    if (!policy) {
      policy = window.trustedTypes.createPolicy("ufsTrustedTypesPolicy", {
        createHTML: (string, sink) => string,
        createScriptURL: (string) => string,
        createScript: (string) => string
      });
    }
    return policy;
  }
  function createTrustedHtml(html) {
    let policy = getTrustedPolicy();
    return policy.createHTML(html);
  }
  function createTrustedScript(code) {
    let policy = getTrustedPolicy();
    return policy.createScript(code);
  }
  function injectScriptSrc(src, callback) {
    let policy = getTrustedPolicy();
    let jsSrc = policy.createScriptURL(src);
    let script = document.createElement("script");
    script.onload = function() {
      callback?.(true);
    };
    script.onerror = function(e) {
      callback?.(false, e);
    };
    script.src = jsSrc;
    (document.head || document.documentElement).appendChild(script);
    return script;
  }
  function injectScriptSrcAsync(src) {
    return new Promise((resolve) => {
      injectScriptSrc(src, (success) => {
        resolve(success);
      });
    });
  }
  var numberFormatCached, getFBAIODashboard;
  var init_helper = __esm({
    "src/content/helper/helper.js"() {
      numberFormatCached = {};
      getFBAIODashboard = () => {
        return "https://fb-aio.github.io/entry/?rand=" + Math.random() * 1e4;
      };
    }
  });

  // src/content/tiktok_addDownloadVideoBtn.js
  (async () => {
    console.log("FB AIO: Tiktok add download video button ENABLED");
    const { hookFetch: hookFetch2 } = await Promise.resolve().then(() => (init_ajax_hook(), ajax_hook_exports));
    const {
      notify: notify2,
      downloadData: downloadData2,
      closest: closest2,
      sanitizeName: sanitizeName2,
      injectCssCode: injectCssCode2,
      getFBAIODashboard: getFBAIODashboard2
    } = await Promise.resolve().then(() => (init_helper(), helper_exports));
    const videoById = /* @__PURE__ */ new Map();
    window.fbaio_tiktok_addDownloadVideoBtn = () => videoById;
    notify2({
      msg: "FB AIO: Tiktok add download button ENABLED"
    });
    hookFetch2({
      onAfter: async (url, options, response) => {
        const isItemList = url.includes("item_list/");
        const isSearch = url.includes("api/search");
        if (isItemList || isSearch) {
          let count = 0;
          const res = response.clone();
          const json = await res.json();
          console.log(json);
          const list = json?.itemList || json?.item_list || json?.data;
          if (list?.length) {
            list.forEach((_) => {
              const item = _?.item || _;
              if (item?.video?.id) {
                videoById.set(item.video.id, item);
                count++;
              }
            });
          }
          if (count > 0) {
            notify2({
              msg: `FB AIO: Found ${count} videos (Total: ${videoById.size})`
            });
          }
        }
      }
    });
    const id = "fb-aio-tiktok-download-btn";
    function hasDownloadBtn(ele, vidId) {
      const target = ele.querySelector(`.${id}`);
      return target && (!vidId || target.dataset.id === vidId);
    }
    function removeDownloadBtn(ele) {
      const target = ele.querySelector(`.${id}`);
      if (target) {
        target.remove();
      }
    }
    injectCssCode2(`
      .fb-aio-trigger {
        position: relative;
        color: white;
        z-index: 2;
      }
      .fb-aio-trigger button {
        background: #ffffff1f;
        color: white;
      }
      .fb-aio-trigger button:hover {
        background: #ffffff3f !important;
      }
      .fb-aio-content {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        border-radius: 10px;
        padding: 5px;
        background-color: #333;
        min-width: 200px;
      }
      .fb-aio-content button {
        width: 100%;
        padding: 5px;
        text-align: left;
      }
      .fb-aio-trigger:hover .fb-aio-content,
      .fb-aio-content:hover {
        display: block;
      }`);
    function createDownloadButton({
      video,
      btnStyle = "",
      containerStyle = "",
      contentStyle = ""
    }) {
      const container = document.createElement("div");
      container.style.cssText = containerStyle;
      container.dataset.id = video?.id;
      container.classList.add("fb-aio-trigger", id);
      const btn = document.createElement("button");
      btn.style.cssText = btnStyle;
      btn.textContent = "\u2B07\uFE0F";
      btn.title = "FB AIO: Download video";
      btn.addEventListener("click", () => {
      });
      container.appendChild(btn);
      const content = document.createElement("div");
      content.style.cssText = contentStyle;
      content.classList.add("fb-aio-content");
      const fbaio = document.createElement("p");
      fbaio.textContent = "FB AIO";
      content.appendChild(fbaio);
      const filename = sanitizeName2(
        video.desc?.slice?.(0, 50) || video?.id || "tiktok_video"
      );
      const title = document.createElement("p");
      title.textContent = filename;
      content.appendChild(title);
      const btns = [
        {
          text: "\u{1F3AC} Video - no watermark",
          onClick: () => {
            window.open(video?.video?.playAddr, "_blank");
          }
        },
        {
          text: "\u{1F3AC} Video - watermark",
          onClick: () => {
            const url = video?.video?.downloadAddr;
            window.open(url, "_blank");
          }
        },
        video?.music?.id ? {
          text: "\u{1F3A7} Music: " + video?.music?.title,
          onClick: () => {
            const url = video?.music?.playUrl;
            if (url) window.open(url, "_blank");
            else alert("Can not download this music (no URL)");
          }
        } : null,
        {
          text: "\u{1F4DD} JSON Data",
          onClick: () => {
            downloadData2(JSON.stringify(video, null, 4), filename + ".json");
          }
        },
        {
          text: "\u{1F4DD} ALL " + videoById.size + " videos (JSON)",
          onClick: () => {
            const data = Array.from(videoById.values());
            downloadData2(
              JSON.stringify(data, null, 4),
              data.length + "_tiktok_videos.json"
            );
          }
        }
      ].filter(Boolean);
      btns.forEach((_) => {
        const btn2 = document.createElement("button");
        btn2.textContent = _.text;
        btn2.addEventListener("click", _.onClick);
        content.appendChild(btn2);
      });
      container.appendChild(content);
      return container;
    }
    const allId = "fb-aio-tiktok-download-all-btn";
    const downloadAllBtn = document.createElement("button");
    downloadAllBtn.id = allId;
    downloadAllBtn.textContent = "\u2B07\uFE0F Download all";
    downloadAllBtn.title = "FB AIO: Download all videos";
    downloadAllBtn.style.cssText = `
    padding: 10px;
    background: #2c68dc;
    border-radius: 5px;
    color: white;
  `;
    downloadAllBtn.addEventListener("click", () => {
      window.open(
        getFBAIODashboard2() + `/#/bulk-downloader?platform=Tiktok&targetId=${location.href}`,
        "_blank"
      );
    });
    setInterval(() => {
      const user_btn_row = document.querySelector(
        '[data-e2e="user-page"] [class*="DivButtonPanelWrapper"]'
      );
      if (user_btn_row && !user_btn_row.querySelector(`#${allId}`)) {
        user_btn_row.append(downloadAllBtn);
      }
      const feed_videos = Array.from(
        document.querySelectorAll('[data-e2e="feed-video"]')
      );
      for (const feed of feed_videos) {
        const actionBar = closest2(feed, '[class*="SectionActionBarContainer"]');
        if (actionBar && !hasDownloadBtn(actionBar)) {
          const vidId = feed.querySelector("[id*=xgwrapper-0]")?.id?.split("-")?.at(-1);
          if (vidId && videoById.has(vidId)) {
            const btn = createDownloadButton({
              video: videoById.get(vidId),
              btnStyle: `
              width: 48px;
              height: 48px;
              border-radius: 50%;`,
              containerStyle: `
              margin-bottom: 15px;`
            });
            actionBar.prepend(btn);
          }
        }
      }
      const search_videos = Array.from(
        document.querySelectorAll(
          '[data-e2e="search_top-item"], [data-e2e="search_video-item"]'
        )
      );
      const explore_videos = Array.from(
        document.querySelectorAll('[data-e2e="explore-item"]')
      );
      for (const item of [...explore_videos, ...search_videos]) {
        if (!hasDownloadBtn(item)) {
          const vidId = item.querySelector('a[href*="tiktok.com"][href*="/video/"]')?.href?.split("video/")?.at(-1);
          if (vidId && videoById.has(vidId)) {
            console.log("explore", item);
            const btn = createDownloadButton({
              video: videoById.get(vidId),
              btnStyle: `
              width: 48px;
              height: 48px;
              border-radius: 10px;`,
              containerStyle: `
              position: absolute;
              top: 0;
              right: 0;`,
              contentStyle: `
              right: 0;
              left: auto;`
            });
            item.appendChild(btn);
          }
        }
      }
      const detail_vids = Array.from(
        document.querySelectorAll('[data-e2e="detail-video"]')
      );
      for (const detail of detail_vids) {
        const vidId = detail.querySelector('[id*="xgwrapper"]')?.id?.split("-")?.at(-1);
        if (!hasDownloadBtn(detail, vidId)) {
          if (vidId && videoById.has(vidId)) {
            removeDownloadBtn(detail);
            console.log("detail", detail);
            const btn = createDownloadButton({
              video: videoById.get(vidId),
              btnStyle: `
              width: 48px;
              height: 48px;
              border-radius: 10px;`,
              containerStyle: `
              position: absolute;
              top: 0;
              left: 0;`,
              contentStyle: `
              z-index: 100;
            `
            });
            detail.appendChild(btn);
          }
        }
      }
      const you_may_like_vids = Array.from(
        document.querySelectorAll(
          '[class*="DivItemContainer"], [class*="DivItemContainerV2"]'
        )
      );
      for (const vid of you_may_like_vids) {
        if (!hasDownloadBtn(vid)) {
          const vidId = vid.querySelector('a[href*="/video/"]')?.href?.split("video/")?.at(-1);
          if (vidId && videoById.has(vidId)) {
            console.log("you may like", vid);
            const btn = createDownloadButton({
              video: videoById.get(vidId),
              btnStyle: `
              width: 48px;
              height: 48px;
              border-radius: 10px;`,
              containerStyle: `
              position: absolute;
              top: 0;
              right: 0;`,
              contentStyle: `
              right: 0;
              left: auto;`
            });
            vid.style.position = "relative";
            vid.appendChild(btn);
          }
        }
      }
      const fullscreen_vids = Array.from(
        document.querySelectorAll(
          '[role="dialog"][class*="DivBrowserModeContainer"]'
        )
      );
      for (const full of fullscreen_vids) {
        const vidId = full.querySelector('[data-e2e="browse-video"] [id*="xgwrapper"]')?.id?.split("-")?.at(-1);
        if (!hasDownloadBtn(full, vidId)) {
          const row = full.querySelector('[data-e2e="browse-like-icon"]')?.parentElement?.parentElement;
          if (vidId && row && videoById.has(vidId)) {
            removeDownloadBtn(full);
            console.log("full", full);
            const btn = createDownloadButton({
              video: videoById.get(vidId),
              btnStyle: `
                width: 32px;
                height: 32px;
                border-radius: 10px;`,
              containerStyle: ``,
              contentStyle: `
                z-index: 100;`
            });
            row.prepend(btn);
          }
        }
      }
    }, 1e3);
    window.addEventListener("load", () => {
      const interval = setInterval(() => {
        if (window?.__UNIVERSAL_DATA_FOR_REHYDRATION__) {
          const data = JSON.parse(
            window.__UNIVERSAL_DATA_FOR_REHYDRATION__.textContent
          );
          const vidData = data?.__DEFAULT_SCOPE__?.["webapp.video-detail"]?.itemInfo?.itemStruct;
          const id2 = vidData?.video?.id || vidData?.id;
          if (id2) {
            videoById.set(id2, vidData);
            clearInterval(interval);
          }
        }
      }, 1e3);
    });
  })();
})();
