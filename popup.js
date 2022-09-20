// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  // let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const currentWindow = await chrome.windows.getCurrent();
  console.log('currentWindow', currentWindow);

  const allTabs = await chrome.tabs.query({ currentWindow: true });
  console.log('allTabs', allTabs);

  const allGroup = await chrome.tabGroups.query({ windowId: currentWindow.id });
  console.log('allGroup', allGroup);

  const result = allTabs.map(item => {
    const groupInfo = allGroup.find(({ id }) => id === item.groupId);

    return { ...item, groupInfo }
  });

  console.log('result', result);


  // chrome.storage.sync.set({  });
  // chrome.scripting.executeScript({
  //   target: { tabId: tab.id },
  //   func: setPageBackgroundColor,
  // });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}