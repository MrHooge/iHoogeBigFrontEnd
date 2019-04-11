/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "b5507f57bef91cd69ccfd728330b58eb"
  },
  {
    "url": "api/cli.html",
    "revision": "5faf7838b1dd0f06eb45baa4fd184a5b"
  },
  {
    "url": "api/node.html",
    "revision": "69bdaadde89b21b912d8b5d75456cf51"
  },
  {
    "url": "architecture.png",
    "revision": "9a93cf6cea38878e19c5816d1af28b17"
  },
  {
    "url": "assets/css/0.styles.c1bbd5e7.css",
    "revision": "92f259790fb532494646a74dd1a3df08"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.a909a3c4.js",
    "revision": "3cf969407da18c9c12779cc96b2afdee"
  },
  {
    "url": "assets/js/11.d37dc5b2.js",
    "revision": "f75b88717604ad5ce37648ccc243dacb"
  },
  {
    "url": "assets/js/12.06a1986d.js",
    "revision": "c6eb9513101c044d4b42624da2bc2bff"
  },
  {
    "url": "assets/js/13.0155af49.js",
    "revision": "b36338a38195b9f26e5b4932ed163e41"
  },
  {
    "url": "assets/js/14.a72c8ad6.js",
    "revision": "409cd7d4d547b077c86c95f90575d35f"
  },
  {
    "url": "assets/js/15.a335eef5.js",
    "revision": "18d220a53c44955b566714b7153c152f"
  },
  {
    "url": "assets/js/16.0b8780fa.js",
    "revision": "c03d350d2b445064223e76c8431ed9e4"
  },
  {
    "url": "assets/js/17.f212b972.js",
    "revision": "cd53f2783fce8c415bb03b031828e243"
  },
  {
    "url": "assets/js/18.b058e5cb.js",
    "revision": "764cab4b2680b635d394e540bd1a24e1"
  },
  {
    "url": "assets/js/19.d0ade919.js",
    "revision": "8d68670c16b397cf9796ffbe2a9d4bf0"
  },
  {
    "url": "assets/js/20.100e4076.js",
    "revision": "fde1b22d779789d7beb47e06ad0a1d0d"
  },
  {
    "url": "assets/js/21.8929ac45.js",
    "revision": "a95b1c820a22f9173fcf69ce52a3a2f7"
  },
  {
    "url": "assets/js/22.63a92ae9.js",
    "revision": "3182b9b3390654db8cd433fbacdb0da4"
  },
  {
    "url": "assets/js/23.c0f043a4.js",
    "revision": "510871f98e7a5aa735ef30a3ce7580ee"
  },
  {
    "url": "assets/js/24.817fd9ff.js",
    "revision": "01e07fd8f68a88693e682dafe8e54b3d"
  },
  {
    "url": "assets/js/25.8db84404.js",
    "revision": "20fd45eea49d92d5634d4bf60aed1687"
  },
  {
    "url": "assets/js/26.6983a361.js",
    "revision": "0dbad6157cd769bfa2a99c65f147e462"
  },
  {
    "url": "assets/js/27.cd5fad00.js",
    "revision": "b6af10a4926a7ac5f556f43d67791e54"
  },
  {
    "url": "assets/js/28.5e8484d1.js",
    "revision": "02ba4454d60f66e10315378c4d28162f"
  },
  {
    "url": "assets/js/29.92c015c2.js",
    "revision": "2a49dedbb6d358c1f29bfa8b414c34a7"
  },
  {
    "url": "assets/js/3.6de84462.js",
    "revision": "f544711c0b71dcee1e1f90ab108cbdbb"
  },
  {
    "url": "assets/js/30.00ed802a.js",
    "revision": "b0d03110fdfaf759fcce0b13934496f4"
  },
  {
    "url": "assets/js/31.25a3e848.js",
    "revision": "35a08d7f7b47d28d07c0ffb444d29f03"
  },
  {
    "url": "assets/js/32.c94de504.js",
    "revision": "e65aefeefe8e05b22d970662ea87f929"
  },
  {
    "url": "assets/js/33.5620c115.js",
    "revision": "a588c6122bad4ec53ed7edfd667a7ef8"
  },
  {
    "url": "assets/js/34.154f75c6.js",
    "revision": "c8c895c389a0a8a3beef9466ce11c160"
  },
  {
    "url": "assets/js/35.cb2f8889.js",
    "revision": "874391031dc99411927f9121cf3d2edc"
  },
  {
    "url": "assets/js/36.d0e3dc98.js",
    "revision": "3d83cce91e64f0d3d88bf81435e55813"
  },
  {
    "url": "assets/js/37.db5c13d2.js",
    "revision": "b06c8031981754b07c4f2517e35419be"
  },
  {
    "url": "assets/js/38.1ac1e77b.js",
    "revision": "40208acace0fbe3911f1817692f76d96"
  },
  {
    "url": "assets/js/39.efc56381.js",
    "revision": "76dea6ba462127c189450c9fade9a0dc"
  },
  {
    "url": "assets/js/4.a7759bcd.js",
    "revision": "aae18d793b0dc04932a48d4ea7fabd6a"
  },
  {
    "url": "assets/js/40.af8967e3.js",
    "revision": "359421908b774754f2d471076fb9baa4"
  },
  {
    "url": "assets/js/41.38fef9a0.js",
    "revision": "949f064b6286caa42ee27710e59ea554"
  },
  {
    "url": "assets/js/42.7995b8ec.js",
    "revision": "758cd26a7cb569b969773cf638bbaa4f"
  },
  {
    "url": "assets/js/43.a4ac44c0.js",
    "revision": "926d06cfcd797286d115dfc360ebee85"
  },
  {
    "url": "assets/js/44.8a276a25.js",
    "revision": "051536b2e597615b59c4cff8de10af01"
  },
  {
    "url": "assets/js/45.74e1f0df.js",
    "revision": "ee7727c21ac26f17f852c9c62e42308e"
  },
  {
    "url": "assets/js/46.af5c0a60.js",
    "revision": "086cd4c00e2caccf5557aba80bfa8264"
  },
  {
    "url": "assets/js/47.7fb785e7.js",
    "revision": "8e7a0ee3bef40b97f1495536f361a463"
  },
  {
    "url": "assets/js/48.a581101c.js",
    "revision": "d2a84ba37bc36b69ce2686a1ae701f0d"
  },
  {
    "url": "assets/js/49.5fe935fd.js",
    "revision": "25c8ce6f1dc45bfcb8d78cf263cc3c06"
  },
  {
    "url": "assets/js/5.05322cf3.js",
    "revision": "61186982d3673f3eb98ff0807a3bab7c"
  },
  {
    "url": "assets/js/50.5643d6e2.js",
    "revision": "b97fed22f18d75456943713c8d545df2"
  },
  {
    "url": "assets/js/51.09341e6a.js",
    "revision": "4912ea54731bdf51a807fd099fd8af77"
  },
  {
    "url": "assets/js/52.5eb50524.js",
    "revision": "b9a81139640f82c9039946a4743515a3"
  },
  {
    "url": "assets/js/53.6b58c7bb.js",
    "revision": "c1225a401adb6d08af37057754480cb6"
  },
  {
    "url": "assets/js/54.180fd892.js",
    "revision": "8f147e572d91df81935a2e304a78a713"
  },
  {
    "url": "assets/js/55.0a7b7780.js",
    "revision": "1d42471e13184253c6d122ef7ba02270"
  },
  {
    "url": "assets/js/56.4b99e202.js",
    "revision": "a7886cc63f70f9d910e19c880ec063e3"
  },
  {
    "url": "assets/js/57.fad26005.js",
    "revision": "bd4e3a90e9a7d3e941d26d521b6124d4"
  },
  {
    "url": "assets/js/58.d92a32c7.js",
    "revision": "6770dc04a6eab9329b6b52ceed4efd12"
  },
  {
    "url": "assets/js/6.30b77ca1.js",
    "revision": "6eba525d60e55ed9269f81ed06659fc0"
  },
  {
    "url": "assets/js/7.d0998704.js",
    "revision": "74a46f1b91da46c489946a0744f0d1fe"
  },
  {
    "url": "assets/js/8.5373e828.js",
    "revision": "ac375c9439fe8403fc19d7f77446f76d"
  },
  {
    "url": "assets/js/9.6193f8fb.js",
    "revision": "81fd23d44f0e27c5461e7f6c952954a5"
  },
  {
    "url": "assets/js/app.10df0b3c.js",
    "revision": "cb96cbb76e36e36cf9e3b5f2a5cb2c65"
  },
  {
    "url": "assets/js/vendors~notification.d46f52cf.js",
    "revision": "f4da46824f4d56987f0a9c940fc14ef2"
  },
  {
    "url": "config/index.html",
    "revision": "7d1f54c0dbce60761c8c17df756c4d27"
  },
  {
    "url": "faq/index.html",
    "revision": "4949c1ae929f56c78b4b54424ef89b17"
  },
  {
    "url": "guide/assets.html",
    "revision": "c7224d191a119b648ce3d624756d102a"
  },
  {
    "url": "guide/basic-config.html",
    "revision": "56923da7e908456b912b6d3bb07742d9"
  },
  {
    "url": "guide/deploy.html",
    "revision": "eb60722666a40e56a3221851134cdfa1"
  },
  {
    "url": "guide/directory-structure.html",
    "revision": "4c49dfaf2fcb2fa2913fa6d327edf329"
  },
  {
    "url": "guide/frontmatter.html",
    "revision": "faed8d7566e868bce2d09c5b6e091868"
  },
  {
    "url": "guide/getting-started.html",
    "revision": "8f45a5ce3331dc7ab80813712107a2c8"
  },
  {
    "url": "guide/global-computed.html",
    "revision": "4c3562263001ba95f3f4c6328c9f42de"
  },
  {
    "url": "guide/i18n.html",
    "revision": "7cfb011c48b86e6483f6660aba721275"
  },
  {
    "url": "guide/index.html",
    "revision": "b023719fb2e816119c982e52cedf58e4"
  },
  {
    "url": "guide/markdown-slot.html",
    "revision": "5eceda0a49291d0d3736973274a9a9ed"
  },
  {
    "url": "guide/markdown.html",
    "revision": "6b20594ed170066b9916084f449e1780"
  },
  {
    "url": "guide/permalinks.html",
    "revision": "c6e7321d143147f0ceb3eb153d97b10c"
  },
  {
    "url": "guide/using-vue.html",
    "revision": "e8df7288e9f21305c3ec91166a689afa"
  },
  {
    "url": "hero.png",
    "revision": "d1fed5cb9d0a4c4269c3bcc4d74d9e64"
  },
  {
    "url": "icons/android-chrome-192x192.png",
    "revision": "f130a0b70e386170cf6f011c0ca8c4f4"
  },
  {
    "url": "icons/android-chrome-512x512.png",
    "revision": "0ff1bc4d14e5c9abcacba7c600d97814"
  },
  {
    "url": "icons/apple-touch-icon-120x120.png",
    "revision": "936d6e411cabd71f0e627011c3f18fe2"
  },
  {
    "url": "icons/apple-touch-icon-152x152.png",
    "revision": "1a034e64d80905128113e5272a5ab95e"
  },
  {
    "url": "icons/apple-touch-icon-180x180.png",
    "revision": "c43cd371a49ee4ca17ab3a60e72bdd51"
  },
  {
    "url": "icons/apple-touch-icon-60x60.png",
    "revision": "9a2b5c0f19de617685b7b5b42464e7db"
  },
  {
    "url": "icons/apple-touch-icon-76x76.png",
    "revision": "af28d69d59284dd202aa55e57227b11b"
  },
  {
    "url": "icons/apple-touch-icon.png",
    "revision": "66830ea6be8e7e94fb55df9f7b778f2e"
  },
  {
    "url": "icons/favicon-16x16.png",
    "revision": "4bb1a55479d61843b89a2fdafa7849b3"
  },
  {
    "url": "icons/favicon-32x32.png",
    "revision": "98b614336d9a12cb3f7bedb001da6fca"
  },
  {
    "url": "icons/msapplication-icon-144x144.png",
    "revision": "b89032a4a5a1879f30ba05a13947f26f"
  },
  {
    "url": "icons/mstile-150x150.png",
    "revision": "058a3335d15a3eb84e7ae3707ba09620"
  },
  {
    "url": "icons/safari-pinned-tab.svg",
    "revision": "f22d501a35a87d9f21701cb031f6ea17"
  },
  {
    "url": "index.html",
    "revision": "d16cce19a82f8ff8f42a57235d2d914b"
  },
  {
    "url": "line-numbers-desktop.png",
    "revision": "7c8ccab7c4953ac2fb9e4bc93ecd25ac"
  },
  {
    "url": "line-numbers-mobile.gif",
    "revision": "580b860f45436c9a15a9f3bd036edd97"
  },
  {
    "url": "logo.png",
    "revision": "cf23526f451784ff137f161b8fe18d5a"
  },
  {
    "url": "miscellaneous/design-concepts.html",
    "revision": "bc1ee6c4f2e0e327520a68f5b6cf5deb"
  },
  {
    "url": "miscellaneous/glossary.html",
    "revision": "dccbf2dc4478b07a5e53710393a33849"
  },
  {
    "url": "miscellaneous/migration-guide.html",
    "revision": "1a9cccaee9864046c7a35651b33d018d"
  },
  {
    "url": "plugin.png",
    "revision": "3e325210d3e3752e32818385fc4afbc9"
  },
  {
    "url": "plugin/context-api.html",
    "revision": "3e1861769090cf6c77133c315f3c29a5"
  },
  {
    "url": "plugin/index.html",
    "revision": "37ab7b35c5a7dd982b392275f419bfec"
  },
  {
    "url": "plugin/life-cycle.html",
    "revision": "2170b015614cfc8f79d533ad5fb3b46d"
  },
  {
    "url": "plugin/official/plugin-active-header-links.html",
    "revision": "a7e495afa47b95a4f74fa4bf0da3ae71"
  },
  {
    "url": "plugin/official/plugin-back-to-top.html",
    "revision": "f7b6335365168f61ccd0408cf9db10ba"
  },
  {
    "url": "plugin/official/plugin-blog.html",
    "revision": "90a2c005ffbce8279f03353677a90c94"
  },
  {
    "url": "plugin/official/plugin-google-analytics.html",
    "revision": "14bb86128a4d65441c7ca49c1eba9f36"
  },
  {
    "url": "plugin/official/plugin-last-updated.html",
    "revision": "21170df3d974dd3e5ee2ecc94f23cf45"
  },
  {
    "url": "plugin/official/plugin-medium-zoom.html",
    "revision": "340b8778c6d1abf720c3268f2b64c512"
  },
  {
    "url": "plugin/official/plugin-nprogress.html",
    "revision": "6da7738781e2238a9b071a65c9702e4c"
  },
  {
    "url": "plugin/official/plugin-pagination.html",
    "revision": "31abbfc8d1ab3bb486b61df50e172095"
  },
  {
    "url": "plugin/official/plugin-pwa.html",
    "revision": "38830a762b68d5415cfbfd11ddc2d8db"
  },
  {
    "url": "plugin/official/plugin-register-components.html",
    "revision": "1f103b83f447bdf3491f5964653d77ca"
  },
  {
    "url": "plugin/official/plugin-search.html",
    "revision": "148e29478118449ac076036bf451b295"
  },
  {
    "url": "plugin/option-api.html",
    "revision": "701703db3f707ba025ca6dd317584de2"
  },
  {
    "url": "plugin/using-a-plugin.html",
    "revision": "354b82ae1ccb9cfe8e320b1c426280c4"
  },
  {
    "url": "plugin/writing-a-plugin.html",
    "revision": "0ca1dec0a7b821f6c18d56faf4811ae4"
  },
  {
    "url": "theme/default-theme-config.html",
    "revision": "017138471aff7442d20f1d5aacfbc930"
  },
  {
    "url": "theme/index.html",
    "revision": "e5c95130f1e1c387200e95f2c5d65bba"
  },
  {
    "url": "theme/inheritance.html",
    "revision": "8b76ff3dbd626272837633baa1ccff71"
  },
  {
    "url": "theme/option-api.html",
    "revision": "b97440cc14cd15dd6735fbbddaf58624"
  },
  {
    "url": "theme/using-a-theme.html",
    "revision": "799ece3d1dafb78c209c97ea1fe75d31"
  },
  {
    "url": "theme/writing-a-theme.html",
    "revision": "9d3ee1ab1de8dcee54e9b68bd1d60305"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
