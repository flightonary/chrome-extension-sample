window.addEventListener("load", main, false);

function main(e) {
  var s = document.createElement('script');
  s.src = chrome.runtime.getURL('inject.js');
  s.onload = function() {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(s);

  $("#start_btn").on("click", function () {
    console.log("start_btn on click!!");

    chrome.runtime.sendMessage({contentScriptQuery: "workStart"}, null);
  });

  $("#start_btn ~ p.btn").on("click", function () {
    console.log("end_btn on click!!");

    chrome.runtime.sendMessage({contentScriptQuery: "workFinish"}, null);
  });
}