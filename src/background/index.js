import * as utils from "../utils/index.js";
import { browserApi } from "../utils/polyfill.js";

const GLOBAL = {
  utils,
  fetch: (url, options) =>
    fetch(url, options || {})
      .then((res) => res.text())
      .catch((e) => null),
  customFetch: utils.customFetch,
  getSupportedAutoRunFeatures() {
    return [
      "fb_blockSeenStory",
      "fb_showTotalPostReactions",
      "fb_addDownloadVideoBtn",
      "fb_addVideoControlBtn",
      "insta_blockSeenStory",
      "threads_addDownloadVideoBtn",
      "fb_stopNewFeed",
      "tiktok_addDownloadVideoBtn",
      "block_open_urls",
      "web_timer",
    ];
  },
};

function main() {
  browserApi.runtime.onInstalled.addListener(async function (data) {
    const { id, previousVersion, reason } = data || {};

    // reasons: shared_module_update / chrome_update / update / install
    if (reason === "install") {
      const url = utils.getFBAIODashboard();
      browserApi.tabs.create({ url });

      // create new unique id and save it
      await utils.setUserId();
    } else if (reason == "update" || reason == "chrome_update") {
      const url = utils.getFBAIODashboard();
      browserApi.tabs.create({
        url:
          url +
          // "http://localhost:5173/" +
          `#/ext-updated?previousVersion=${previousVersion}&reason=${reason}`,
      });
    }
  });

  browserApi.runtime.onMessageExternal.addListener(
    (request, sender, sendResponse) => {
      if (request.action === "fb_allInOne_runFunc") {
        utils
          .runFunc(request.fnPath, request.params, GLOBAL)
          .then(sendResponse)
          .catch(sendResponse);
        return true;
      }
    }
  );

  browserApi.runtime.onMessage.addListener((request, sender, sendResponse) => {
    try {
      // Handle messages forwarded from external_bridge.js (Firefox)
      if (request.action === "fb_allInOne_runFunc") {
        utils
          .runFunc(request.fnPath, request.params, GLOBAL)
          .then(sendResponse)
          .catch(sendResponse);
        return true;
      }

      // Handle internal background execution requests
      if (request.action === "aio-runInBackground") {
        const { params = [], fnPath = "" } = request.data || {};
        utils
          .runFunc(fnPath, params, GLOBAL)
          .then(sendResponse)
          .catch(sendResponse);
        return true;
      }
    } catch (e) {
      console.log("ERROR:", e);
      sendResponse({ error: e.message });
    }
  });
}

main();
