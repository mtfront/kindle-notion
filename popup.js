
chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
    var tab = tabs[0];
    if (!tab.url.endsWith('read.amazon.com/notebook')) {
        // TODO change button to redirect to such url
        alert('Go to https://read.amazon.com/notebook and chose the notes you want to export');
    } else {

    }
});