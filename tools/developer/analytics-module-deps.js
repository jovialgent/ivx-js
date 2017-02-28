module.exports = {
    'google': getGoogle()
}

function getGoogle() {
    let gaScript = `<script>
    (function (b, o, i, l, e, r) {
    b.GoogleAnalyticsObject = l; b[l] || (b[l] =
      function () { (b[l].q = b[l].q || []).push(arguments) }); b[l].l = +new Date;
      e = o.createElement(i); r = o.getElementsByTagName(i)[0];
      e.src = 'https://www.google-analytics.com/analytics.js';
      r.parentNode.insertBefore(e, r)
    } (window, document, 'script', 'ga'));
  </script>`
    return {
        injector: "iVXjs.analytics.google",
        directive: "iVXjsGoogleAnalytics",
        configFunction: `analytics: iVXjsGoogleAnalytics({}, iVXjs)`,
        js: gaScript,
        ivxjs: "js/modules/iVXjs.analytics.google.min.js",
        trackingID: "UA-123-12"
    }
}