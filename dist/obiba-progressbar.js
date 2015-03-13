/*Copyright (c) 2015 OBiBa. All rights reserved.
* This program and the accompanying materials
* are made available under the terms of the GNU Public License v3.0.
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see  <http://www.gnu.org/licenses>

* obiba-progressbar - v1.0.0-SNAPSHOT
* Date: 2015-03-12
 */
(function ($) {

  "use strict";

  var bar = null;
  var spinner = null;
  var step = 0;
  var animationSettings = {'duration': 15000, 'complete': completeCallback, 'step': stepCallback, 'easing': 'linear'};
  var settings = {
    duration: 15000,
    showSpinner: true,
    parent: 'body',
    template: '<div id="container"><div class="obiba-progress-bar" role="bar"></div><div class="obiba-progress-spinner" role="spinner"><div class="obiba-progress-spinner-icon"></div></div></div>'
  };

  /**
   * @constructor
   */
  $.ObibaProgressBar = function (options) {
    if (options) configure(options);
  };

  /**
   * public methods exposed
   */
  $.ObibaProgressBar.prototype = {
    start: startAnimation,
    pause: pauseAnimation,
    resume: resumeAnimation,
    finish: finishAnimation,
    inc: incrementStep,
    set: setPercentage,
    duration: duration
  };

  function startAnimation() {
    render();
    play();
  }

  function pauseAnimation() {
    if (bar === null) return;
    bar.stop();
    stopSpinner();
  }

  function resumeAnimation() {
    if (bar === null) return;
    updateDuration();
    play();
  }

  function finishAnimation() {
    if (bar === null) return;
    bar.stop().animate({'width': '100%'}, 'fast', completeCallback);
  }

  function incrementStep(inc) {
    if (bar === null) return;
    setPercentage(Math.min(100, Math.round(step) + inc), true);
  }

  function setPercentage(percent, resumeAnimation) {
    if (bar === null) return;
    bar.stop().animate({'width': percent+'%'}, 250, function() {
      step = percent;
      updateDuration();
      if (resumeAnimation) play();
    });
  }

  function duration(time) {
    if (bar === null) return;
    bar.stop();
    settings.duration = time;
    updateDuration();
    resumeAnimation();
  }

  // P R I V A T E     F U N C T I O N S

  function configure(options) {
    if (options === null) return;
    $.each(options, function(key, value){
      if (value && settings.hasOwnProperty(key)) settings[key] = value;
    });

    animationSettings.duration = settings.duration;
  }

  function play() {
    if (bar === null) return;
    bar.stop();
    bar.animate({'width': '100%'}, animationSettings);
    rotateSpinner();
  }

  /**
   * Creates the widgets
   */
  function render() {
    if(bar !== null) {
      dispose();
    }

    var template = $(settings.template);
    if (template) {
      $(settings.parent).append(template);
      bar = $('[role="bar"]');
      if (settings.showSpinner) {
        spinner = $('[role="spinner"]');
        rotateSpinner();
      }
    }
  }

  /**
   * Deletes all widgets and resets state
   */
  function dispose() {
    if (bar === null) return;
    bar.stop();
    stopSpinner();
    bar.remove();
    if (spinner !== null) spinner.remove();
    reset();
  }

  /**
   * Resets the state
   */
  function reset() {
    step = 0;
    animationSettings.duration = settings.duration;
  }

  function rotateSpinner() {
    if (spinner === null) return;
    spinner.removeClass('animation-off');
  }

  function stopSpinner() {
    if (spinner === null) return;
    spinner.addClass('animation-off');
  }

  /**
   * Need to recalculate remaining time for smooth animation
   */
  function updateDuration() {
    animationSettings.duration = Math.round(settings.duration*0.01*(100 - Math.round(step)));
  }

  /**
   * Save current animation step for further interventions!
   * @param value
   */
  function stepCallback(value) {
    step = value;
  }

  /**
   * Clean up callback
   */
  function completeCallback() {
    if (spinner === null) spinner.animate({'opacity': 0}, 250);
    bar.animate({'opacity': 0}, 250, dispose);
  }

}(jQuery));
