// Extension appears in context menu if text is selected
browser.contextMenus.create({
    id: "deepl-translate",
    title: "Deepl Translator",
    contexts: ["selection"]
});


// Set default language options
let setDefaults = browser.storage.local.set({
    "source": "",
    "target": "EN-US"
})


// Run content script if clicked on extension
browser.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
      case 'deepl-translate':
        browser.tabs.executeScript({
            file: "authkey.js"
        }).then(browser.tabs.executeScript({
            file: "contentScript.js"
        })).then(browser.tabs.insertCSS({
            file: "textbox.css"
        }));
    }
});
