chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendRequest(tab.id,{},function(response) {

//    if (!window.BlobBuilder && window.WebKitBlobBuilder){
//      window.BlobBuilder = window.WebKitBlobBuilder
//    }
//    var builder = new BlobBuilder();
//    $(function() {
//      $.each(data,function(index, value){
//
//      });
//    });


      console.log(response);


  });
//  chrome.tabs.sendRequest(tab.id,{method: "getScheduleByNames"},function(response) {
//    var data = response.data;
//  });
});
