// define some api to use in extension
var _console = chrome.extension.getBackgroundPage().console;




var serverHost = 'http://127.0.0.1:8000';
// var currentUrl = window.location.href;

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        var url = sender.tab.url;
        if (request.action == "get_tab_url") {
            if (!request.hostname.match(/[^.]*\.google\.[.]*/)) {
                chrome.tabs.sendMessage(sender.tab.id, { action: 'checking_website' });
                var xhttp = new XMLHttpRequest();

                xhttp.onreadystatechange = function () {
                    // _console.log(this.responseText);
                    if (this.readyState == 4 && this.status == 200) {
                        _console.log('loaded response');
                        chrome.tabs.sendMessage(sender.tab.id,
                            {
                                action: 'checked_website',
                                status: JSON.parse(this.responseText).data
                            });
                    }
                }
                xhttp.open("get", serverHost + "/apis/url?url=" + sender.tab.url);
                xhttp.send();
            }
        }
    }
);

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse){
        var url = sender.tab.url;
        if(request.action == 'check_tab_url'){
            if (!request.hostname.match(/[^.]*\.google\.[.]*/)) {
                chrome.tabs.sendMessage(sender.tab.id, { action: 'checking_website' });
                var xhttp = new XMLHttpRequest();

                xhttp.onreadystatechange = function () {
                    // _console.log(this.responseText);
                    if (this.readyState == 4 && this.status == 200) {
                        _console.log('loaded response');
                        var resFromServer = JSON.parse(this.responseText).data;
                        chrome.tabs.sendMessage(sender.tab.id,
                            {
                                action: 'checked_website',
                                status: resFromServer
                            },function(response){
                                // if(resFromServer == 0){
                                //     chrome.tabs.reload(sender.tab.id);
                                // }
                            });
                    }
                }
                xhttp.open("get", serverHost + "/apis/url?url=" + sender.tab.url);
                xhttp.send();
            }
        }
    }
)

// function checkUrl() {
//     var xhttp = new XMLHttpRequest();
//     // xhttp.withCredentials = true;
//     // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     xhttp.open("get", serverHost + "/apis/url?url=" + currentUrl, true);
//     xhttp.send();
//     console.log(xhttp.responseText);
//     if(JSON.parse(xhttp.responseText).data == 1) return true;
//     return false;
// };

// chrome.webRequest.onBeforeRequest.addListener(
//     function (req) { //request
//         _console.log('debug - each infor url');
//         _console.log('debug', req);
//         return { cancel: false }
//     },
//     {
//         urls: ["<all_urls>"]
//         // urls: ["*://kichduc.co/*"]
//     },
//     ["blocking"]
// );

