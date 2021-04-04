var sourceOptions = document.getElementById("deepl-source-lang");
var targetOptions = document.getElementById("deepl-target-lang");

getStoredOptions()
    .then((languages) => {
        sourceOptions.value = languages.source;
        targetOptions.value = languages.target;
        sourceOptions.addEventListener("change", setSource);
        targetOptions.addEventListener("change", setTarget);
    });


// function to get language options from local storage
async function getStoredOptions() {
    return await browser.storage.local.get();
}


// function to set new source value in local storage
function setSource() {
    browser.storage.local.set({ "source": sourceOptions.value });
}


// function to set new target value in local storage
function setTarget() {
    browser.storage.local.set({ "target": targetOptions.value });
}
