;(function(global) {
'use strict';

var extend = require('xtend');

var hoverintent = function(el, over, out) {
  var x, y, pX, pY;
  var h = {},
    state = 0,
    timer = 0;

  var options = {
    sensitivity: 7,
    interval: 100,
    timeout: 0
  };

  function delay(el, outEvent, e) {
    if (timer) timer = clearTimeout(timer);
    state = 0;
    return outEvent.call(el, e);
  }

  function dispatch(e, event, over) {
    var tracker = function(e) {
      x = e.clientX;
      y = e.clientY;
    };

    if (timer) timer = clearTimeout(timer);
    if (over) {
      pX = e.clientX;
      pY = e.clientY;
      el.addEventListener('mousemove', tracker, false);

      if (state !== 1) {
        timer = setTimeout(function() {
          compare(el, event, e);
        }, options.interval);
      }
    } else {
      el.removeEventListener('mousemove', tracker, false);

      if (state === 1) {
        timer = setTimeout(function() {
          delay(el, event, e);
        }, options.timeout);
      }
    }
    return this;
  }

  function compare(el, overEvent, e) {
    if (timer) timer = clearTimeout(timer);
    if ((Math.abs(pX - x) + Math.abs(pY - y)) < options.sensitivity) {
      state = 1;
      return overEvent.call(el, e);
    } else {
      pX = x;
      pY = y;
      timer = setTimeout(function() {
        compare(el, overEvent, e);
      }, options.interval);
    }
  }

  // Public methods
  h.options = function(opt) {
    options = extend({}, options, opt);
  };

  function dispatchOver(e) {
    dispatch(e, over, true);
  }

  function dispatchOut(e) {
    dispatch(e, out);
  }

  h.remove = function() {
    if (!el) return;
    el.removeEventListener('mouseover', dispatchOver, false);
    el.removeEventListener('mouseout', dispatchOut, false);
  };

  if (el) {
    el.addEventListener('mouseover', dispatchOver, false);
    el.addEventListener('mouseout', dispatchOut, false);
  }

  return h;
};

global.hoverintent = hoverintent;
if (typeof module !== 'undefined' && module.exports) module.exports = hoverintent;
})(this);
