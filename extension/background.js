chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set(
      {
        api: {
          url: "https://postman-echo.com/post",
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