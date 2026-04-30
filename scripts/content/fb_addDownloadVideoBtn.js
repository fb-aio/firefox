(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, {
        get: all[name],
        enumerable: true,
        configurable: true,
        set: (newValue) => all[name] = () => newValue
      });
  };
  var __esm = (fn, res) => () => (fn && (res = fn(fn = 0)), res);

  // scripts/content/helper/helper.js
  var exports_helper = {};
  __export(exports_helper, {
    sleep: () => sleep,
    setExtStorage: () => setExtStorage,
    sendToContentScript: () => sendToContentScript,
    sanitizeName: () => sanitizeName,
    runInContentScript: () => runInContentScript,
    runInBackground: () => runInBackground,
    parseSafe: () => parseSafe,
    onElementsAdded: () => onElementsAdded,
    onElementRemoved: () => onElementRemoved,
    notify: () => notify,
    loadingFullScreen: () => loadingFullScreen,
    injectScriptSrcAsync: () => injectScriptSrcAsync,
    injectScriptSrc: () => injectScriptSrc,
    injectCssFile: () => injectCssFile,
    injectCssCode: () => injectCssCode,
    getURL: () => getURL,
    getTrustedPolicy: () => getTrustedPolicy,
    getNumberFormatter: () => getNumberFormatter,
    getFBAIODashboard: () => getFBAIODashboard,
    getExtStorage: () => getExtStorage,
    executeScript: () => executeScript,
    downloadUrl: () => downloadUrl,
    downloadData: () => downloadData,
    deepFind: () => deepFind,
    createTrustedScript: () => createTrustedScript,
    createTrustedHtml: () => createTrustedHtml,
    closest: () => closest
  });
  function sendToContentScript(event, data) {
    return new Promise((resolve, reject) => {
      let uuid = Math.random().toString(36);
      let listenerKey = "aio-contentscript-sendto-pagescript" + uuid;
      window.addEventListener(listenerKey, (evt) => resolve(evt.detail.data), {
        once: true
      });
      window.dispatchEvent(new CustomEvent("aio-pagescript-sendto-contentscript", {
        detail: { event, data, uuid }
      }));
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
    duration = 3000,
    id = "aio_notify_div"
  } = {}) {
    let exist = document.getElementById(id);
    if (exist)
      exist.remove();
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
        }, _time - 1000),
        setTimeout(() => {
          div?.remove();
        }, _time)
      ];
    }
    if (duration > 0)
      closeAfter(duration);
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
          if (duration2)
            closeAfter(duration2);
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
          locale = new URL(Array.from(document.querySelectorAll("head > link[rel='search']"))?.find((n) => n?.getAttribute("href")?.includes("?locale="))?.getAttribute("href"))?.searchParams?.get("locale");
        } catch {
          console.log("Cannot find browser locale. Use en as default for number formatting.");
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
      if (once)
        return;
    }
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (!mutation.addedNodes)
          return;
        for (let node of mutation.addedNodes) {
          if (node.nodeType != 1)
            continue;
          let n = node.matches(selector) ? [node] : Array.from(node.querySelectorAll(selector));
          if (n?.length) {
            callback(n);
            if (once)
              observer.disconnect();
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
    if (!element.parentElement)
      throw new Error("element must have parent");
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
      if (el.matches(selector))
        return el;
      let found = el.querySelector(selector);
      if (found)
        return found;
      el = el.parentElement;
    }
    return el;
  }
  function deepFind(obj, path, once = true, exactPath = false) {
    if (!obj || typeof obj !== "object")
      return once ? null : [];
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
        if (once)
          return res;
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
      name = name.replaceAll("<", "‹").replaceAll(">", "›").replaceAll(":", "∶").replaceAll('"', "″").replaceAll("/", "∕").replaceAll("\\", "∖").replaceAll("|", "¦").replaceAll("?", "¿");
    }
    const sanitized = name.replace(illegalRe, replacement).replace(controlRe, replacement).replace(reservedRe, replacement).replace(windowsReservedRe, replacement).replace(windowsTrailingRe, replacement);
    return sanitized;
  }
  function injectCssCode(code) {
    let css = document.createElement("style");
    if ("textContent" in css)
      css.textContent = code;
    else
      css.innerText = code;
    (document.head || document.documentElement).appendChild(css);
    return css;
  }
  function injectCssFile(filePath, id) {
    let css = document.createElement("link");
    css.setAttribute("rel", "stylesheet");
    css.setAttribute("type", "text/css");
    css.setAttribute("href", filePath);
    if (id)
      css.setAttribute("id", id);
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
  var numberFormatCached, getFBAIODashboard = () => {
    return "https://fb-aio.github.io/entry/?rand=" + Math.random() * 1e4;
  };
  var init_helper = __esm(() => {
    numberFormatCached = {};
  });

  // scripts/content/fb_addDownloadVideoBtn.js
  (async () => {
    console.log("FB AIO: FB add download video button ENABLED");
    const { onElementsAdded: onElementsAdded2, getFBAIODashboard: getFBAIODashboard2 } = await Promise.resolve().then(() => (init_helper(), exports_helper));
    const videoContainerSelector = [
      "[data-video-id]",
      "[data-instancekey]",
      '[data-visualcompletion="ignore"]'
    ].join(",");
    function closestAncestor(element, selector, boundary = null) {
      let el = element;
      while (el && el.nodeType === Node.ELEMENT_NODE) {
        if (el.matches?.(selector))
          return el;
        if (boundary && el === boundary)
          break;
        el = el.parentElement;
      }
      return null;
    }
    function getVideoScope(videoEle) {
      if (!videoEle)
        return null;
      return closestAncestor(videoEle, videoContainerSelector) || videoEle.parentElement;
    }
    function getCurrentVideo(videoEle, container) {
      if (videoEle?.isConnected && (!container || container.contains(videoEle))) {
        return videoEle;
      }
      return container?.querySelector?.("video") || null;
    }
    const facebookVideoLinkSelector = [
      "a[href*='/reel/']",
      "a[href*='/watch/?v=']",
      "a[href*='/watch?v=']",
      "a[href*='/videos/']",
      "a[href*='video_id=']",
      "a[href*='videoid=']"
    ].join(",");
    function isNumericString(str) {
      return typeof str === "string" && /^[0-9]+$/.test(str);
    }
    function cleanNumericId(value) {
      if (!value)
        return "";
      const id = String(value).split("?")[0].split("&")[0];
      return isNumericString(id) && id !== "ifu" ? id : "";
    }
    function getVideoIdFromUrl(url) {
      if (!url)
        return "";
      const href = String(url);
      const parts = href.split("/");
      let idpost = "";
      if (href.includes("/reel/")) {
        idpost = cleanNumericId(parts[4]);
        if (idpost)
          return idpost;
      }
      if (href.includes("/videos/")) {
        const videoIndex = parts.indexOf("videos");
        idpost = cleanNumericId(parts[videoIndex + 1]);
        if (idpost)
          return idpost;
      }
      if (href.includes("pagechienca/")) {
        idpost = cleanNumericId(parts[5]);
        if (idpost)
          return idpost;
      }
      if (href.includes("=")) {
        idpost = cleanNumericId(href.split("=")[1]);
        if (idpost)
          return idpost;
      }
      idpost = cleanNumericId(parts[5]);
      if (idpost)
        return idpost;
      idpost = cleanNumericId(parts[6]);
      if (idpost)
        return idpost;
      return "";
    }
    function getVideoIdFromPageUrl() {
      const reelpost = location.pathname.includes("/reel/");
      const videourl = location.pathname.includes("/videos/");
      const watchurl = location.pathname.startsWith("/watch");
      if (!reelpost && !videourl && !watchurl)
        return "";
      return getVideoIdFromUrl(location.href);
    }
    function getClosestInstanceKeyElement(videoEle, container) {
      return closestAncestor(videoEle, 'div[data-instancekey^="id-vpuid"]') || closestAncestor(container, 'div[data-instancekey^="id-vpuid"]') || Array.from(document.querySelectorAll('div[data-instancekey^="id-vpuid"]')).find((element) => element.contains(videoEle)) || null;
    }
    function getVideoIdFromStorySaverDom(videoEle, container) {
      const pageVideoId = getVideoIdFromPageUrl();
      if (pageVideoId)
        return pageVideoId;
      let max = getClosestInstanceKeyElement(videoEle, container) || videoEle?.parentElement || container;
      let maxadd = 0;
      while (max && max !== document.body) {
        const query = max.querySelectorAll?.(facebookVideoLinkSelector);
        if (query?.length) {
          for (let item of query) {
            const idpost = getVideoIdFromUrl(item.href);
            if (idpost)
              return idpost;
          }
        }
        maxadd += 1;
        if (maxadd > 100)
          break;
        max = max.parentElement;
      }
      return "";
    }
    function getReactFiber(element) {
      if (!element)
        return null;
      for (let key in element) {
        if (key.startsWith("__reactFiber$") || key.startsWith("__reactInternalInstance$")) {
          return element[key];
        }
      }
      return null;
    }
    function getFiberName(fiber) {
      const type = fiber?.elementType || fiber?.type;
      return type?.displayName || type?.name || fiber?._debugOwner?.elementType?.displayName || fiber?._debugOwner?.elementType?.name || fiber?._debugOwner?.type?.displayName || fiber?._debugOwner?.type?.name || "";
    }
    function getVideoIdFromProps(props) {
      const id = props?.video?.id;
      return cleanNumericId(id);
    }
    function getVideoIdFromFiberProps(fiber) {
      return getVideoIdFromProps(fiber?.memoizedProps) || getVideoIdFromProps(fiber?.pendingProps);
    }
    function isVideoControlsFiber(fiber) {
      const componentName = getFiberName(fiber);
      return componentName.includes("FBUnifiedLightweightVideoAttachmentMediaControls");
    }
    function getDevToolsHook() {
      return window.__REACT_DEVTOOLS_GLOBAL_HOOK__ || null;
    }
    function getDevToolsFiberByHostInstance(element) {
      const hook = getDevToolsHook();
      if (!element || !hook?.renderers)
        return null;
      for (let renderer of hook.renderers.values()) {
        try {
          const fiber = renderer?.findFiberByHostInstance?.(element);
          if (fiber)
            return fiber;
        } catch (e) {
          console.log("FB AIO: React renderer host lookup failed", e);
        }
      }
      return null;
    }
    function getVideoBoundary(videoEle, container) {
      return closestAncestor(videoEle, '[role="article"],[data-pagelet^="FeedUnit_"]') || closestAncestor(container, '[role="article"],[data-pagelet^="FeedUnit_"]') || container || videoEle?.parentElement || null;
    }
    function getDescendantHostElement(fiber) {
      const stack = [fiber?.child];
      const visited = new Set;
      let count = 0;
      while (stack.length && count < 300) {
        const current = stack.pop();
        if (!current || visited.has(current))
          continue;
        visited.add(current);
        count++;
        if (current.stateNode?.nodeType === Node.ELEMENT_NODE) {
          return current.stateNode;
        }
        if (current.sibling)
          stack.push(current.sibling);
        if (current.child)
          stack.push(current.child);
      }
      return null;
    }
    function getAncestorHostElement(fiber) {
      let current = fiber;
      let level = 0;
      while (current && level < 80) {
        if (current.stateNode?.nodeType === Node.ELEMENT_NODE) {
          return current.stateNode;
        }
        current = current.return;
        level++;
      }
      return null;
    }
    function getFiberHostElement(fiber) {
      return getDescendantHostElement(fiber) || getAncestorHostElement(fiber);
    }
    function getRectDistance(a, b) {
      if (!a || !b || !a.width || !a.height || !b.width || !b.height) {
        return Number.POSITIVE_INFINITY;
      }
      const ax = a.left + a.width / 2;
      const ay = a.top + a.height / 2;
      const bx = b.left + b.width / 2;
      const by = b.top + b.height / 2;
      return Math.hypot(ax - bx, ay - by);
    }
    function getRectIntersectionRatio(a, b) {
      if (!a || !b || !a.width || !a.height || !b.width || !b.height)
        return 0;
      const left = Math.max(a.left, b.left);
      const top = Math.max(a.top, b.top);
      const right = Math.min(a.right, b.right);
      const bottom = Math.min(a.bottom, b.bottom);
      const width = Math.max(0, right - left);
      const height = Math.max(0, bottom - top);
      const intersection = width * height;
      const smallerArea = Math.min(a.width * a.height, b.width * b.height);
      return smallerArea ? intersection / smallerArea : 0;
    }
    function getElementDebugInfo(element, videoEle) {
      const rect = element?.getBoundingClientRect?.();
      const videoRect = videoEle?.getBoundingClientRect?.();
      const distance = getRectDistance(rect, videoRect);
      const overlap = getRectIntersectionRatio(rect, videoRect);
      return {
        tag: element?.tagName || "",
        role: element?.getAttribute?.("role") || "",
        ariaLabel: element?.getAttribute?.("aria-label") || "",
        className: typeof element?.className === "string" ? element.className : "",
        rect: rect ? {
          top: Math.round(rect.top),
          left: Math.round(rect.left),
          width: Math.round(rect.width),
          height: Math.round(rect.height)
        } : null,
        distance: Number.isFinite(distance) ? Math.round(distance) : null,
        overlap: Math.round(overlap * 100) / 100
      };
    }
    function isHostElementRelatedToVideo(hostElement, videoEle, container) {
      if (!hostElement)
        return false;
      if (hostElement === videoEle)
        return true;
      if (hostElement.contains?.(videoEle) || videoEle?.contains?.(hostElement)) {
        return true;
      }
      if (container?.contains?.(hostElement) || hostElement.contains?.(container)) {
        return true;
      }
      const boundary = getVideoBoundary(videoEle, container);
      if (boundary?.contains?.(hostElement))
        return true;
      const hostRect = hostElement.getBoundingClientRect?.();
      const videoRect = videoEle?.getBoundingClientRect?.();
      return getRectDistance(hostRect, videoRect) < 700;
    }
    function collectVideoIdCandidatesFromFiberSubtree(rootFiber, videoEle, container, rendererId, limit = 60000) {
      const stack = [rootFiber];
      const visited = new Set;
      const candidates = [];
      let count = 0;
      while (stack.length && count < limit) {
        const fiber = stack.pop();
        if (!fiber || visited.has(fiber))
          continue;
        visited.add(fiber);
        count++;
        const videoId = getVideoIdFromFiberProps(fiber);
        if (videoId) {
          const componentName = getFiberName(fiber);
          const hostElement = getFiberHostElement(fiber);
          const hostInfo = getElementDebugInfo(hostElement, videoEle);
          const hostRect = hostElement?.getBoundingClientRect?.();
          const videoRect = videoEle?.getBoundingClientRect?.();
          const isRelated = isHostElementRelatedToVideo(hostElement, videoEle, container);
          const overlap = getRectIntersectionRatio(hostRect, videoRect);
          candidates.push({
            id: videoId,
            componentName,
            isVideoControls: isVideoControlsFiber(fiber),
            isRelated,
            rendererId,
            host: hostInfo,
            score: (isRelated ? 1000 : 0) + (isVideoControlsFiber(fiber) ? 500 : 0) + Math.round(overlap * 300) - (hostInfo.distance || 1e4)
          });
        }
        if (fiber.sibling)
          stack.push(fiber.sibling);
        if (fiber.child)
          stack.push(fiber.child);
      }
      return candidates;
    }
    function pickNearestVideoIdCandidate(candidates) {
      return candidates.filter((item) => item.isRelated).sort((a, b) => b.score - a.score)[0];
    }
    function logVideoIdCandidates(candidates, selectedId, videoEle, container) {
      console.log("FB AIO: DevTools video id candidates", {
        selectedId,
        total: candidates.length,
        uniqueIds: Array.from(new Set(candidates.map((item) => item.id))),
        currentVideo: getElementDebugInfo(videoEle, videoEle),
        container: getElementDebugInfo(container, videoEle),
        candidates
      });
      console.table(candidates.map((item, index) => ({
        index,
        id: item.id,
        selected: item.id === selectedId,
        related: item.isRelated,
        controls: item.isVideoControls,
        score: item.score,
        component: item.componentName,
        distance: item.host.distance,
        overlap: item.host.overlap,
        host: item.host.tag,
        ariaLabel: item.host.ariaLabel
      })));
    }
    function getVideoIdFromDevToolsRoots(videoEle, container) {
      const hook = getDevToolsHook();
      if (!hook?.renderers || !hook?.getFiberRoots)
        return "";
      const candidates = [];
      for (let rendererId of hook.renderers.keys()) {
        let roots = null;
        try {
          roots = hook.getFiberRoots(rendererId);
        } catch (e) {
          console.log("FB AIO: React DevTools root lookup failed", e);
        }
        if (!roots)
          continue;
        for (let root of roots) {
          const rootFiber = root?.current || root;
          candidates.push(...collectVideoIdCandidatesFromFiberSubtree(rootFiber, videoEle, container, rendererId, 60000));
        }
      }
      const selected = pickNearestVideoIdCandidate(candidates);
      if (candidates.length) {
        logVideoIdCandidates(candidates, selected?.id || "", videoEle, container);
      }
      return selected?.id || "";
    }
    function getVideoId(videoEle, container) {
      const idpost = getVideoIdFromDevToolsRoots(videoEle, container) || getVideoIdFromStorySaverDom(videoEle, container);
      if (!idpost) {
        const hook = getDevToolsHook();
        console.log("FB AIO: video id resolver failed", {
          href: location.href,
          hasVideo: !!videoEle,
          hasContainer: !!container,
          hasReactFiber: !!getReactFiber(videoEle) || !!getDevToolsFiberByHostInstance(videoEle),
          hasDevToolsHook: !!hook,
          rendererCount: hook?.renderers?.size || 0,
          instanceKey: getClosestInstanceKeyElement(videoEle, container)?.getAttribute?.("data-instancekey")
        });
      }
      return idpost;
    }
    const activeVideoButtons = new Set;
    let updateButtonsScheduled = false;
    let buttonPositionListenersAdded = false;
    function isVideoRectVisible(rect) {
      return rect.width > 80 && rect.height > 80 && rect.bottom > 0 && rect.right > 0 && rect.top < window.innerHeight && rect.left < window.innerWidth;
    }
    function positionDownloadButton(entry) {
      const { video, container, btn } = entry;
      const currentVideo = getCurrentVideo(video, container);
      if (!currentVideo?.isConnected) {
        btn.remove();
        activeVideoButtons.delete(entry);
        return;
      }
      const rect = currentVideo.getBoundingClientRect();
      if (!isVideoRectVisible(rect)) {
        btn.style.display = "none";
        return;
      }
      const offsetTop = Math.min(60, Math.max(10, rect.height * 0.15));
      btn.style.display = "block";
      btn.style.top = `${Math.max(0, rect.top + offsetTop)}px`;
      btn.style.left = `${Math.max(0, rect.right - 50)}px`;
    }
    function updateButtonPositions() {
      updateButtonsScheduled = false;
      for (let entry of Array.from(activeVideoButtons)) {
        positionDownloadButton(entry);
      }
    }
    function scheduleButtonPositionUpdate() {
      if (updateButtonsScheduled)
        return;
      updateButtonsScheduled = true;
      requestAnimationFrame(updateButtonPositions);
    }
    function ensureButtonPositionListeners() {
      if (buttonPositionListenersAdded)
        return;
      buttonPositionListenersAdded = true;
      window.addEventListener("scroll", scheduleButtonPositionUpdate, true);
      window.addEventListener("resize", scheduleButtonPositionUpdate);
      setInterval(scheduleButtonPositionUpdate, 1000);
    }
    onElementsAdded2("video", (videos) => {
      const className = "fb-aio-video-download-btn";
      for (let video of videos) {
        const container = getVideoScope(video);
        if (!container)
          continue;
        if (Array.from(activeVideoButtons).some((entry2) => entry2.video === video)) {
          continue;
        }
        let btn = document.createElement("button");
        btn.className = className;
        btn.textContent = "⬇️";
        btn.title = "FB AIO: Download video";
        btn.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 40px;
        height: 40px;
        background-color: #333;
        color: #fff;
        border-radius: 5px;
        border: none;
        opacity: 0.3;
        cursor: pointer;
        pointer-events: auto;
        z-index: 2147483647;`;
        btn.addEventListener("mouseenter", () => {
          btn.style.opacity = 1;
        });
        btn.addEventListener("mouseleave", () => {
          btn.style.opacity = 0.5;
        });
        btn.onclick = (e) => {
          e.preventDefault();
          e.stopImmediatePropagation?.();
          e.stopPropagation();
          const currentVideo = getCurrentVideo(video, container);
          const id = getVideoId(currentVideo, container);
          if (!id) {
            alert("FB AIO: Could not detect this video ID. Please try another video or reload the page.");
            return;
          }
          window.open(getFBAIODashboard2() + `/#/video-downloader?url=https://www.fb.com/videos/${id}`, "_blank");
        };
        document.body.appendChild(btn);
        const entry = { video, container, btn };
        activeVideoButtons.add(entry);
        ensureButtonPositionListeners();
        positionDownloadButton(entry);
      }
    });
  })();
})();
