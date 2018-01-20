import $ from 'jquery';
var helpers={

  getGames : function() {
  var ans = [];
  $.ajax({
        type: "GET",
        url: "http://starlord.hackerearth.com/gamesarena",
        async: false,
        dataType: "json",
        success: function(data) {
          ans=data;
          ans.shift();
          }
    });
    return ans;
  }
}

export default helpers;
