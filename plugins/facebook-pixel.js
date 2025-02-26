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
    const initFacebookPixel = () => {
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
    };

    // Load the pixel when the browser is idle
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        initFacebookPixel();
      });
    } else {
      // Fallback for browsers that don't support requestIdleCallback (e.g., Safari)
      setTimeout(() => {
        initFacebookPixel();
      }, 1000); // Delay by 1 second as a fallback
    }

    // Provide fbq to the app, with a fallback if it's not yet loaded
    const fbqWrapper = (...args) => {
      if (window.fbq) {
        window.fbq(...args);
      } else {
        setTimeout(() => fbqWrapper(...args), 500); // Retry if not ready
      }
    };
    nuxtApp.provide('fbq', fbqWrapper);
  }
});