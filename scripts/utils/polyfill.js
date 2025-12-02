export const isFirefox =
  typeof browser !== "undefined" && typeof browser.runtime !== "undefined";
export const isChrome =
  typeof chrome !== "undefined" && typeof chrome.runtime !== "undefined";

export const browserApi = isFirefox ? browser : isChrome ? chrome : undefined;
export const platform = isFirefox ? "firefox" : "chrome";
