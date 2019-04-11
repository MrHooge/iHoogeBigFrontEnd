(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{271:function(t,a,s){"use strict";s.r(a);var e=s(4),r=Object(e.a)({},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"node-js-api"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#node-js-api","aria-hidden":"true"}},[t._v("#")]),t._v(" Node.js API "),s("Badge",{attrs:{text:"1.0.0-alpha.44+"}})],1),t._v(" "),s("h2",{attrs:{id:"使用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#使用","aria-hidden":"true"}},[t._v("#")]),t._v(" 使用")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" createApp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" dev"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" build"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" eject "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'vuepress'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h2",{attrs:{id:"方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#方法","aria-hidden":"true"}},[t._v("#")]),t._v(" 方法")]),t._v(" "),s("h3",{attrs:{id:"createapp-options-promise-app"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#createapp-options-promise-app","aria-hidden":"true"}},[t._v("#")]),t._v(" createApp([options]): Promise<App>")]),t._v(" "),s("p",[t._v("创建一个 VuePress 应用实例。")]),t._v(" "),s("h4",{attrs:{id:"app-prototype-process-promise-void-never"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#app-prototype-process-promise-void-never","aria-hidden":"true"}},[t._v("#")]),t._v(" App.prototype.process: () => Promise<void> | never")]),t._v(" "),s("p",[t._v("用于准备当前站点上下文的异步方法。其中包含加载页面和插件、应用插件等。")]),t._v(" "),s("h4",{attrs:{id:"app-prototype-dev-promise-app-never"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#app-prototype-dev-promise-app-never","aria-hidden":"true"}},[t._v("#")]),t._v(" App.prototype.dev: () => Promise<App> | never")]),t._v(" "),s("p",[t._v("使用当前应用程序上下文启动一个 devProcess.")]),t._v(" "),s("h4",{attrs:{id:"app-prototype-build-promise-app-never"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#app-prototype-build-promise-app-never","aria-hidden":"true"}},[t._v("#")]),t._v(" App.prototype.build: () => Promise<App> | never")]),t._v(" "),s("p",[t._v("使用当前应用程序上下文启动一个 buildProcess.")]),t._v(" "),s("h3",{attrs:{id:"dev-options-promise-app"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dev-options-promise-app","aria-hidden":"true"}},[t._v("#")]),t._v(" dev([options]): Promise<App>")]),t._v(" "),s("p",[t._v("启动一个 Dev Server，实际上它是由 "),s("code",[t._v("createapp")]),t._v(" 实现的：")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("async")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("dev")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("options")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" app "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("createApp")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("options"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" app"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("process")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" app"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("dev")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h3",{attrs:{id:"build-options-promise-app"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#build-options-promise-app","aria-hidden":"true"}},[t._v("#")]),t._v(" build([options]): Promise<App>")]),t._v(" "),s("p",[t._v("将源文件构建为静态站点, 实际上它是由 "),s("code",[t._v("createapp")]),t._v(" 实现的：")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("async")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("build")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("options")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" app "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("createApp")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("options"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" app"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("process")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" app"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("build")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h3",{attrs:{id:"eject-targetdir-promise-void"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#eject-targetdir-promise-void","aria-hidden":"true"}},[t._v("#")]),t._v(" eject(targetDir): Promise<void>")]),t._v(" "),s("p",[t._v("将默认主题复制到 "),s("code",[t._v("{targetDir}/.vuepress/theme")]),t._v("中进行自定义。")]),t._v(" "),s("h2",{attrs:{id:"options"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#options","aria-hidden":"true"}},[t._v("#")]),t._v(" Options")]),t._v(" "),s("h3",{attrs:{id:"sourcedir"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#sourcedir","aria-hidden":"true"}},[t._v("#")]),t._v(" sourceDir")]),t._v(" "),s("ul",[s("li",[t._v("类型: "),s("code",[t._v("string")])]),t._v(" "),s("li",[t._v("默认值: "),s("code",[t._v("true")])])]),t._v(" "),s("p",[t._v("指定 VuePress 站点的源目录。")]),t._v(" "),s("h3",{attrs:{id:"theme"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#theme","aria-hidden":"true"}},[t._v("#")]),t._v(" theme")]),t._v(" "),s("ul",[s("li",[t._v("类型: "),s("code",[t._v("string")])]),t._v(" "),s("li",[t._v("默认值: "),s("code",[t._v("false")])])]),t._v(" "),s("p",[t._v("参见 "),s("router-link",{attrs:{to:"/config/#theme"}},[t._v("theme")]),t._v("。")],1),t._v(" "),s("h3",{attrs:{id:"plugins"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#plugins","aria-hidden":"true"}},[t._v("#")]),t._v(" plugins")]),t._v(" "),s("ul",[s("li",[t._v("类型: "),s("code",[t._v("array")])]),t._v(" "),s("li",[t._v("默认值: "),s("code",[t._v("false")])])]),t._v(" "),s("p",[t._v("参见 "),s("router-link",{attrs:{to:"/config/#plugins"}},[t._v("plugins")]),t._v("。")],1),t._v(" "),s("h3",{attrs:{id:"temp"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#temp","aria-hidden":"true"}},[t._v("#")]),t._v(" temp")]),t._v(" "),s("ul",[s("li",[t._v("类型: "),s("code",[t._v("string")])]),t._v(" "),s("li",[t._v("默认值: "),s("code",[t._v("false")])])]),t._v(" "),s("p",[t._v("参见 "),s("router-link",{attrs:{to:"/config/#temp"}},[t._v("temp")]),t._v("。")],1),t._v(" "),s("h3",{attrs:{id:"dest"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dest","aria-hidden":"true"}},[t._v("#")]),t._v(" dest")]),t._v(" "),s("ul",[s("li",[t._v("类型: "),s("code",[t._v("string")])]),t._v(" "),s("li",[t._v("默认值: "),s("code",[t._v("false")])])]),t._v(" "),s("p",[t._v("参见 "),s("router-link",{attrs:{to:"/config/#dest"}},[t._v("dest")]),t._v("。")],1),t._v(" "),s("h3",{attrs:{id:"siteconfig"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#siteconfig","aria-hidden":"true"}},[t._v("#")]),t._v(" siteConfig")]),t._v(" "),s("ul",[s("li",[t._v("类型: "),s("code",[t._v("object")])]),t._v(" "),s("li",[t._v("默认值: "),s("code",[t._v("{}")])])]),t._v(" "),s("p",[t._v("当你想编写测试且不想依赖于实际的配置文件时，它将非常有用。想要查看所有的配置选项，请移步 "),s("router-link",{attrs:{to:"/config/"}},[t._v("siteConfig")]),t._v("。")],1)])},[],!1,null,null,null);a.default=r.exports}}]);