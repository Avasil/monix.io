(function () {
  function _gaLoad(id) {
    (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
      m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
  
    ga('create', id, {
      'cookieName': '_gaMonixOrg',
      'cookieExpires': 60 * 60 * 24 * 30 * 3  // 3 months, in seconds
    });
    ga('set', 'anonymizeIp', true);
    ga('send', 'pageview');
  
    // Click handler
    $(function () {
      $('a[href]').each(function (idx, elem) {
        var it = $(elem);
        var href = it.attr('href');
  
        if (href.match(/^https?[:]\/\//) && !href.match(/monix\.io/)) {
          it.click(_gaEvent('general', 'click', 'external-link', href));
        } else if (href.match(/^#/)) {
          it.click(_gaEvent('general', 'click', 'page-anchor', href));
        } else {
          it.click(_gaEvent('general', 'click', 'internal-link', href));
        }
      })
    })
  }
  
  function _gaEvent(category, action, label, value) {
    return function () {
      if (_doNotTrack || typeof ga !== 'function') {
        return;
      }
      ga(function () {
        ga('send', 'event', category, action, label, value);
      });
    }
  }
  
  // Checks DO-NOT-TRACK status
  window._doNotTrack = false;
  if (window.doNotTrack || navigator.doNotTrack || navigator.msDoNotTrack || 'msTrackingProtectionEnabled' in window.external) {
    window._doNotTrack = window.doNotTrack == "1" || navigator.doNotTrack == "yes" ||
      navigator.doNotTrack == "1" || navigator.msDoNotTrack == "1" ||
      ('msTrackingProtectionEnabled' in window.external && window.external.msTrackingProtectionEnabled());
  }
  if (!_doNotTrack) {
    if (window.siteGaID) {
      console.log("Analytics are loading.")
      _gaLoad();
    } else {
      console.log("Analytics are off due to window.siteGaID not being set!");
    }
  } else if (typeof (console) !== "undefined") {
    console.log("Analytics are off due to Do Not Track setting!");
  }  
})();