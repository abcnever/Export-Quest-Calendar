chrome.extension.onRequest.addListener(
  function(request,sender,sendResponse){
    if($('.PSGROUPBOXWBO').length > 0){
      var info = {};
      $('.PSGROUPBOXWBO').each(function(index,element){
        info[index] = {'name': $(this).find('.PAGROUPDIVIDER').text()};
        info[index]['components'] = {};
        components = info[index]['components'];

        $(this).find('.PSLEVEL3GRIDNBO').eq(1).find('tr:not(:first-child)').each(function(index,element){
          var tds = $(this).find('td');
          var cur_comp = {};

          if(tds.eq(2).text().trimSpacesNewLines() !== ""){
            components[index] = {};
            cur_comp = components[index];
            cur_comp['name'] = tds.eq(2).text().trimNewLines();
            cur_comp['section'] = tds.eq(1).text().trimNewLines();
            cur_comp['instructor'] = tds.eq(5).text().trimNewLines();
            cur_comp['room'] = tds.eq(4).text().trimNewLines();
          }
          else if(tds.eq(2).text().trimSpacesNewLines() === ""){
            cur_comp = components[$(components).length - 1];
          }
          else{
            console.log("I do not know how it got here. Hmmm....");
          }

          if(typeof cur_comp['s/e_date']==="undefined"){
            cur_comp['s/e_date'] = {};
            cur_comp['schedules'] = {};
            cur_comp['s/e_date'][0] = tds.eq(6).text().trimNewLines();
            cur_comp['schedules'][0] = tds.eq(3).text().translateWeekdays();
          }
          else{
            cur_comp['s/e_date'][$(cur_comp['s/e_date']).length] = tds.eq(6).text().trimNewLines();
            cur_comp['schedules'][$(cur_comp['schedules']).length] = tds.eq(3).text().translateWeekdays();
          }
        });
      });
      sendResponse({data: info});
    }
  }
);

$.extend(String.prototype,{
  /* get weekdays' schedules from given string.
  /  NOTE: only accept one string, not arrays of string
  */
  translateWeekdays: function (){
    var schedule = this.split(' ');
    var r = {};

    if(schedule[0].indexOf('M') >= 0){
      r['Monday'] = [schedule[1],schedule[2],schedule[3]].join(' ');
    }
    if(schedule[0].indexOf('T') >= 0){
      r['Tuesday'] = [schedule[1],schedule[2],schedule[3]].join(' ');
    }
    if(schedule[0].indexOf('W') >= 0){
      r['Wednesday'] = [schedule[1],schedule[2],schedule[3]].join(' ');
    }
    if(schedule[0].indexOf('Th') >= 0){
      r['Thursday'] = [schedule[1],schedule[2],schedule[3]].join(' ');
    }
    if(schedule[0].indexOf('F') >= 0){
      r['Friday'] = [schedule[1],schedule[2],schedule[3]].join(' ');
    }
    return r;
  },
  // For readability
  trimSpacesNewLines: function() {
    return this.replace(/[\r\n|\n|\r|\s]+/g,'');
  },
  // For readability
  trimNewLines: function() {
    return this.replace(/[\r\n|\n|\r]+/g,'');
  }
});
