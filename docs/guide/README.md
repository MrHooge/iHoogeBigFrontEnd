---
sidebar: auto
---

# 猴哥的大前端
> [思否](https://segmentfault.com/)  [掘金](https://juejin.im/) [CSDN](https://www.csdn.net/) 

## 计算机基础
  1. html5
  2. css
     1. css世界
     2. css权威指南
  3. js
     1. 变量语句
     2. 函数 this绑定
     3. dom
     4. 正则，⽇期
        1. 红宝书 javascript⾼级程序设计
     5.  深⼊理解JS执⾏逻辑
        1.  《你不知道的javascript》
  4.  es6
      1.  class promise
      2.  解构
      3.  proxy
      4.  模块化
      5.  babel
      6.  函数式
          1.  装饰器
          2.  ⾼阶函数
          3.  递归
          4.  compse
      7.  。。。
      8.  浏览器
  5.  VUE
    1.  Vue
        1.  组件化设计
        2.  vuex vue-router 最好研究下原理
        3.  性能优化
        4.  ⾃动化测试
        5.  TS引⼊
        6.  服务端渲染 nuxt
        7.  源码
  6.  React
      1.  JSX
      2.  ⾼阶组件
      3.  组件化
      4.  redux mobx react-router
      5.  性能优化
      6.  测试 jest
      7.  服务端渲染 next
      8.  hooks
      9.  源码
  7.  Angular
      1.  很强⼤ TS rxjs
  8.  webpack ⼯程化
      1.  配置
      2.  loader
      3.  plugin
      4.  源码
  9.  babel原理
## 除了浏览器的前端
  1.  node
      1.  express
      2.  koa eggjs
      3.  mvc
  2.  ⼩程序
      1.  微信⼩程序
          1.  lazy-load⾃带
          2.  导航配置
      2.  ⼩程序能⼒
          1.  客服
          2.  反馈
          3.  消息
          4.  云开发
              1.  serverless
  3. APP
     1. React native
     2. weex
     3. flutter


## ⼯程师
  1. 计算机基础
     1. 内⼒不能短期提成 如果想学习，建议⾄少三个⽉时间
        1. 算法数据结构
           1. 啊哈算法
           2. 算法第四版
        2. ⽹络协议TCP HTTP http2 深⼊
           1. 图解http写意 / ⽹络是如何链接的
           2. 图解tcp写意
           3. http权威指南
        3.  数据库
            1.  sql必知必会
            2.  ⾼性能mysql
        4.  操作系统linux
        5.  架构能⼒ 分布式 CAP原理
      软件⼯程
     2. 前端各种都是招式（源码算是内⼒）
  2. 软件⼯程
     1. 敏捷开发
     2. git协作
     3. 软件开发理念
        1.  《⼈⽉神话》 没有银弹
        2.  从⼩⼯到专家 和猫解释
        3.  构建之法
  3.  代码测试
      1.  ⾃动化
      2.  报表
      3.  测试驱动开发
  4.  监控
      1.  监控性能
      2.  监控⾏为
      3.  监控报错
  5.  ⾃动化
      1.  流程⾃动化
          1.  git hook + npm⾃动实现代码校验，分⽀规范
      2.  部署⾃动化
          1.  docker
  6.  特殊的场景
      1.  ⼩游戏
      2.  webgl
      3.  可视化
  7.  项⽬管理
  8.  沟通
  9.  谈钱
  10. GraphQL
      1.  GraphQL相当于json数据库中的sql语句
  11. 996
      1.  996和奋⽃要分开
      2.  短期的996，有明确⽬标，明确截⽌⽇期
      3.  为了学习，主动
      4.  反对⽆意义996，或者⻓期996，或者过劳
  12. 数据库
      1.  mysql
          1.  sql语句
          2.  联表
          3.  性能优化
              1.  sql分析
              2.  索引
          4.  《⾼性能mysql》
          5.  可⽤性 主从 数据备份
          6.  原理 sql解析 红⿊树数据结构
          7.  实战 orm
      2.  mongbd
      3.  redis
  13. 对 初级⼯程师 和 有⼏年⼯作经验的程序员 在⾯试上⻆度上有什么不同？
      1.  初级： 基础
      2.  ⾼级 框架源码，交互体验，性能优化 项⽬独当⼀⾯能⼒
  14. 中级前端
      1.  vue组件化设计 / REACT
      2.  JS语⾔的深⼊掌握
      3.  ⼯程化+ node
  15. node的⾯试⼀般会考哪些
      1.  web框架 源码
      2.  mvc的设计
      3.  模块化
      4.  数据库的增删改查 mysql/ mongodb
      5.  鉴权 登录注册 权限
      6.  部署 pm2 nginx docker
  16. 专享训练
      1.  《刻意练习》
      2.  封装⼀个组件
      3.  学⼀个promise
      4.  写⼀个mini的vue
      5.  发布⼀个npm包
      6.  实现⼀个mvc的web框架，基于koa 甚⾄koa都可以⾃⼰写
      7.  实现⾃动注⼊对应服务的功能 参考eggjs
  17. nginx
      1.  nginx配置
      2.  部署⼀个静态项⽬
      3.  配合pm2 部署⼀个node项⽬
      4.  部署https证书
      5.  ⽇志切割
      6.  nginx热重启
      7.  事件驱动模型
      8.  http模块深⼊学习
      9.  反向代理


  setData闪屏 ⾃⼰做diff 类似虚拟dom的对⽐，⾃⼰判断出修改的数据 可以参考uni-app和taro的源码

  # 前端面试

## JavaScript

### 内置类型

### typeof

### 类型转换

- Boolean
- 对象转基本类型
- 四则运算
- ==操作符
- 比较运算符

### 原型

### new

### instanceof

### this

### 执行上下文

### 闭包

### 深浅拷贝

- 浅拷贝
- 深拷贝

### 模块化

- CommonJS
- AMD

### 防抖

### 节流

### 继承

### call、apply、bind 区别

- 模拟实现

### Promise 实现

### Generator 实现

### Map、FlapMap、和 Reduce

### async和await

### Proxy

### 为什么 0.1+0.2 != 0.3

### 正则表达式

- 元字符
- 修饰语
- 字符简写

## 浏览器

### 事件机制

- 事件触发三阶段
- 注册事件
- 事件代理

### 跨域

- JSONP
- CORS
- document.domain
- postMessage

### Event loop

- Node 中的 Event loop
- 浏览器中的 Event loop

### 存储

- cookie、localStorage、sessionStorage、indexDB
- Service Worker

### 渲染机制

- Load 和 DOMContentLoaded的区别
- 图层
- 重绘（Repaint）和 回流（Reflow）
- 减少重绘和回流

## 网络安全

### XSS

- 如何攻击
- 如何防御
- CSP

### CSRF

- 如何攻击
- 如何防御

	- SameSite
	- 验证Referer
	- Token

### 密码安全

- 加盐

## 算法

### 时间复杂度

### 位运算

- 左移<<
- 右移>>
- 按位操作

### 排序

- 冒泡
- 选择
- 插入
- 归并
- 快排
- 堆排序
- 系统自带排序实现

### 链表

- 反转单向链表

### 树

- 二叉树的先、中、后序遍历
- 中序遍历的前驱后继节点
- 树的深度

### 动态规则

- 斐波那契数列
- 0-1背包问题
- 最长递增子序列

## 数据结构

### 栈

### 队列

### 链表

### 树

### Trie

### 并查集

### 堆

## Performance

### 网络相关

- DNS预解析
- 缓存

	- 强缓存
	- 协商缓存

		- Last-Modified 和 If-Modified-Since
		- ETag 和 If-None-Match

	- 选择合适的缓存策略

- 使用HTTP / 2.0
- 预加载
- 预渲染

### 优化渲染过程

- 懒执行
- 懒加载

### 文件优化

- 图片优化

	- 计算图片大小
	- 图片加载优化

- 其他文件优化
- CDN

### 其他

- 使用Webpack 优化项目
- 监控

## Git

### Rebase

### stash

### reflog

### reset

## Career、职业规划

### 花时间补基础，读文档

### 学会搜索

### 学点英语

### 画个图，想一想再做

### 利用好下班时间 学习

### 列好TODO

### 反思和整理

## 网络

### UDP

- 不可靠性
- 面向报文
- 高效
- 传输方式

### TCP

- 头部
- 状态机

	- 建立连接三次握手
	- 断开连接四次握手

- ARQ 协议

	- 停止等待ARQ
	- 连续ARQ
	- 累计确认

- 滑动窗口

	- Zero 窗口

- 拥塞处理

	- 慢开始算法
	- 拥塞避免算法
	- 快速重传
	- TCP New Ren 改进后的快恢复

### HTTP

- Post和Get 区别
- 常见状态码
- HTTP首部

### HTTPS

- TLS

### HTTP2.0

- 二进制传输
- 多路复用
- Header 压缩
- 服务端 push
- QUIC

### DNS

### 从输入URL到页面加载完成的过程

## 框架

### 通识

- MVVM

	- 脏数据检测
	- 数据劫持
	- Proxy与Object.defineProperty对比

- VirtualDom

	- 为什么需要Virtual Dom
	- Virtual DOM 算法简述
	- Virtual DOM 算法实现

- React / Vue 项目时为什么要在列表组件中写 key，其作用是什么？


- diff算法

	- Vue2.0的diff算法

### Vue

- NextTick 原理分析
- 生命周期分析

### React

- 生命周期分析

	- V16 生命周期函数用法建议

- setState
- Redux 源码分析