// plugins/facebook-pixel.js

export default defineNuxtPlugin((nuxtApp) => {
  useHead({
    link: [
      {
        rel: 'preconnect',
        href: 'https://connect.facebook.net',
      },
    ],
  });

  if (process.client) {
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1055513409623776');
    fbq('track', 'PageView');
    nuxtApp.provide('fbq', fbq);
  }
});
