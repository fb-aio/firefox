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

  // src/content/threads_addDownloadVideoBtn.js
  (async () => {
    console.log("FB AIO: download video button for Threads ENABLED");
    const { onElementsAdded: onElementsAdded2, closest: closest2 } = await Promise.resolve().then(() => (init_helper(), helper_exports));
    onElementsAdded2("video", (videos) => {
      const className = "fb-aio-threads-video-download-btn";
      for (let video of videos) {
        const container = closest2(video, "img")?.parentElement || video.parentElement;
        if (container?.querySelector(`.${className}`)) continue;
        let btn = document.createElement("button");
        btn.className = className;
        btn.textContent = "\u2B07\uFE0F";
        btn.title = "FB AIO: Download video";
        btn.style.cssText = `
          position: absolute;
          top: 10px;
          right: 10px;
          width: 40px;
          height: 40px;
          background-color: #333;
          color: #fff;
          border-radius: 5px;
          border: none;
          opacity: 0.3;
          cursor: pointer;
          z-index: 2147483647;`;
        btn.addEventListener("mouseenter", () => {
          btn.style.opacity = 1;
        });
        btn.addEventListener("mouseleave", () => {
          btn.style.opacity = 0.5;
        });
        btn.onclick = (e) => {
          window.open(video.src, "_blank");
          e.stopPropagation();
        };
        container.appendChild(btn);
      }
    });
  })();
})();
