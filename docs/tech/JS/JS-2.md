---
title:
  什么是闭包？
categories:
  - 前端
  - 基础知识
tags:
  - js
date: 2021-2-22
---
## 前言
闭包其实开发过程一直在用，但要说什么是闭包，概念又有点模糊，刚好最近想系统过一遍前端的知识体系，就把闭包拿出来细看一下。
## 看一段代码
```javascript
for(var i=1; i<=5; i++){
  setTimeout(function timer(){
      console.log(i);
  }, i*1000)
}
```
思考一下，这段代码执行结果是什么？执行顺序是怎么样的？

## 变量作用域
理解闭包之前，要先理解js的变量作用域：
在ES6之前，javascript没有块级作用域（一对{}即为一个块级作用域），只有全局作用域和函数作用域（局部），对应的有全局变量和局部变量。
在函数内部可以访问到全局变量，但在函数外部，访问不到局部变量；


> Javascript 有一个 main thread 主线程和 call-stack 调用栈(执行栈)，所有的任务都会被放到调用栈等待主线程执行。
>
>
> 1.首先判断JS是同步还是异步，同步就进入主线程运行，异步就进入event table。
>
> 2.异步任务在event table中注册事件，当满足触发条件后（触发条件可能是延时也可能是ajax回调），被推入event queue。
>
> 3.同步任务进入主线程后一直执行，直到主线程空闲时，才会去event queue中查看是否有可执行的异步任务，如果有就推入主线程中。
>
> 链式作用域结构
> 在js中，变量查找遵循就近原则，如果同级没有该变量，则就一层一层向父级层查找，直到找到为止，所以，父级的变量对于子级都是可见的；
>
> 执行结果：
> i的作用域是整个for循环，console.log(i)输出的i就是for循环结束之后的i的值，所以会输出5次6。
> 

## 什么是闭包？
### a.闭包的定义
>
> 官方文档定义：
> 函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起构成闭包
>
**闭包**就是能够读取其他函数内部变量的函数。在js中，可以将闭包理解成“函数中的函数”。
举个简单例子
```
function f1 (){
  var m = 10;
  function f2 (){
    return m; // 10
  }
}
```
上面代码中，局部变量m通过作为函数f2的返回值，使得在函数f1外面也能够读取到m的值，则称函数f2为闭包。


### b.闭包的作用
读取函数内部的变量值，让这些变量的值始终保存在内存中。

> JavaScript拥有自动的垃圾回收机制，关于垃圾回收机制，有一个重要的行为，那就是，当一个值，在内存中失去引用时，垃圾回收机制会根据特殊的算法找到它，并将其回收，释放内存。
> 而函数的执行上下文，在执行完毕之后，生命周期结束，那么该函数的执行上下文就会失去引用。其占用的内存空间很快就会被垃圾回收器释放。可是闭包的存在，会阻止这一过程。
> 
再举个例子
> ```
> function foo(){
>   var a = 2;
>   function innnerFoo(){ // 闭包
>     console.log(a);
>   }
>   return innnerFoo; // 将 innnerFoo的引用，赋值给全局变量中的fn
> }
> 
> var innnerFoo = foo();
> innnerFoo(); // 2
> ```


在上面的例子中，foo()执行完毕之后，按照常理，其执行环境生命周期会结束，所占内存被垃圾收集器释放。但是通过return innerFoo，函数innerFoo的引用被保留了下来。这个行为，导致了foo的变量对象，也被保留了下来。于是，函数fn在函数bar内部执行时，依然可以访问这个被保留下来的变量对象。所以此刻仍然能够访问到变量a的值。

这样，就可以称innnerFoo为闭包。


### c.使用闭包的注意事项

（1）问题：由于闭包会使得函数中的变量都被保存在内存中，内存消耗大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能会造成内存泄露。
 解决方法：在退出函数之前，将不使用的局部变量全部删掉

（2）问题：闭包会在父函数外部，改变父函数内部变量的值。
如果把父函数当做对象使用，把闭包当做公用方法，把内部变量当做私有属性，此时不要随便改变父函数内部变量的值。

### d.闭包的常见应用场景


#### (1)延迟函数setTimeout
```
function fn() {
  console.log('this is test.')
}
var timer = setTimeout(fn, 1000);
console.log(timer);
```
执行上面的代码，变量timer的值，会立即输出出来，表示setTimeout这个函数本身已经执行完毕了。但是一秒钟之后，fn才会被执行。这是因为在setTimeout函数的内部，通过特殊方式保留了fn的引用，让setTimeout的变量对象在函数本身执行完毕后没有被垃圾回收器回收，所以在setTimeout执行结束后一秒，fn函数还能够被执行。这正是闭包的作用。


