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

  // scripts/utils/index.js
  var utils_exports = {};
  __export(utils_exports, {
    Storage: () => Storage,
    convertBlobToBase64: () => convertBlobToBase64,
    customFetch: () => customFetch,
    getCurrentTab: () => getCurrentTab,
    getExtensionId: () => getExtensionId,
    getFBAIODashboard: () => getFBAIODashboard,
    getUserId: () => getUserId,
    hasUserId: () => hasUserId,
    mergeObject: () => mergeObject,
    runFunc: () => runFunc,
    runScriptInCurrentTab: () => runScriptInCurrentTab,
    runScriptInTab: () => runScriptInTab,
    setUserId: () => setUserId,
    sleep: () => sleep
  });
  function runFunc(fnPath = "", params = [], global = chrome) {
    return new Promise((resolve) => {
      let fn = fnPath?.startsWith("chrome") ? browserApi : global;
      fnPath.split(".").forEach((part) => {
        fn = fn?.[part] || fn;
      });
      let hasCallback = false;
      let _params = params.map((p) => {
        if (p === "callback") {
          hasCallback = true;
          return resolve;
        }
        return p;
      });
      if (typeof fn !== "function") return resolve(fn);
      try {
        let res = fn(..._params);
        if (!hasCallback) {
          if (typeof res?.then === "function") {
            res.then?.(resolve);
          } else {
            resolve(res);
          }
        }
      } catch (e) {
        console.log("ERROR runFunc: ", e);
        resolve(null);
      }
    });
  }
  function getExtensionId() {
    return browserApi.runtime.id;
  }
  async function hasUserId() {
    return !!await Storage.get("userId");
  }
  async function getUserId() {
    if (!CACHED.userID) {
      CACHED.userID = await Storage.get("userId");
    }
    if (!CACHED.userID) {
      await setUserId();
    }
    return CACHED.userID;
  }
  async function setUserId(uid) {
    if (!uid) {
      uid = (await browserApi.cookies.get({
        url: "https://www.facebook.com",
        name: "c_user"
      }))?.value || (/* @__PURE__ */ new Date()).getTime();
    }
    CACHED.userID = uid;
    await Storage.set("userId", uid);
  }
  async function getCurrentTab() {
    let tabs = await browserApi.tabs.query({ active: true, currentWindow: true });
    return tabs?.[0];
  }
  async function customFetch(url, options) {
    try {
      if (typeof options?.body === "string" && options.body.startsWith("fbaio-formData:")) {
        let body2 = options.body.replace("fbaio-formData:", "");
        body2 = JSON.parse(body2);
        options.body = new FormData();
        for (const [key, value] of Object.entries(body2)) {
          options.body.append(key, value);
        }
      }
      const res = await fetch(url, options);
      let body;
      try {
        if (res.headers.get("Content-Type").startsWith("text/")) {
          body = await res.clone().text();
        } else if (res.headers.get("Content-Type").startsWith("application/json")) {
          body = await res.clone().json();
        } else {
          const blob = await res.clone().blob();
          body = await convertBlobToBase64(blob);
        }
      } catch (e) {
        body = await res.clone().text();
      }
      const data = {
        headers: Object.fromEntries(res.headers),
        ok: res.ok,
        redirected: res.redirected,
        status: res.status,
        statusText: res.statusText,
        type: res.type,
        url: res.url,
        body
      };
      return data;
    } catch (e) {
      console.log("Fetch failed:", e);
      return null;
    }
  }
  var isFirefox, browserApi, CACHED, Storage, runScriptInCurrentTab, runScriptInTab, mergeObject, sleep, getFBAIODashboard, convertBlobToBase64;
  var init_utils = __esm({
    "scripts/utils/index.js"() {
      isFirefox = typeof browser !== "undefined" && browser.runtime;
      browserApi = isFirefox ? browser : chrome;
      CACHED = {
        userID: null
      };
      Storage = {
        set: async (key, value) => {
          await browserApi.storage.local.set({ [key]: value });
          return value;
        },
        get: async (key, defaultValue) => {
          let result = await browserApi.storage.local.get([key]);
          return result[key] || defaultValue;
        },
        remove: async (key) => {
          return await browserApi.storage.local.remove(key);
        }
      };
      runScriptInCurrentTab = async (func, args, world = "MAIN") => {
        const tab = await getCurrentTab();
        return await runScriptInTab({ func, args, target: { tabId: tab.id }, world });
      };
      runScriptInTab = async (config = {}) => {
        return new Promise((resolve, reject) => {
          browserApi.scripting.executeScript(
            mergeObject(
              {
                world: "MAIN",
                injectImmediately: true
              },
              config
            ),
            (injectionResults) => {
              if (browserApi.runtime.lastError) {
                console.error(browserApi.runtime.lastError);
                reject(browserApi.runtime.lastError);
              } else resolve(injectionResults?.find?.((_) => _.result)?.result);
            }
          );
        });
      };
      mergeObject = (...objs) => {
        let res = {};
        for (let obj of objs) for (let key in obj) if (obj[key]) res[key] = obj[key];
        return res;
      };
      sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      getFBAIODashboard = () => {
        return "https://fb-aio.github.io/entry/?rand=" + Math.random() * 1e4;
      };
      convertBlobToBase64 = (blob) => new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result;
          resolve(base64data);
        };
        reader.onerror = (error) => {
          console.log("Error: ", error);
          resolve(null);
        };
      });
    }
  });

  // scripts/content/helper/helper.js
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
    getFBAIODashboard: () => getFBAIODashboard2,
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
    sleep: () => sleep2
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
  function sleep2(ms) {
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
  var numberFormatCached, getFBAIODashboard2;
  var init_helper = __esm({
    "scripts/content/helper/helper.js"() {
      numberFormatCached = {};
      getFBAIODashboard2 = () => {
        return "https://fb-aio.github.io/entry/?rand=" + Math.random() * 1e4;
      };
    }
  });

  // scripts/content/listener.js
  (async () => {
    console.log("FB AIO: listener script INJECTED");
    window.addEventListener("message", async (event) => {
      const { from, origin, uuid, fnPath, params } = event.data || {};
      if (uuid && from === "fbaio" && (!origin || origin === location.origin)) {
        console.log("Message received:", event);
        const utils = await Promise.resolve().then(() => (init_utils(), utils_exports));
        const helpers = await Promise.resolve().then(() => (init_helper(), helper_exports));
        const GLOBAL = {
          window,
          utils,
          helpers,
          fetch: (url, options) => fetch(url, options || {}).then((res) => res.text()).catch((e) => null)
        };
        const data = await utils.runFunc(fnPath, params, GLOBAL);
        event.source.postMessage({ uuid, data }, event.origin);
      }
    });
    window.__FBAIO_EXTENSION_LISTENER_READY = true;
  })();
})();
