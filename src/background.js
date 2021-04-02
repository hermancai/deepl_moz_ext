// create
browser.contextMenus.create({
    id: "deepl-translate",
    title: "Deepl Firefox Translator",
    contexts: ["selection"]
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
      case 'deepl-translate':
        browser.tabs.executeScript({
           file: "translationManager.js",
           allFrames: true
        });
    }
});