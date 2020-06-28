(function inject() {
  var original_startTime = startTime;
  var injected_startTime = function () {
    console.log("startTime() injected!!")
    return original_startTime();
  }
  startTime = injected_startTime;

  var original_endTime = endTime;
  var injected_endTime = function () {
    console.log("endTime() injected!!")
    return original_endTime();
  }
  endTime = injected_endTime;
})();