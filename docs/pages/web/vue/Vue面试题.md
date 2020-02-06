# Vue 面试题
## Vue 框架怎么实现对象和数组的监听？

如果被问到 Vue 怎么实现数据双向绑定，大家肯定都会回答 通过 Object.defineProperty() 对数据进行劫持，但是 Object.defineProperty() 只能对属性进行数据劫持，不能对整个对象进行劫持，同理无法对数组进行劫持，但是我们在使用 Vue 框架中都知道，Vue 能检测到对象和数组（部分方法的操作）的变化，那它是怎么实现的呢？我们查看相关代码如下：
```js
  /**
   * Observe a list of Array items.
   */
  observeArray (items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])  // observe 功能为监测数据的变化
    }
  }

  /**
   * 对属性进行递归遍历
   */
  let childOb = !shallow && observe(val) // observe 功能为监测数据的变化
```
通过以上 Vue 源码部分查看，我们就能知道 Vue 框架是通过遍历数组 和递归遍历对象，从而达到利用 Object.defineProperty() 也能对对象和数组（部分方法的操作）进行监听。

## Vue 怎么用 vm.$set() 解决对象新增属性不能响应的问题 ？

受现代 JavaScript 的限制 ，Vue 无法检测到对象属性的添加或删除。由于 Vue 会在初始化实例时对属性执行 getter/setter 转化，所以属性必须在 data 对象上存在才能让 Vue 将它转换为响应式的。但是 Vue 提供了 Vue.set (object, propertyName, value) / vm.$set (object, propertyName, value) 来实现为对象添加响应式属性，那框架本身是如何实现的呢？


我们查看对应的 Vue 源码：vue/src/core/instance/index.js
```js
export function set (target: Array<any> | Object, key: any, val: any): any {
  // target 为数组  
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    // 修改数组的长度, 避免索引>数组长度导致splcie()执行有误
    target.length = Math.max(target.length, key)
    // 利用数组的splice变异方法触发响应式  
    target.splice(key, 1, val)
    return val
  }
  // key 已经存在，直接修改属性值  
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  const ob = (target: any).__ob__
  // target 本身就不是响应式数据, 直接赋值
  if (!ob) {
    target[key] = val
    return val
  }
  // 对属性进行响应式处理
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}
```
我们阅读以上源码可知，vm.$set 的实现原理是：
如果目标是数组，直接使用数组的 splice 方法触发相应式；
如果目标是对象，会先判读属性是否存在、对象是否是响应式，最终如果要对属性进行响应式处理，则是通过调用 defineReactive 方法进行响应式处理（ defineReactive 方法就是 Vue 在初始化对象时，给对象属性采用 Object.defineProperty 动态添加 getter 和 setter 的功能所调用的方法）

