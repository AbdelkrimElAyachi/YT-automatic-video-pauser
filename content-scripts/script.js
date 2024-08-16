let pauser = false;
let video = null;

function get_video(){
    video = document.getElementsByTagName("video")[0];
}

document.addEventListener('visibilitychange', function() {
    if(video == null){
        console.log("there is no video in this page");
    }
    if (document.visibilityState === 'hidden' && pauser) {
        video.pause();
    } else {
        video.play();
    }
});



chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    get_video();
    switch(request.message){
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
  }
);