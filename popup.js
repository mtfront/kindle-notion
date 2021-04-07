let button = document.getElementById("button");
chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
    let tab = tabs[0];
    if (inNotes(tab.url)) {
        document.getElementById("button").innerHTML = "Export";
        document.getElementById("instruction").innerHTML = "Click the button to export your currently selected kindle notes";
    }
});

button.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    buttonAction = inNotes(tab.url) ? exportNotes 
                                    :chrome.tabs.create({url: "https://read.amazon.com/notebook"});

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: buttonAction,
    });
});

function inNotes(url) {
    return url.endsWith('read.amazon.com/notebook');
}

function exportNotes(){
    // highlights = document.getElementsByClassName("kp-notebook-highlight");
    rows = document.getElementsByClassName("kp-notebook-row-separator");
    for (row of rows){
        header = row.getElementsByClassName("kp-notebook-metadata");
        // a highlight row will have 2 metadata, e.g. Blue highlight | Page:1 & Note | Page: 1
        if (header.length < 2) {
            continue;
        }
        separator = header[0].innerHTML.indexOf('|');
        page = header[0].innerHTML.substring(separator + 2).replace('&nbsp;', ' ');
    }
}