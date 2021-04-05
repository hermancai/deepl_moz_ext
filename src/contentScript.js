/* Deepl API key is stored in authkey.js */

// get stored languages options => fetch request to Deepl
getLanguages()
    .then((languages) => {
        var url = "https://api.deepl.com/v2/translate?auth_key=" + authkey;
        var payload = buildPayload(languages);
        fetchDeepl(url, payload)
            .then((response) => {
                // https://www.deepl.com/docs-api/translating-text/response/ 
                displayText(response.translations[0].text);
            });
    });


/**************************************
 * Functions for creating request
 *************************************/

// function to get query langauges from local storage
async function getLanguages() {
    return await browser.storage.local.get();
}


// function to build payload for making fetch request
function buildPayload(languages) {
    var payload = new URLSearchParams();
    payload.append('text', window.getSelection().toString());
    payload.append('target_lang', languages.target);
    if (languages.source) {
        payload.append('source_lang', languages.source);
    }
    return payload;
}


// function to send request to Deepl
async function fetchDeepl(url, payload) {
    const response = await fetch(url, {
        credentials: 'include',
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
        body: payload
    })
    return response.json();
}


/**************************************
 * Functions for displaying results
 *************************************/

// function to show translation onscreen
function displayText(text) {
    createTextBox();

    console.log(text);
    document.getElementById("deepl-ext-body").innerText = text;
}


// function to create html textbox for displaying results
function createTextBox() {
    // if textbox already exists on current tab
    if (document.getElementById("deepl-ext-container")) {
        return;
    }

    var container = document.createElement("div");
    container.id = "deepl-ext-container";

    createHeader(container);
    createBody(container);
    
    document.body.appendChild(container);
    makeDraggable(container);
}


// function to make header for textbox
function createHeader(container) {
    var header = document.createElement("div");
    header.id = "deepl-ext-header"

    var headerText = document.createElement("div");
    headerText.innerText = "Deepl Translator";
    headerText.id = "deepl-header-text";
    header.appendChild(headerText);

    var closer = document.createElement("div");
    closer.innerText = "\u00D7";
    closer.id = "deepl-header-closer";
    closer.addEventListener("click", function() {
        container.remove();
    })

    header.appendChild(closer);
    container.appendChild(header);
}


// function to create body to hold translation text
function createBody(container) {
    var bodyDiv = document.createElement("div");
    bodyDiv.id = "deepl-ext-body";
    container.appendChild(bodyDiv);
}


// function to allow moving textbox
// source: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_draggable 
function makeDraggable(container) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    document.getElementById("deepl-ext-header").onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position
        container.style.top = (container.offsetTop - pos2) + "px";
        container.style.left = (container.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
