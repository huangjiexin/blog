---
title:
  前端性能优化——防抖、节流
categories:
  - 前端
  - 性能优化
tags:
  - JS
date: 2021-11-13
---
## 前言
- 在日常开发中，常常会遇到实时搜索查询，即用户输入值触发函数调用接口请求

- 需要监听页面滚动或者变化来执行一些操作，例如屏幕尺寸的变化触发页面重新渲染

如果这种**高频触发**事件在触发后涉及到请求或者大量dom元素操作，可能造成服务器压力，前端页面卡顿，使用户体验感变差。
因此，防抖跟节流在一定程度上可以解决这些问题。

## 函数防抖（Debounce）
### 定义
**防抖**，顾名思义、就是**防止抖动**，即防止用户操作后的结果发生抖动。

> 触发事件后在**规定时间**内回调函数只能**执行一次**，如果在规定时间内又触发该事件，则会**重置定时器**，即**重新开始计算**规定时间。

大概意思就是，**延迟执行**。

### 应用场景
1. 联想搜索，input值不停的变化
2. 用户拖拽改变窗口大小，触发组件重新布局
3. 在线文档编辑内容实时保存
4. 无意识快速点击按钮等

### 实现

1. 事件触发 -> 延时 -> 执行回调函数;

触发后如果还在延时中，继续触发事件，则会重新进行延时，在延时结束后执行回调函数。
常见例子: 就是input搜索框, 用户输完过一会就会自动搜索。

``` html
<!DOCTYPE html>
<body>
    输入: <input oninput="onInput(value)"/>
</body>
<script type="text/javascript">
    function debounce (f, delay = 500) {
        return function (args) {
            let _this = this
            let _args = args
            // 将定时器保存在函数(函数也是对象)的属性上
            clearTimeout(f.timer)
            f.timer = setTimeout(function () {
                f.call(_this, _args)
            }, delay)
        }
    };
    function ajax (v) {
        console.log('ajax', v);
    };
    function onInput (v) {
        /// ajax(v)
        debounce(ajax)(v)
    }
</script>
```
> [在线调试](https://c.runoob.com/front-end/61/)

有时候是需要立即执行一次来初始化内容页，后面再进行延迟，那么我们稍微改进一下方法：

2. 事件触发 -> 执行回调函数 -> 延时; 如果在延时中，继续触发事件，则会重新进行延时，在延时结束后，再一次执行回调函数。

``` html
<!DOCTYPE html>
<body>
    输入: <input oninput="onInput(value)"/>
</body>
<script type="text/javascript">
    function debounce (f, delay = 500, immediate = false) {
        let timer = null
        return function (args) {
            let _this = this
            let _args = args
    
            // 重复调用 先把定时器清除
            if (timer) {
                clearTimeout(timer)
            }

            // 需要立即执行
            if (immediate) {
                // 定时器不存在，则代表延迟已过
                if (!timer) {
                    f.call(_this, _args)
                }
               timer = setTimeout(function () {
                  f.call(_this, _args)
                  timer = null
              }, delay)
            } else {
              // 将定时器保存在函数(函数也是对象)的属性上
              timer = setTimeout(function () {
                  f.call(_this, _args)
              }, delay)
            }
            console.log(timer)
        }
    };
    function ajax (v) {
        console.log('ajax', v);
    };

    let debounceAjax = debounce(ajax, 500, true);
    function onInput (v) {
        /// ajax(v)
        debounceAjax(v)
    }
</script>
```
> [在线调试](https://c.runoob.com/front-end/61/)


以上就是一个简单**防抖函数**，可以把`debounce`抽离到工具类中复用；当然这只是实现防抖的一个形式。

## 函数节流（throttle）
### 定义
节流：顾名思义就是节省流量。用于用户在页面交互时控制事情发生的频率，在单位时间或间隔时间内定时执行操作

> 当**持续触发**事件时，在规定时间段内**只能调用一次**回调函数。如果在规定时间内**又触发**了该事件，则**不执行任何操作，也不会重置定时器**。

大概意思就是，**定时执行**。

### 应用场景
1. 快速点击刷新页面信息
2. 监听滚动事件，懒加载
3. 埋点场景

### 实现
1. 用时间戳控制

特点：在规定时间开始时执行
``` html
<!DOCTYPE html>
<body>
    输入: <input oninput="onInput(value)"/>
</body>
<script type="text/javascript">
    //时间戳版：
    function throttle(f, delay = 500) {
        let previous = 0;  // 记录上一次触发的时间戳.这里初始设为0,是为了确保第一次触发产生回调
        return function (args) {
            let now = Date.now(); // 记录此刻触发时的时间戳
            let _this = this;
            let _args = args;
            if (now - previous > delay) {  // 如果时间差大于规定时间,则触发
                f.call(_this, _args);
                previous = now;
            }
        }
    }

    function ajax (v) {
        console.log('ajax', v);
    };

    let throttleAjax = throttle(ajax, 1000);
    function onInput (v) {
        /// ajax(v)
        throttleAjax(v)
    }
</script>
```

> [在线调试](https://c.runoob.com/front-end/61/)

2. 定时器版

特点：在规定时间结束时执行
``` html
<!DOCTYPE html>
<body>
    输入: <input oninput="onInput(value)"/>
</body>
<script type="text/javascript">
     function throttle(f, delay = 500) {
        return function (args) {
            let _this = this;
            let _args = args;
            if (!f.timer) {  // 执行完毕清空定时器，定时器存在则不执行
                f.timer = setTimeout(function () {
                    f.call(_this, _args)
                    f.timer = null;
                }, delay)
            }
        }
    }

    function ajax (v) {
        console.log('ajax', v);
    };

    let throttleAjax = throttle(ajax, 1000);
    function onInput (v) {
        /// ajax(v)
        throttleAjax(v)
    }
</script>
```

3. 组合版

特点：规定时间内，第一次触发立即响应，结束触发也执行一次
``` html
<!DOCTYPE html>
<body>
    输入: <input oninput="onInput(value)"/>
</body>
<script type="text/javascript">
    function throttle (f, delay = 1000) {
        let previous = 0;
        return function (args) {
            let _this = this;
            let _args = args;
            let now = Date.now();
            let remaining = delay - (now - previous); // 距离规定时间,还剩多少时间
            clearTimeout(f.timer);  // 重复调用需要清除之前设置的定时器
            if (remaining <= 0) { // 超过规定时间立即执行
                f.call(_this, _args);
                previous = Date.now();
            } else { // 没超过规定时间，设置规定时间到了再执行
                f.timer = setTimeout(function () {
                    f.call(_this, _args+'定时器执行')
                }, remaining);
            }
        }
    }

    function ajax (v) {
        console.log('ajax', v);
    };

    let throttleAjax = throttle(ajax, 1000);
    function onInput (v) {
        /// ajax(v)
        throttleAjax(v)
    }
</script>
```
## 总结

- 函数防抖和函数节流都是防止某一时间频繁触发，但是原理却不一样。
- 防抖是将多次调用延迟为**最后一次**调用执行，而节流是将多次调用变为在**规定时间**内只执行一次。
- 防抖是延迟最后执行，节流是间隔时间执行。