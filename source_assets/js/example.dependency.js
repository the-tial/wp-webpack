var jQuery = require('jquery');
var mousePoint = {
  x: 0,
  y: 0
};

function onContentMouseIn() {
  jQuery('.main').css('background', '#fe5e78');
}

function onContentMouseOut() {
  jQuery('.main').css('background', '');
}

function trackMouse() {
  jQuery(document).mousemove(function(e) {
    mousePoint.x = e.pageX;
    mousePoint.y = e.pageY;
  });
}

function isMouseIn() {
  var w = jQuery('.main_content').width();
  var h = jQuery('.main_content').height();
  var t = jQuery('.main_content').offset().top;
  var l = jQuery('.main_content').offset().left;

  return mousePoint.x > l
    && mousePoint.x < l + w
    && mousePoint.y > t
    && mousePoint.y < t +h;
}

function startIfMouseIn() {
  if (isMouseIn()) {
    onContentMouseIn();
  }
}

function makeItBeautiful() {
  trackMouse();
  jQuery('.main_content').hover(onContentMouseIn, onContentMouseOut);
  startIfMouseIn();
}

module.exports = {
  makeItBeautiful: makeItBeautiful
};
