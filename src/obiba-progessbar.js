(function ($) {

  "use strict";

  var defaultDuration = 10000;
  var container = null;
  var bar = null;
  var spinner = null;
  var options = {'duration': defaultDuration, 'complete': completeCallback, 'step': stepCallback, 'easing': 'linear'};
  var step = 0;
  var timer = null;


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
    bar.animate({'width': '100%'}, options);
  }

  function setPercentage(percent, resumeAnimation) {
    if (container === null) create();
    bar.stop().animate({'width': percent+'%'}, 250, function() {
      step = percent;
      updateDuration();
      if (resumeAnimation) bar.animate({'width': '100%'}, options);
    });
  }

  function pauseAnimation() {
    if (container === null) return;
    bar.stop();
    stopSpinner();
  }

  function resumeAnimation() {
    if (container === null) return;
    updateDuration();
    bar.animate({'width': '100%'}, options);
    rotateSpinner();
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

    bar = $('<div class="obiba-progress-bar" ></div>');
    spinner = $('<div class="obiba-progress-spinner"></div>').append($('<div class="obiba-progress-spinner-icon" ></div>'));
    container = $('<div></div>').append(bar).append(spinner);
    $("body").append(container);

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
    timer = null;
    options.duration = 9000;
  }

  function rotateSpinner() {
    stopSpinner();
    var degree = 0;
    rotationCallback();

    function rotationCallback() {
      spinner.css({ WebkitTransform: 'rotate(' + degree + 'deg)'});
      spinner.css({ '-moz-transform': 'rotate(' + degree + 'deg)'});
      timer = setTimeout(function() {
        degree += 5; rotationCallback();
      }, 1);
    }
  }

  function stopSpinner() {
    clearTimeout(timer);
    timer = null;
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
  }

}(jQuery));
