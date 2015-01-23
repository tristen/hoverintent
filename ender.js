!function($) {
  $.ender({
    hoverintent: function(over, out) {
      return this.forEach(function(el) {
        hoverintent(el, over, out).options(opt || {});
      });
    }
  }, true);
}(ender);
