window.addEventListener("load", main, false);

function post_message(text_type) {
  chrome.storage.sync.get('api', function(data) {
    console.log("post message!!!");

    var post_data = {
      channel: data.api.channel,
      username: data.api.username,
      text: eval("data.api." + text_type).split('\n'),
      link_names: true
    };

    $.ajax({
      type: "post",
      url: data.api.url,
      data: JSON.stringify(post_data),
      contentType: 'application/json',
      dataType: "json",
      success: function(res) {
        if (!res["ok"]) {
          alert("Request error. " + res["error"]);
          return;
        }
      },
      error: function() {
        alert("Server Error.");
      },
      complete: function() {
        // nothing
      }
    });
  });
}

function main(e) {
  var s = document.createElement('script');
  s.src = chrome.runtime.getURL('inject.js');
  s.onload = function() {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(s);

  $("#start_btn").on("click", function () {
    console.log("start_btn on click!!");

    post_message("start_text");
  });

  $("#start_btn ~ p.btn").on("click", function () {
    console.log("end_btn on click!!");

    post_message("end_text");
  });
}