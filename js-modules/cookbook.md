####javascirpt 精粹
如果第一个参数传入的对象调用者是null或者undefined的话，call方法将把全局对象（也就是window）作为this的值。所以，不管你什么时候传入null，其this都是全局对象window
```js
function a() {
    alert(this===window);
}
a.call(null);
```
双重"非"操作可以把字符串或数值转变为布尔值
```js
var bool=!!num;
```

闭包是一个受到保护的变量空间，由内嵌函数生成。Javascript具有函数级的作用域。这意味着定义在函数内部的变量在函数外部是不能被访问的。
javascript具有函数级的作用域。这意味着定义在函数内部的变量在函数外部不能被访问。JavaScript的作用域又是词法性质的，这意味着函数运行在
定义它的作用域中，而不是在调用它的作用域中。把这两个因素结合起来，就能通过把变量包裹在匿名函数中而对其加以保护。
```js
/* an anonymous function used as a closure*/
var baz;
(function(){
    var foo=10;
    var bar=2;
    baz=function(){
        return foo*bar;
    };
})();

baz(); //barz can access foo and bar,even though it is exectued outside of the anonymous function
```
