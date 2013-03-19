####javascirpt 精粹
如果第一个参数传入的对象调用者是null或者undefined的话，call方法将把全局对象（也就是window）作为this的值。所以，不管你什么时候传入null，其this都是全局对象window
```js
function a() {
    alert(this===window);
}
a.call(null);
```
