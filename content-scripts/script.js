let pauser = false;
let video;

function get_video() {
  return document.getElementsByTagName("video")[0];
}

document.addEventListener("visibilitychange", function () {
  if (video == null) {
    console.log("there is no video in this page");
  }
  if (document.visibilityState === "hidden" && pauser) {
    video.pause();
  } else if (pauser) {
    video.play();
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  video = get_video();
  switch (request.message) {
    case "start":
      pauser = true;
      break;
    case "pause":
      pauser = false;
      break;
    default:
      sendResponse("hello");
      break;
  }
});

module.exports = {get_video};