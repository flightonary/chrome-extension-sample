chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set(
      {
        api: {
          url: "http://localhost:8080/api/chat.postMessage",
          channel: "mychannel",
          username: "Extension Sample",
          start_text: "start now!",
          end_text: "end now!"
        }
      },
      function () {
        console.log("initialized");
      });
});