## 你有对 Vue 项目进行哪些优化？
如果没有对 Vue 项目没有进行过优化总结的同学，可以参考本文作者的另一篇文章[《 Vue 项目性能优化 — 实践指南 》](https://juejin.im/post/5d548b83f265da03ab42471d)，文章主要介绍从 3 个大方面，22 个小方面详细讲解如何进行 Vue 项目的优化。

（1）代码层面的优化
- v-if 和 v-show 区分使用场景
- computed 和 watch 区分使用场景
- v-for 遍历必须为 item 添加 key，且避免同时使用 v-if
- 长列表性能优化
- 事件的销毁
- 图片资源懒加载
- 路由懒加载
- 第三方插件的按需引入
- 优化无限列表性能
- 服务端渲染 SSR or 预渲染

（2）Webpack 层面的优化
- Webpack 对图片进行压缩
- 减少 ES6 转为 ES5 的冗余代码
- 提取公共代码
- 模板预编译
- 提取组件的 CSS
- 优化 SourceMap
- 构建结果输出分析
- Vue 项目的编译优化

（3）基础的 Web 技术的优化
- 开启 gzip 压缩
- 浏览器缓存
- CDN 的使用
- 使用 Chrome Performance 查找性能瓶颈

## 对于即将到来的 vue3.0 特性你有什么了解的吗？

Vue 3.0 正走在发布的路上，Vue 3.0 的目标是让 Vue 核心变得更小、更快、更强大，因此 Vue 3.0 增加以下这些新特性：


（1）监测机制的改变


3.0 将带来基于代理 Proxy 的 observer 实现，提供全语言覆盖的反应性跟踪。这消除了 Vue 2 当中基于 Object.defineProperty 的实现所存在的很多限制：
- 只能监测属性，不能监测对象
- 检测属性的添加和删除；
- 检测数组索引和长度的变更；
- 支持 Map、Set、WeakMap 和 WeakSet。

新的 observer 还提供了以下特性：
- 用于创建 observable 的公开 API。这为中小规模场景提供了简单轻量级的跨组件状态管理解决方案。
- 默认采用惰性观察。在 2.x 中，不管反应式数据有多大，都会在启动时被观察到。如果你的数据集很大，这可能会在应用启动时带来明显的开销。在 3.x 中，只观察用于渲染应用程序最初可见部分的数据。
- 更精确的变更通知。在 2.x 中，通过 Vue.set 强制添加新属性将导致依赖于该对象的 watcher 收到变更通知。在 3.x 中，只有依赖于特定属性的 watcher 才会收到通知。
- 不可变的 observable：我们可以创建值的“不可变”版本（即使是嵌套属性），除非系统在内部暂时将其“解禁”。这个机制可用于冻结 prop 传递或 Vuex 状态树以外的变化。
- 更好的调试功能：我们可以使用新的 renderTracked 和 renderTriggered 钩子精确地跟踪组件在什么时候以及为什么重新渲染。

（2）模板


模板方面没有大的变更，只改了作用域插槽，2.x 的机制导致作用域插槽变了，父组件会重新渲染，而 3.0 把作用域插槽改成了函数的方式，这样只会影响子组件的重新渲染，提升了渲染的性能。
同时，对于 render 函数的方面，vue3.0 也会进行一系列更改来方便习惯直接使用 api 来生成 vdom 。


（3）对象式的组件声明方式


vue2.x 中的组件是通过声明的方式传入一系列 option，和 TypeScript 的结合需要通过一些装饰器的方式来做，虽然能实现功能，但是比较麻烦。3.0 修改了组件的声明方式，改成了类式的写法，这样使得和 TypeScript 的结合变得很容易。
此外，vue 的源码也改用了 TypeScript 来写。其实当代码的功能复杂之后，必须有一个静态类型系统来做一些辅助管理。现在 vue3.0 也全面改用 TypeScript 来重写了，更是使得对外暴露的 api 更容易结合 TypeScript。静态类型系统对于复杂代码的维护确实很有必要。

（4）其它方面的更改

- vue3.0 的改变是全面的，上面只涉及到主要的 3 个方面，还有一些其他的更改：
- 支持自定义渲染器，从而使得 weex 可以通过自定义渲染器的方式来扩展，而不是直接 fork 源码来改的方式。
- 支持 Fragment（多个根节点）和 Protal（在 dom 其他部分渲染组建内容）组件，针对一些特殊的场景做了处理。
- 基于 treeshaking 优化，提供了更多的内置功能。

## computed和watch有什么区别

**computed**

> computed是计算属性，也就是计算值，它更多用于计算值的场景
computed具有缓存性，computed的值在getter执行后是会缓存的，只有在它依赖的属性值改变之后，下一次获取computed的值时重新调用对应的getter来计算
computed适用于计算比较消耗性能的计算场景

**watch**

> watch更多的是[观察]的作用，类似于某些数据的监听回调，用于观察props $emit或者本组件的值，当数据变化时来执行回调进行后续操作
无缓存性，页面重新渲染时值不变化也会执行

**小结**

当我们要进行数值计算，而且依赖于其他数据，那么把这个数据设计为computed
如果你需要在某个数据变化时做一些事情，使用watch来观察这个数据变化。
## vue组件的scoped属性的作用
在style标签上添加scoped属性，以表示它的样式作用于当下的模块，很好的实现了样式私有化的目的；
但是也得慎用：样式不易（可）修改，而很多时候，我们是需要对公共组件的样式做微调的；
解决办法：

①：使用混合型的css样式：（混合使用全局跟本地的样式） `<style> /* 全局样式 */ </style><style scoped> /* 本地样式 */ </style>`
②：深度作用选择器（>>>）如果你希望 scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用 >>> 操作符：`<style scoped> .a >>> .b { /* ... */ } </style>`

## vue是渐进式的框架的理解：(主张最少,没有多做职责之外的事)
Vue的核心的功能，是一个视图模板引擎，但这不是说Vue就不能成为一个框架。如下图所示，这里包含了Vue的所有部件，在声明式渲染（视图模板引擎）的基础上，我们可以通过添加组件系统、客户端路由、大规模状态管理来构建一个完整的框架。更重要的是，这些功能相互独立，你可以在核心功能的基础上任意选用其他的部件，不一定要全部整合在一起。可以看到，所说的“渐进式”，其实就是Vue的使用方式，同时也体现了Vue的设计的理念
在我看来，渐进式代表的含义是：主张最少。视图模板引擎
每个框架都不可避免会有自己的一些特点，从而会对使用者有一定的要求，这些要求就是主张，主张有强有弱，它的强势程度会影响在业务开发中的使用方式。
比如说，Angular，它两个版本都是强主张的，如果你用它，必须接受以下东西：
必须使用它的模块机制- 必须使用它的依赖注入- 必须使用它的特殊形式定义组件（这一点每个视图框架都有，难以避免）
所以Angular是带有比较强的排它性的，如果你的应用不是从头开始，而是要不断考虑是否跟其他东西集成，这些主张会带来一些困扰。
Vue可能有些方面是不如React，不如Angular，但它是渐进的，没有强主张，你可以在原有大系统的上面，把一两个组件改用它实现，当jQuery用；也可以整个用它全家桶开发，当Angular用；还可以用它的视图，搭配你自己设计的整个下层用。也可以函数式，都可以，它只是个轻量视图而已，只做了自己该做的事，没有做不该做的事，仅此而已。
渐进式的含义，我的理解是：没有多做职责之外的事。

## 什么是vue-loader？
Vue-loader 是 Webpack 的加载器模块，它使我们可以用 .vue 文件格式编写单文件组件。单文件组件文件有三个部分，即模板、脚本和样式。 vue-loader 模块允许 webpack 使用单独的加载器模块（例如 SASS 或 SCSS 加载器）提取和处理每个部分。该设置使我们可以使用 .vue 文件无缝编写程序。

vue-loader 模块还允许把静态资源视为模块依赖性，并允许使用 webpack 加载器进行处理。而且还允许在开发过程中进行热重装.
## 什么是 mixin？
Mixins 使我们能够为 Vue 组件编写可插拔和可重用的功能。如果你希望在多个组件之间重用一组组件选项，例如生命周期 hook、方法等，则可以将其编写为 mixin，并在组件中简单地引用它。然后将 mixin 的内容合并到组件中。如果你要在 mixin 中定义生命周期 hook，那么它在执行时将优先于组件自己的 hook 。

## vue双向绑定原理？
通过Object.defineProperty()来劫持各个属性的setter,getter，在数据变动时发布消息给订阅者，触发相应的监听回调

## vue如何优化首页的加载速度？
① 第三方js库按CDN引入（一、cdn引入 二、去掉第三方库引入的import 三、把第三方库的js文件从打包文件里去掉）

② vue-router路由懒加载

③ 压缩图片资源

④ 静态文件本地缓存

http缓存：推荐网站：https://www.cnblogs.com/chinajava/p/5705169.html

service worker离线缓存:，缺点：需要在HTTPS站点下，推荐：http://lzw.me/a/pwa-service-worker.html

⑤ 服务器端SSR渲染

除了上面的方案以外，另一种方案也不容小视

我们先说说通常项目中是如何加载页面数据：Vue组件生命周期中请求异步接口，在mounted之前应该都可以，据我了解绝大部分同学是在mounted的时候执行异步请求。但是我们可以把页面需要的请求放到Vue-Router的守卫中执行，意思是在路由beforeEnter之前就可以请求待加载页面中所有组件需要的数据，此时待加载页面的Vue组件还没开始渲染，而Vue组件开始渲染的时候我们就可以用Vuex里面的数据了。

## vue能监听到数组变化的方法有哪些？为什么这些方法能监听到呢？
Vue.js观察数组变化主要通过以下7个方法（push、pop、shift、unshift、splice、sort、reverse）

大家知道，通过Object.defineProperty()劫持数组为其设置getter和setter后，调用的数组的push、splice、pop等方法改变数组元素时并不会触发数组的setter，继而数组的数据变化并不是响应式的，但是vue实际开发中却是实时响应的，是因为vue重写了数组的push、splice、pop等方法

从源码中可以看出，ob.dep.notify()将当前数组的变更通知给其订阅者，这样当使用重写后方法改变数组后，数组订阅者会将这边变化更新到页面中

## axios怎么解决跨域的问题？
使用axios直接进行跨域访问不可行，我们需要配置代理

代理可以解决的原因：

因为客户端请求服务端的数据是存在跨域问题的，而服务器和服务器之间可以相互请求数据，是没有跨域的概念（如果服务器没有设置禁止跨域的权限问题），也就是说，我们可以配置一个代理的服务器可以请求另一个服务器中的数据，然后把请求出来的数据返回到我们的代理服务器中，代理服务器再返回数据给我们的客户端，这样我们就可以实现跨域访问数据

1.配置BaseUrl
```js
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'  //关键代码
```
2.配置代理

在config文件夹下的index.js文件中的proxyTable字段中，作如下处理：
```js
proxyTable: {
 '/api': {
   target:'http://api.douban.com/v2', // 你请求的第三方接口
   changeOrigin:true, 
// 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，
//这样服务端和服务端进行数据的交互就不会有跨域问题
   pathRewrite:{  // 路径重写，
    '^/api': ''  
// 替换target中的请求地址，也就是说以后你在请求http://api.douban.com/v2/XXXXX
//这个地址的时候直接写成/api即可。
   }
  }
}
```
1. 在具体使用axios的地方，修改url如下即可
```js
axios.get("/movie/top250").then((res) => {
  res = res.data
  if (res.errno === ERR_OK) {
    this.themeList=res.data;
  }
 }).catch((error) => {
  console.warn(error)
})
```
原理：

因为我们给url加上了前缀/api，我们访问/movie/top250就当于访问了：localhost:8080/api/movie/top250（其中localhost:8080是默认的IP和端口）。

在index.js中的proxyTable中拦截了/api,并把/api及其前面的所有替换成了target中的内容，因此实际访问Url是http://api.douban.com/v2/movie/top250。

至此，纯前端配置代理解决axios跨域得到解决

## 怎么实现路由懒加载呢？
第一种（最常用）：
```js
const Foo = () => import('./Foo.vue')
const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo }
  ]
})
```
第二种：
```js
const router = new Router({
  routes: [
   {
     path: '/index',
     component: (resolve) => {
        require(['../components/index'], resolve) // 这里是你的模块 不用import去引入了
     }
    }
  ]
})
```
第三种（官方推荐）：
```js
// r就是resolve
const list = r => require.ensure([], () => r(require('../components/list/list')), 'list');
// 路由也是正常的写法  这种是官方推荐的写的 按模块划分懒加载 
const router = new Router({
  routes: [
  {
    path: '/list/blog',
    component: list,
    name: 'blog'
  }
 ]
})
```
