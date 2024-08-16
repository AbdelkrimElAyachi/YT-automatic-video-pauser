let isWorking = false;
const btn = document.getElementById("btn");


btn.onclick = async () => {
    isWorking = !isWorking;
    if (isWorking) {
        btn.textContent = "cancel";
        await send("start");
    } else {
        btn.textContent = "start";
        await send("pause");
    }
    // Save the state of the extension to Chrome storage
    chrome.storage.local.set({ isWorking: isWorking }, function() {
        console.log("Extension state saved");
    });
};

const send = async (message) => {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const response = await chrome.tabs.sendMessage(tab.id, {message: message});
    // do something with response here, not outside the function
    return response;
};

// Retrieve the saved state of the extension on load
chrome.storage.local.get("isWorking", function(data) {
  if (data.isWorking !== undefined) {
    isWorking = data.isWorking;
    if (isWorking) {
      btn.textContent = "cancel";
    } else {
      btn.textContent = "start";
    }
  }
});