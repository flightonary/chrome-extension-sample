window.addEventListener("load", main, false);

function main(e) {
  chrome.storage.sync.get('api', function(data) {
    $("#url").val(data.api.url);
    $("#channel").val(data.api.channel);
    $("#username").val(data.api.username);
    $("#start_text").val(data.api.start_text);
    $("#end_text").val(data.api.end_text);
  });

  $("#save_btn").on("click", function () {
    chrome.storage.sync.set(
        {
          api: {
            url: $("#url").val(),
            channel: $("#channel").val(),
            username: $("#username").val(),
            start_text: $("#start_text").val(),
            end_text: $("#end_text").val()
          }
        }, function () {
          console.log("save !!");
        });
  });
}
