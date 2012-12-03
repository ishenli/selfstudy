---

````js
//一般放置在页尾，通过加载src/gotop.js，new 一个对象：
seajs.use(['../src/gotop'], function(gotop) {
        new gotop({
            element:'#back-to-top',//jquery 选择器元素
            start:200, //距离顶部距离，默认0
            speed:50,  //返回速度，默认1秒
            ease:'swing'  //jquery animate 效果，默认swing
        })
````
