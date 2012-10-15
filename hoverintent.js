;(function(global){
    'use strict';

    var x, y, pX, pY;
    var options,
        state = 0,
        timer = 0;

    function hoverIntent(el, over, out, configuration) { 
        configuration === undefined ? options = {} : options = configuration;
        options.sensitivity = getOption('sensitivity', 7);
        options.interval = getOption('interval', 100);
        options.timeout = getOption('timeout', 0);

        addEvent(el, 'mouseover', function(e) { dispatchOver(e, over); });
        addEvent(el, 'mouseout', function(e) { dispatchOut(e, out); });
    }

    function getOption(name, defaultValue) {
        return options[name] !== undefined ? options[name] : defaultValue;
    }

    function track(e) { x = e.pageX; y = e.pageY; }

    function compare(self, overEvent) {
        if (timer) timer = clearTimeout(timer);
        if ((Math.abs(pX - x) + Math.abs(pY - y)) < options.sensitivity) {
            removeEvent(self, 'mousemove', track);
            state = 1;
            return overEvent();
        }
    }

    function delay(self, outEvent) {
        if (timer) timer = clearTimeout(timer);
        state = 0;
        return outEvent();
    }

    function dispatchOver(e, overEvent) {
        var self = e.currentTarget;
        if (timer) timer = clearTimeout(timer);

        pX = e.pageX;
        pY = e.pageY;
        addEvent(self, 'mousemove', track(e));

        if(state !== 1) {
            timer = setTimeout(function() {
                compare(self, overEvent);
            }, options.interval);
        }
    }

    function dispatchOut(e, outEvent) {
        var self = e.currentTarget;
        if (timer) timer = clearTimeout(timer);

        removeEvent(self, 'mousemove', track(e));
        if (state === 1) {
            timer = setTimeout(function() {
                delay(self, outEvent);
            }, options.timeout);
        }
    }

    // cross-browser events
    function addEvent(object, event, method) {
        if (object.attachEvent) {
            object['e' + event + method] = method;
            object[event + method] = function(){object['e' + event + method](window.event);};
            object.attachEvent('on' + event, object[event + method]);
        } else {
            object.addEventListener(event, method, false);
        }
    }

    function removeEvent(object, event, method) {
        if (object.detachEvent) {
            object.detachEvent('on'+event, object[event+method]);
            object[event+method] = null;
        } else {
            object.removeEventListener(event, method, false);
        }
    }

    global.hoverintent = hoverIntent;
})(this);
