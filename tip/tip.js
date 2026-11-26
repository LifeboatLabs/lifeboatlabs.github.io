// Copy buttons for the tip addresses. Without JavaScript the addresses can still be selected and copied.
(function () {
  'use strict';
  var status = document.getElementById('copy-status');

  function selectText(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-copy]'), function (btn) {
    var label = btn.textContent;
    var el = document.getElementById(btn.getAttribute('data-copy'));
    btn.hidden = false;
    btn.addEventListener('click', function () {
      var text = el.textContent.trim();
      function done() {
        btn.textContent = 'Copied';
        status.textContent = 'Address copied.';
        setTimeout(function () { btn.textContent = label; }, 2000);
      }
      function fallback() {
        selectText(el);
        btn.textContent = 'Press Ctrl+C to copy';
        status.textContent = 'Address selected. Press Ctrl+C, or Command+C on a Mac, to copy it.';
        setTimeout(function () { btn.textContent = label; }, 4000);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback);
      else fallback();
    });
  });
})();
