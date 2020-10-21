// var currentUrl = window.location.href;
var originHtml;
var isChecked = 0;
// console.log(originBody);

chrome.runtime.sendMessage(
    {
        action: "check_tab_url",
        hostname: window.location.hostname,
    }
);
// window.stop();
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        if(request.action == 'checking_website'){
            originHtml = document.documentElement.outerHTML;
            // console.log(originHtml);
            document.documentElement.innerHTML = '\
            <html><body><h1>\
            checking website safy for children...waiting\
            </h1></body></html>';
        }
        if(request.action == 'checked_website'){
            console.log(request.status);
            if(request.status == 1){

                document.documentElement.innerHTML = "";

                //remove head and favicon ...
                document.head.innerHTML = "\
                <head><title>website not safy</title></head>\
                ";

                //remove body
                document.body.innerHTML = '\
                <body><h1>\
                this maybe unsafe because it has something not good for child\
                </h1></body>\
                ';
            
                //remove all scripts
                // let originScripts = document.getElementsByTagName('script');
                // for(let i=originScripts.length; i>=0;i--){
                //     originScripts[i].parentNode.removeChild(originScripts[i]);
                // }
            }else{
                // console.log(originHtml);
                document.documentElement.innerHTML = originHtml;
            };
        }
    }
);
