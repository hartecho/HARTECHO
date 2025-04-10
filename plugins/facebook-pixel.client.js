// plugins/facebook-pixel.client.js
export default defineNuxtPlugin((nuxtApp) => {
  useHead({
    link: [
      {
        rel: 'preconnect',
        href: 'https://connect.facebook.net',
      },
    ],
  });

  // Wrapper function to log pixel events
  const fbqWrapper = (...args) => {
    console.log('Facebook Pixel event triggered:', args);
    if (window.fbq) {
      window.fbq(...args);
    } else {
      setTimeout(() => fbqWrapper(...args), 500);
    }
  };

  // Initialize the Facebook Pixel and use fbqWrapper for triggering events
  const initFacebookPixel = () => {
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
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

    const pixelID = useRuntimeConfig().public.META_PIXEL_ID;
    fbqWrapper('init', pixelID);
    fbqWrapper('track', 'PageView');
  };

  // Load the pixel when the browser is idle or fallback to a delay
  if ('requestIdleCallback' in window) {
    requestIdleCallback(initFacebookPixel);
  } else {
    setTimeout(initFacebookPixel, 1000); // Fallback delay
  }

  // Provide fbqWrapper to the app so that all future fbq events are logged
  nuxtApp.provide('fbq', fbqWrapper);
});
