(function ($) {

  "use strict";

  var defaultDuration = 10000;
  var container = null;
  var bar = null;
  var spinner = null;
  var options = {'duration': defaultDuration, 'complete': completeCallback, 'step': stepCallback, 'easing': 'linear'};
  var template = "<div id='container'><div class='obiba-progress-bar'></div><div class='obiba-progress-spinner'><div class='obiba-progress-spinner-icon'></div></div></div>";
  var step = 0;

  /**
   * @constructor
   */
  $.ObibaProgressBar = function () {
  };

  /**
   * public methods exposed
   * @type {{start: startAnimation, inc: incrementStep, set: setPercentage, stop: pauseAnimation, resume: resumeAnimation, finish: finishAnimation}}
   */
  $.ObibaProgressBar.prototype = {
    start: startAnimation,
    inc: incrementStep,
    set: setPercentage,
    pause: pauseAnimation,
    resume: resumeAnimation,
    finish: finishAnimation
  };

  function startAnimation() {
    create();
    play();
  }

  function setPercentage(percent, resumeAnimation) {
    if (container === null) create();
    bar.stop().animate({'width': percent+'%'}, 250, function() {
      step = percent;
      updateDuration();
      if (resumeAnimation) play();
    });
  }

  function play() {
    bar.stop();
    bar.animate({'width': '100%'}, options);
    rotateSpinner();
  }

  function pauseAnimation() {
    if (container === null) return;
    bar.stop();
    stopSpinner();
  }

  function resumeAnimation() {
    if (container === null) return;
    updateDuration();
    play();
  }

  function incrementStep() {
    if (container === null) create();
    setPercentage(Math.min(100, Math.round(step) + 10), true);
  }

  function finishAnimation() {
    if (container === null) return;
    bar.stop().animate({'width': '100%'}, 'fast', completeCallback);
  }

  /**
   * Creates the widgets
   */
  function create() {
    if(container !== null) {
      dispose();
    }

    container = $(template);
    $("body").append(container);
    bar = $('.obiba-progress-bar');
    spinner = $('.obiba-progress-spinner-icon');

    rotateSpinner();
  }

  /**
   * Deletes all widgets and resets state
   */
  function dispose() {
    if (container === null) return;
    bar.stop();
    stopSpinner();
    container.remove();
    reset();
  }

  /**
   * Resets the state
   */
  function reset() {
    step = 0;
    options.duration = 9000;
  }

  function rotateSpinner() {
    $('.obiba-progress-spinner-icon').removeClass('animation-off');
  }

  function stopSpinner() {
    $('.obiba-progress-spinner-icon').addClass('animation-off');
  }

  /**
   * Need to recalculate remaining time for smooth animation
   */
  function updateDuration() {
    options.duration = Math.round(defaultDuration*0.01*(100 - Math.round(step)));
  }

  /**
   * Saves current animation step for further interventions!
   * @param value
   */
  function stepCallback(value) {
    step = value;
  }

  /**
   * Clean up callback
   */
  function completeCallback() {
    container.animate({'opacity': 0}, 250, dispose);
    rotateSpinner();
  }

}(jQuery));
