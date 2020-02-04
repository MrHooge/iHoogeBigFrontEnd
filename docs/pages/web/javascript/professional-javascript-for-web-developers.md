# JavaScript高级程序设计

## 第一章 简介

JavaScript 诞生于 1995年，是一种专为与网页交互而设计的的脚本语言。

### JavaScript 实现
  JavaScript由3个不同的部分组成：
    * ECMAScript，由ECMA-262定义，提供核心语言功能；
    * 文档对象模型（DOM）：提供访问和操作网页内容的方法和接口；
    * 浏览器对象模型（BOM）：提供与浏览器交互的方法和接口。

## 第二章 在HTML中使用JavaScript

###  `<script>` 元素
  向HTML页面中插入JavaScript的主要方法，就是使用`<script>` 元素。

### 嵌入代码与外部文件
  外部文件的有点：
    * 可维护性
    * 可缓存
    * 适应未来

  外部文件注意的地方：
    * 必须将`src` 属性设置为指向相应文件的URL。
    * 所有`<script>`元素都会按照他们在页面中出现的先后顺序依次被解析。

## 第三章 基本概念

### 语法
  * 区分大小写
  * 标识符
    > 标识符就是指 变量、函数、属性的名字，或者函数的参数。
    > 规则：第一个字符必须是一个字母、下划线(_)、或一个美元符号($);其他字符可以是字母、下划线、美元符号或数字。
  * 注释
    > 单行注释 ` // 单行注释 `、块级注释 `/*  ···   */`；
    > 严格模式 `use strict`
  * 语句

### 关键字和保留字
  ECMA-262中描述了一组具有特定用途的关键字，可用于表示控制语句的开始或结束，或者用于执行特定操作等。规定：关键字属于语言保留，不可以用于标示符。
ECMAScript的全部关键字（*为第五版新增）：
  >　break　　do　　instanceof　　typeof　　case　　else　　new　　var　　catch　　finally　　return　　void　　continue　　for　　switch　　while  debugger*　　  function　　this　　with　　　　default　　if　　throw　　delete　　in　　try　　

　ECMA-262中的全部保留字（第三版）：
 > abstract　　enum　　int　　short　　boolean　　export　　interface　　static　　byte　　extends　　long　　super　　char　　final　　native　　class
> synchronized　　float　　package　　throws　　const　　goto　　private　　transient　　debugger　　implements　　protected　　volatile　　double　　import　　public

　保留字可能会作为再版的关键字，如第五版新增的debugger就是第三版的保留字。

　第五版中非严格模式下的保留字：

> class　　enum　　extends　　supper　　const　　export　　import

　严格模式下保留字：

> implements　　package　　public　　interface　　private　　static　　let　　protected　　yield
>
> *注意：let和yield为新增保留字；为保证兼容建议作为参考保留字。*

### 变量
ECMAScript 的变量是松散类型的，所谓松散类型就是可以用来保存任何类型的数据。