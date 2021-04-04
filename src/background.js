// Extension appears in context menu if text is selected
browser.contextMenus.create({
    id: "deepl-translate",
    title: "Deepl Firefox Translator",
    contexts: ["selection"]
});


// Run content script if clicked on extension
browser.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
      case 'deepl-translate':
        browser.tabs.executeScript({
           file: "pageContentScript.js"
        });
    }
});
