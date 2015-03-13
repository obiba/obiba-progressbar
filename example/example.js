(function () {
  var bar = new $.ObibaProgressBar({barCssOverride: {top:'200px', right:'100px', 'background-color': 'red'}});

  $(document).ajaxComplete(function() {
    console.log("ajaxComplete");
    bar.inc(5);
  });


  $("#reset").click(function(){
    $("div").width(0).css('opacity', 1);
  });
  $("#start").click(function(){
    bar.start();
  });
  $("#set").click(function(){
    bar.set(50);
  });
  $("#pause").click(function(){
    bar.pause();
  });
  $("#resume").click(function(){
    bar.resume();
  });
  $("#inc").click(function(){
    bar.inc(1);
  });
  $("#speed").click(function(){
    bar.duration(6000);
  });
  $("#end").click(function(){
    bar.finish();
  });
  $("#ajax").click(function(){
    $('#ajax-result').text(JSON.stringify("Sending..."));
    $.ajax("http://api.openweathermap.org/data/2.5/weather?q=montreal,ca")
      .done(function (data) {
        $('#ajax-result').text(JSON.stringify(data));
      });
  });


}());
