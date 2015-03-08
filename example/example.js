(function () {
  var bar = new $.ObibaProgressBar();

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
    bar.inc();
  });
  $("#end").click(function(){
    bar.finish();
  });

}());
