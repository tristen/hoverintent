var hoverintent = function(o) {
    var x, y, pX, pY;
    var h = {},
        state = 0,
        timer = 0;

    var options = {
        sensitivity: 7,
        interval: 100,
        timeout: 0
    };

    var merge = function(obj) {
        for (var i = 1; i < arguments.length; i++) {
            var def = arguments[i];
            for (var n in def) {
                if (obj[n] === undefined) obj[n] = def[n];
            }
        }
        return obj;
    };

    // cross-browser events
    var addEvent = function(object, event, method) {
        if (object.attachEvent) {
            object['e'+event+method] = method;
            object[event+method] = function(){object['e'+event+method](window.event);};
            object.attachEvent('on'+event, object[event+method]);
        } else {
            object.addEventListener(event, method, false);
        }
    };

    var removeEvent = function(object, event, method) {
        if (object.detachEvent) {
            object.detachEvent('on'+event, object[event+method]);
            object[event+method] = null;
        } else {
            object.removeEventListener(event, method, false);
        }
    };

    options = merge(o || {}, h.options, options);
    h.options = options;

    var track = function(e) {
        x = e.pageX; y = e.pageY;
        return this;
    };

    var delay = function(el, outEvent, e) {
        if (timer) timer = clearTimeout(timer);
        state = 0;
        return outEvent.call(el, e);
    };

    var dispatch = function(e, event, o) {
        var el = e.currentTarget;

        if (timer) timer = clearTimeout(timer);
        if (o) {
            pX = e.pageX;
            pY = e.pageY;
            addEvent(el, 'mousemove', track(e));

            if (state !== 1) {
                timer = setTimeout(function() {
                    compare(el, event, e);
                }, h.options.interval);
            }
        } else {
            removeEvent(el, 'mousemove', track(e));
            if (state === 1) {
                timer = setTimeout(function() {
                    delay(el, event, e);
                }, h.options.timeout);
            }
        }
        return this;
    };

    var compare = function(el, overEvent, e) {
        if (timer) timer = clearTimeout(timer);
        if ((Math.abs(pX - x) + Math.abs(pY - y)) < h.options.sensitivity) {
            removeEvent(el, 'mousemove', track);
            state = 1;
            return overEvent.call(el, e);
        } else {
            pX = x; pY = y;
            timer = setTimeout(function () {
                compare(el, overEvent, e);
            }, h.options.interval);
        }
    };

    merge(h, {
        hover: function(el, over, out) {
            if (el) {
                addEvent(el, 'mouseover', function(e) { dispatch(e, over, true); });
                addEvent(el, 'mouseout', function(e) { dispatch(e, out); });
            }

            return this;
        }
    });
    return h;
};
