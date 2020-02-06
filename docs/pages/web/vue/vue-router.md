## vue-router 路由模式有几种？

vue-router 有 3 种路由模式：hash、history、abstract，对应的源码如下所示：

switch (mode) {
  case 'history':
	this.history = new HTML5History(this, options.base)
	break
  case 'hash':
	this.history = new HashHistory(this, options.base, this.fallback)
	break
  case 'abstract':
	this.history = new AbstractHistory(this, options.base)
	break
  default:
	if (process.env.NODE_ENV !== 'production') {
	  assert(false, `invalid mode: ${mode}`)
	}
}

其中，3 种路由模式的说明如下：
hash: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器；
history : 依赖 HTML5 History API 和服务器配置。具体可以查看 HTML5 History 模式；
abstract : 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式.

## 能说下 vue-router 中常用的 hash 和 history 路由模式实现原理吗？

（1）hash 模式的实现原理
早期的前端路由的实现就是基于 location.hash 来实现的。其实现原理很简单，location.hash 的值就是 URL 中 # 后面的内容。比如下面这个网站，它的 location.hash 的值为 '#search'：
https://www.word.com#search

hash 路由模式的实现主要是基于下面几个特性：
URL 中 hash 值只是客户端的一种状态，也就是说当向服务器端发出请求时，hash 部分不会被发送；
hash 值的改变，都会在浏览器的访问历史中增加一个记录。因此我们能通过浏览器的回退、前进按钮控制hash 的切换；
可以通过 a 标签，并设置 href 属性，当用户点击这个标签后，URL 的 hash 值会发生改变；或者使用 JavaScript 来对 loaction.hash 进行赋值，改变 URL 的 hash 值；
我们可以使用 hashchange 事件来监听 hash 值的变化，从而对页面进行跳转（渲染）。
（2）history 模式的实现原理
HTML5 提供了 History API 来实现 URL 的变化。其中做最主要的 API 有以下两个：history.pushState() 和 history.repalceState()。这两个 API 可以在不进行刷新的情况下，操作浏览器的历史纪录。唯一不同的是，前者是新增一个历史记录，后者是直接替换当前的历史记录，如下所示：

window.history.pushState(null, null, path);
window.history.replaceState(null, null, path);

history 路由模式的实现主要基于存在下面几个特性：
pushState 和 repalceState 两个 API 来操作实现 URL 的变化 ；
我们可以使用 popstate 事件来监听 url 的变化，从而对页面进行跳转（渲染）；
history.pushState() 或 history.replaceState() 不会触发 popstate 事件，这时我们需要手动触发页面跳转（渲染）。

## vue-router 的导航钩子,主要用来作用是拦截导航,让他完成跳转或取消。

- 全局的:前置守卫、后置钩子（beforeEach，afterEach）beforeResolve
- 单个路由独享的:beforeEnter
- 组件级的: beforeRouteEnter（不能获取组件实例 this）、beforeRouteUpdate、beforeRouteLeave
- 这是因为在执行路由钩子函数beforRouteEnter时候，组件还没有被创建出来；
- 先执行beforRouteEnter，再执行组件周期钩子函数beforeCreate，可以通过 next 获取组件的实例对象，如：next( (vm)=>{} )，参数vm就是组件的实例化对象。

## 完整的 vue-router 导航解析流程
- 1.导航被触发；
- 2.在失活的组件里调用beforeRouteLeave守卫；
- 3.调用全局beforeEach守卫；
- 4.在复用组件里调用beforeRouteUpdate守卫；
- 5.调用路由配置里的beforeEnter守卫；
- 6.解析异步路由组件；
- 7.在被激活的组件里调用beforeRouteEnter守卫；
- 8.调用全局beforeResolve守卫；
- 9.导航被确认；
- 10..调用全局的afterEach钩子；
- 11.DOM更新；
- 12.用创建好的实例调用beforeRouteEnter守卫中传给next的回调函数。

## vue-router如何响应 路由参数 的变化？
原来的组件实例会被复用。这也意味着组件的生命周期钩子不会再被调用。你可以简单地 watch (监测变化) $route 对象：
```js
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
}


const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
}
```
## vue-router的实现原理，history和hash模式有什么区别？
vue-router有两种模式，hash模式和history模式

hash模式

url中带有#的便是hash模式，#后面是hash值，它的变化会触发hashchange 这个事件。

通过这个事件我们就可以知道 hash 值发生了哪些变化。然后我们便可以监听hashchange来实现更新页面部分内容的操作：
```js
window.onhashchange = function(event){
  console.log(event.oldURL, event.newURL);
  let hash = location.hash.slice(1);
  document.body.style.color = hash;
}
```
另外，hash 值的变化，并不会导致浏览器向服务器发出请求，浏览器不发出请求，也就不会刷新页面。

history模式

history api可以分为两大部分，切换和修改

① 切换历史状态

包括back,forward,go三个方法，对应浏览器的前进，后退，跳转操作

history.go(-2);//后退两次
history.go(2);//前进两次
history.back(); //后退
hsitory.forward(); //前进
② 修改历史状态

包括了pushState,replaceState两个方法,这两个方法接收三个参数:stateObj,title,url
```js
history.pushState({color:'red'}, 'red', 'red'})
window.onpopstate = function(event){
  console.log(event.state)
  if(event.state && event.state.color === 'red'){
    document.body.style.color = 'red';
  }
}
history.back();
history.forward();
```
通过pushstate把页面的状态保存在state对象中，当页面的url再变回这个url时，可以通过event.state取到这个state对象，从而可以对页面状态进行还原，这里的页面状态就是页面字体颜色，其实滚动条的位置，阅读进度，组件的开关的这些页面状态都可以存储到state的里面。

history缺点：

1：hash 模式下，仅hash符号之前的内容会被包含在请求中，如http://www.a12c.com, 因此对于后端来说，即使没有做到对路由的全覆盖，也不会返回404错误。

2：history模式下，前端的URL必须和实际向后端发起请求的URL一致。如http://www.a12c.com/book/a。如果后端缺少对/book/a 的路由处理，将返回404错误


## 怎样动态加载路由？vur-router怎么重定向？
① 在vue-router对象中首先初始化公共路由，比如（首页，404，login）等

② 用户登陆成功后，根据用户的角色信息，获取对应权限菜单信息menuList，并将后台返回的menuList转换成我们需要的router数据结构

③ 通过router.addRouter(routes)方法，同时我们可以将转后的路由信息保存于vuex，这样我们可以在我们的SideBar组件中获取我们的全部路由信息，并且渲染我们的左侧菜单栏，让动态路由实现。