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

function postData(url, data, retry = 3) {
  if(retry === 0) {
    return;
  }
  console.log("post data!!");

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        if (response.status !== 200) {
          throw new Error('Response status is not 200');
        }
        return response.json();
      })
      .then(res => {
        if (!res["ok"]) {
          throw new Error('Response result is not ok');
        }
      })
      .catch(error => {
        console.log("fetch error: ", error);
        postData(url, data, retry - 1)
      });
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      chrome.storage.sync.get('api', function(data) {

        var post_data = {
          channel: data.api.channel,
          username: data.api.username,
          link_names: true
        };

        if (request.contentScriptQuery == "workStart") {
          post_data.text = data.api.start_text.split('\n');
        }
        else if(request.contentScriptQuery == "workFinish") {
          post_data.text = data.api.end_text.split('\n');
        }
        else {
          return false;
        }

        postData(data.api.url, post_data);
        return true;  // Will respond asynchronously.
      });
    });