#### (2)JS函数柯里化
这里简单举个例子
```
// 正常正则验证字符串 reg.test(txt)

// 函数封装后
function check(reg, txt) {
    return reg.test(txt)
}

check(/\d+/g, 'test')       //false
check(/[a-z]+/g, 'test')    //true

// Currying后
function curryingCheck(reg) {
    return function(txt) {
        return reg.test(txt)
    }
}

var hasNumber = curryingCheck(/\d+/g)
var hasLetter = curryingCheck(/[a-z]+/g)

hasNumber('test1')      // true
hasNumber('testtest')   // false
hasLetter('21212')      // false
```
> [详解JS函数柯里化](https://www.jianshu.com/p/2975c25e4d71)


#### (3)模块
模块是闭包最强大的一个应用场景，以往使用js的时候，把所有方法和变量都放到全局，当开发到一定程度的时候就要崩溃了，变量冲突，代码可读性都会变得非常糟糕；闭包的机制就是以模块化设计的思想将方法当做的类一样使用。


- 对象写法
```
var module1 = new Object({
  _count : 0,
  m1 : function (){
　　//...
 },
  m2 : function (){
　　//...
　}
});
```
上面的函数m1()和m2(），都封装在module1对象里。使用的时候，就是调用这个对象的属性。

` module1.m1(); `

但是，这样的写法会暴露所有模块成员，内部状态可以被外部改写。比如，外部代码可以直接改变内部计数器的值。

` module1._count = 5; `


- 立即执行函数写法
使用"立即执行函数"（Immediately-Invoked Function Expression，IIFE），可以达到不暴露私有成员的目的。
```
var module1 = (function(){
  var _count = 0;
  var m1 = function(){
　　　//...
  };
  var m2 = function(){
      //...
  };
  return {
    m1 : m1,
　　m2 : m2
　};
})();
```
使用上面的写法，外部代码无法读取内部的_count变量。

` console.info(module1._count); //undefined `


采用IIFE的模块模式设计JavaScript程序让所有功能都通过调用API来实现，内部具体怎么实现被很友好的隐藏起来，同时也非常符合程序设计的最小暴露原则。有了这样一些优秀的程序设计特性IIFE的模块模式设计程序就开始大放异彩了，比如大多数的模块依赖加载器/管理器本质上都是将这种模块定义封装进一个友好的API。




#### (4)ES6的模块机制
  ES6中为模块增加了一级语法，在通过模块系统进行加载时，ES6会将文件当做独立的模块来处理。每个模块都可以导入其他模块或特定的API成员，同样也可以导出自己的API成员。
  基于函数的模块并不是一个能被静态识别的模块，只有在执行时才会实现API，所以可以在运行时修改一个模块的API。相比下ES6模块API是静态的，可以在编辑时被编辑器识别到，当在编程时引用了一个并不存在的API是会出现错误提示，可以实现更友好的编程，也很好的预防了程序编辑的错误。


```
// bar.js
function hello(who) {
  return "Let me introduce:" + who
}
export { hello }

// foo.js
import {hello} from "./bar"

var hungry = "hippo"
function awesome(a = hungry) {
  console.log(
    hello(a).toUpperCase()
  )
}
exports.awesome = awesome

// baz.js
import {hello} from './bar'
import foo from './foo'

console.log(
  hello('rhino')
); // Let me introduce:rhino

foo.awesome() // LET ME INTRODUCE:HIPPO
```
ES6模块模式是将多个js文件作为模块的基本单元，通过关键字描述来实现API的导入与导出

实现ES6模块模式的一些关键字：
import:将一个或多个API导入到当前作用域
module:会将整个模块的API导入并绑定到一个变量上；(typescript可用)
export:会将当前模块的一个或多个标识符（变量、函数）导出为公共API。
export default: 会将当前模块的一个标识符（变量、函数）导出为公共API。
exports:会将当前模块的一个或多个标识符（变量、函数）导出为公共API。


## 回到最开始的问题，如何使用闭包解决问题
### a.使用立即调用函数（IIFE）
```
for(var i=1; i<=5; i++){
  (function (i) {
    setTimeout(function timer(){
      console.log(i);
    }, i*1000)
  })(i);
}
```

这里使用立即调用函数（IIFE）和匿名函数形成一个私有作用域（相当于闭包），私有作用域中的变量和全局作用域中的变量互不冲突，这种写法也叫作"命名空间"；这时每次for循环传入的 i 的值都将作为私有变量被保存在内存中，等待for循环执行完毕后，跟随任务队列输出。
> 注：形成闭包之后，这里的i其实是两个不同的变量，for循环中的 i 为全局变量，IIFE中的 i 为私有变量。如果在全局状态下console.log（i），最后会只会输出一个6
或者：
闭包也称为函数嵌套函数，将修改的代码写入setTimeout中的方式更能直观的体现闭包写法:
```
for (var i = 1; i <= 5; i++) {
  setTimeout(function (i) {
    return function timer(){
      console.log(i);
    }
  }(i), i * 1000)
}
```

### b.使用块级作用域

在ES6（ES2015）中，因为新增了声明变量的API，所以有更简单的修改方式：将var修改为let：
```
for(let i=1; i<=5; i++){
  setTimeout(function timer(){
      console.log(i);
  }, i*1000)
}
```
let声明的变量的范围会生成一个私有作用域，也叫作块级作用域，该变量只会在当前作用域中生效，以 { } 为标识

