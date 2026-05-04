const isFirefox = typeof browser !== "undefined" && browser.runtime;
const browserApi = isFirefox ? browser : chrome;

const CACHED = {
  userID: null,
};

export const Storage = {
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
  },
};

export function runFunc(fnPath = "", params = [], global = chrome) {
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

export function getExtensionId() {
  return browserApi.runtime.id;
}

export async function hasUserId() {
  return !!(await Storage.get("userId"));
}

export async function getUserId() {
  if (!CACHED.userID) {
    CACHED.userID = await Storage.get("userId");
  }
  if (!CACHED.userID) {
    await setUserId();
  }
  return CACHED.userID;
}

export async function setUserId(uid) {
  if (!uid) {
    uid =
      (
        await browserApi.cookies.get({
          url: "https://www.facebook.com",
          name: "c_user",
        })
      )?.value || new Date().getTime();
  }
  CACHED.userID = uid;
  await Storage.set("userId", uid);
}

export const runScriptInCurrentTab = async (func, args, world = "MAIN") => {
  const tab = await getCurrentTab();
  return await runScriptInTab({ func, args, target: { tabId: tab.id }, world });
};

export const runScriptInTab = async (config = {}) => {
  return new Promise((resolve, reject) => {
    browserApi.scripting.executeScript(
      mergeObject(
        {
          world: "MAIN",
          injectImmediately: true,
        },
        config,
      ),
      (injectionResults) => {
        if (browserApi.runtime.lastError) {
          console.error(browserApi.runtime.lastError);
          reject(browserApi.runtime.lastError);
        }
        // https://developer.chrome.com/docs/extensions/reference/scripting/#handling-results
        else resolve(injectionResults?.find?.((_) => _.result)?.result);
      },
    );
  });
};

export async function getCurrentTab() {
  let tabs = await browserApi.tabs.query({ active: true, currentWindow: true });
  return tabs?.[0];
}

export const mergeObject = (...objs) => {
  // merge without null value
  let res = {};
  for (let obj of objs) for (let key in obj) if (obj[key]) res[key] = obj[key];
  return res;
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getFBAIODashboard = () => {
  return "https://fbaio.org/";
};

const FORM_DATA_PREFIX = "fbaio-formData:";
const SERIALIZED_FETCH_RESPONSE = "fbaio-fetch-response";
const TEXT_MIME_TYPES = [
  "application/graphql-response+json",
  "application/javascript",
  "application/ld+json",
  "application/problem+json",
  "application/sql",
  "application/xml",
  "application/x-www-form-urlencoded",
  "application/xhtml+xml",
  "image/svg+xml",
];

const normalizeContentType = (contentType = "") =>
  String(contentType || "")
    .split(";")[0]
    .trim()
    .toLowerCase();

const isJsonContentType = (contentType = "") => {
  const mimeType = normalizeContentType(contentType);
  return mimeType === "application/json" || mimeType.endsWith("+json");
};

const isTextContentType = (contentType = "") => {
  const mimeType = normalizeContentType(contentType);
  return mimeType.startsWith("text/") || TEXT_MIME_TYPES.includes(mimeType);
};

const isFormDataContentType = (contentType = "") => {
  const mimeType = normalizeContentType(contentType);
  return (
    mimeType === "multipart/form-data" ||
    mimeType === "application/x-www-form-urlencoded"
  );
};

const hasEmptyResponseBody = (res) =>
  [101, 103, 204, 205, 304].includes(res.status) ||
  (res.headers.get("content-length") || res.headers.get("Content-Length")) ===
    "0";

const normalizeBodyEntryValue = async (value) => {
  if (!(value instanceof Blob)) return value;

  return {
    type: "file",
    name: value.name || "",
    mimeType: value.type || "application/octet-stream",
    size: value.size || 0,
    value: await convertBlobToBase64(value),
  };
};

const serializeFormData = async (formData) => {
  const entries = [];
  for (const [key, value] of formData.entries()) {
    entries.push([key, await normalizeBodyEntryValue(value)]);
  }
  return entries;
};

const buildTextResponseBody = async (res) => ({
  body: await res.clone().text(),
  bodyEncoding: "text",
  bodyType: "text",
});

const buildJsonResponseBody = async (res) => {
  try {
    return {
      body: await res.clone().json(),
      bodyEncoding: "json",
      bodyType: "json",
    };
  } catch (e) {
    console.log("Cannot parse response JSON", e);
    return buildTextResponseBody(res);
  }
};

const buildFormDataResponseBody = async (res) => {
  try {
    return {
      body: await serializeFormData(await res.clone().formData()),
      bodyEncoding: "form-data",
      bodyType: "formData",
    };
  } catch (e) {
    console.log("Cannot parse response form data", e);
    return buildTextResponseBody(res);
  }
};

const buildResponseBody = async (res, responseType, contentType) => {
  if (responseType === "empty" || hasEmptyResponseBody(res)) {
    return {
      body: null,
      bodyEncoding: "empty",
      bodyType: "empty",
    };
  }

  switch (responseType) {
    case "json":
      return buildJsonResponseBody(res);

    case "formData":
      return buildFormDataResponseBody(res);

    case "blob":
    case "arrayBuffer": {
      const blob = await res.clone().blob();
      return {
        body: await convertBlobToBase64(blob),
        bodyEncoding: "data-url",
        bodyType: "binary",
      };
    }

    case "text":
    default:
      try {
        if (isJsonContentType(contentType)) {
          return buildJsonResponseBody(res);
        }

        if (isFormDataContentType(contentType)) {
          return buildFormDataResponseBody(res);
        }

        if (isTextContentType(contentType)) {
          return buildTextResponseBody(res);
        }

        const blob = await res.clone().blob();
        return {
          body: await convertBlobToBase64(blob),
          bodyEncoding: "data-url",
          bodyType: "binary",
        };
      } catch (e) {
        return buildTextResponseBody(res);
      }
  }
};

const getResponseType = (res, responseType, contentType) => {
  if (responseType && responseType !== "auto") return responseType;
  if (hasEmptyResponseBody(res)) return "empty";
  if (isJsonContentType(contentType)) return "json";
  if (isFormDataContentType(contentType)) return "formData";
  if (isTextContentType(contentType)) return "text";
  return "blob";
};

const convertDataUrlToBlob = (dataUrl = "", fallbackMimeType = "") => {
  if (typeof dataUrl !== "string" || !dataUrl.startsWith("data:")) {
    return dataUrl;
  }

  const [header, encoded = ""] = dataUrl.split(",", 2);
  const mimeType = header.slice(5).split(";")[0] || fallbackMimeType;
  const isBase64 = header.includes(";base64");
  const decoded = isBase64 ? atob(encoded) : decodeURIComponent(encoded);
  const bytes = new Uint8Array(decoded.length);

  for (let i = 0; i < decoded.length; i++) {
    bytes[i] = decoded.charCodeAt(i);
  }

  return new Blob([bytes], { type: mimeType || "application/octet-stream" });
};

const isSerializedFileValue = (value) =>
  value?.type === "file" && typeof value.value === "string";

const normalizeFormDataRequestValue = (value) => {
  if (!isSerializedFileValue(value)) return value;

  const blob = convertDataUrlToBlob(value.value, value.mimeType);
  if (!(typeof Blob !== "undefined" && blob instanceof Blob)) return value.value;

  if (value.name && typeof File !== "undefined") {
    return new File([blob], value.name, {
      type: value.mimeType || blob.type || "application/octet-stream",
    });
  }

  return blob;
};

const appendFormDataValue = (formData, key, value) => {
  const normalizedValue = normalizeFormDataRequestValue(value);

  if (
    typeof Blob !== "undefined" &&
    normalizedValue instanceof Blob &&
    value?.name &&
    !(typeof File !== "undefined" && normalizedValue instanceof File)
  ) {
    formData.append(key, normalizedValue, value.name);
    return;
  }

  formData.append(key, normalizedValue);
};

const normalizeCustomFetchOptions = (options = {}) => {
  const normalizedOptions = { ...(options || {}) };
  const responseType =
    normalizedOptions.responseType ||
    normalizedOptions.fbaioResponseType ||
    "auto";

  delete normalizedOptions.responseType;
  delete normalizedOptions.fbaioResponseType;

  if (
    typeof normalizedOptions.body === "string" &&
    normalizedOptions.body.startsWith(FORM_DATA_PREFIX)
  ) {
    const body = JSON.parse(normalizedOptions.body.slice(FORM_DATA_PREFIX.length));
    const formData = new FormData();
    for (const [key, value] of Object.entries(body || {})) {
      if (Array.isArray(value)) {
        value.forEach((item) => appendFormDataValue(formData, key, item));
      } else {
        appendFormDataValue(formData, key, value);
      }
    }
    normalizedOptions.body = formData;
  }

  return {
    options: normalizedOptions,
    responseType,
  };
};

export function isSerializedFetchResponse(value) {
  return value?.__type === SERIALIZED_FETCH_RESPONSE;
}

export async function customFetch(url, options) {
  const { options: normalizedOptions, responseType } =
    normalizeCustomFetchOptions(options);

  try {
    const res = await fetch(url, normalizedOptions);
    const contentType = res.headers.get("content-type") || "";
    const resolvedResponseType = getResponseType(res, responseType, contentType);
    const { body, bodyEncoding, bodyType } = await buildResponseBody(
      res,
      resolvedResponseType,
      contentType,
    );
    const headerEntries = [...res.headers.entries()];

    return {
      __type: SERIALIZED_FETCH_RESPONSE,
      body,
      bodyEncoding,
      bodyType,
      contentType,
      headerEntries,
      headers: Object.fromEntries(headerEntries),
      ok: res.ok,
      redirected: res.redirected,
      responseType: resolvedResponseType,
      status: res.status,
      statusText: res.statusText,
      type: res.type,
      url: res.url,
    };
  } catch (e) {
    console.log("Fetch failed:", e);
    return {
      __type: SERIALIZED_FETCH_RESPONSE,
      body: null,
      bodyEncoding: "empty",
      bodyType: "error",
      contentType: "",
      error: {
        message: e?.message || "Unknown fetch error",
        name: e?.name || "Error",
      },
      headerEntries: [],
      headers: {},
      ok: false,
      redirected: false,
      responseType: "error",
      status: 0,
      statusText: "",
      type: "error",
      url: String(url || ""),
    };
  }
}

export function deserializeFetchResponse(data) {
  if (!isSerializedFetchResponse(data) || typeof Response === "undefined") {
    return data;
  }

  const headers = data.headerEntries || Object.entries(data.headers || {});
  const init = { headers };

  if (data.status >= 200 && data.status <= 599) {
    init.status = data.status;
  }

  if (data.statusText) {
    init.statusText = data.statusText;
  }

  switch (data.bodyType) {
    case "json":
      return new Response(JSON.stringify(data.body), init);

    case "text":
      return new Response(data.body || "", init);

    case "empty":
    case "error":
      return new Response(null, init);

    default:
      return new Response(
        convertDataUrlToBlob(data.body, data.contentType) || null,
        init,
      );
  }
}

const arrayBufferToBase64 = (buffer) => {
  const bytes = new Uint8Array(buffer);
  let binary = "";

  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }

  return btoa(binary);
};

export const convertBlobToBase64 = async (blob) => {
  try {
    if (!blob) return null;

    if (typeof FileReader !== "undefined") {
      return await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = (error) => {
          console.log("Error: ", error);
          resolve(null);
        };
      });
    }

    if (typeof blob.arrayBuffer === "function") {
      const base64data = arrayBufferToBase64(await blob.arrayBuffer());
      return `data:${blob.type || "application/octet-stream"};base64,${base64data}`;
    }
  } catch (error) {
    console.log("Error: ", error);
  }

  return null;
};
