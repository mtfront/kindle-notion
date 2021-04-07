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
    let buttonAction = inNotes(tab.url) ? exportNotes 
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
    let rows = document.getElementsByClassName("kp-notebook-row-separator");
    let notes = [["location", "highlight", "note"]];
    for (row of rows){
        let header = row.getElementsByClassName("kp-notebook-metadata");
        // a highlight row will have 2 metadata, e.g. Blue highlight | Page:1 & Note | Page: 1
        if (header.length < 2) {
            continue;
        }
        let separator = header[0].innerHTML.indexOf('|');
        let page = header[0].innerHTML.substring(separator + 2).replace('&nbsp;', ' ');

        // need to escape comma in the content with "", then escape quotes inside it.
        let highlight = row.getElementsByClassName("a-color-base");
        let content = highlight[0].innerHTML;
        let note = highlight[1].innerHTML;
        console.log(page + ',' + content + ',' + note);
        notes.push([page, content, note]);
    }
    // let title = document.getElementsByClassName("kp-notebook-annotation-container")[0].getElementsByClassName("kp-notebook-metadata")[1].innerHTML;
    // let csv = notes.map(i => i.join(",")).join("\n");
    // let csvFile = new Blob([csv], {type: "text/csv"});
    // let link = document.createElement("a");
    // link.download = title + ".csv";
    // link.href = window.URL.createObjectURL(csvFile);
    // document.body.appendChild(link);
    // link.click();
}