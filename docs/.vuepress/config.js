module.exports = {
  title: 'iHoogeBigFrontEnd',
  description: '猴哥的大前端',
  base: '/',
  dest: './dist',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'iHoogeBigFrontEnd',
      description: '猴哥的大前端'
    }
  },
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  themeConfig: {
    // repo: 'MrHooge/iHoogeBigFrontEnd',
    editLinks: true,
    docsDir: '/docs',
    logo: '/logo.png',
    label: '简体中文',
    selectText: '选择语言',
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新',
    nav: require('./nav/nav'),
    sidebar: 'auto'
    // nav: [
    //   { text: 'Web前端', link: '/web/' },
    //   { text: '移动端', link: '/mobile/' },
    //   { text: '服务端', link: '/service/' },
    //   { text: '计算机基础', link: '/code/' },
    // ]
  }
}