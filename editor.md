
##javascript OOP学习
OOP即**面向对象程序设计**（英语：Object-oriented programming，缩写：OOP），这是一种程序设计范型，同时也是一种程序开发的方法。对象指的是类的实例。它将对象作为程序的基本单元，将程序和数据封装其中，以提高软件的重用性、灵活性和扩展性。来自[维基百科](http://zh.wikipedia.org/wiki/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1)

OOP编程带来的巨大优势在javascript中也得到了广泛的应用，特别是在如今webapp的开发潮流，但是javascript里面没有extends,implements，那么javascript是如何实现OOP的呢？让我们一步一步来吧

####函数对象prototype成员
prototype是javascript oop的实现基础，通过它“子类”可以访问“父类”的相关属性和方法，从而达到实现继承的目的。那么prototype到底是怎么一个玩意呢？
官方的定义：
> When a function object is created, it is given a prototype member which is an object containing a constructor member which is a reference to the function object
当一个函数对象**被创建**时，这个函数对象就具有一个prototype成员，这个**成员是一个对象**，这个对象包含了一个构造子成员，这个构造子成员会指向这个函数对象。

让我们看个栗子吧
```js
    function Foo(){}
    var foo = new Foo();
    var obj = new Object();
    
    alert(foo.constructor === Foo);// output true   
    alert(foo.constructor === Foo.prototype.constructor);// true  
    alert(Foo === Foo.prototype.constructor); //true
    alert(Foo.constrcutor === Foo.prototype.constructor); //false
    alert(Foo.constructor === Function.prototype.constructor); //true
    alert(Foo.constructor === Foo.prototype.constructor);//false
    alert(Foo.constructor === Function); //true
```
上面的代码应该很常见，当我第一次看到这个，直接有点晕。。。为了弄清楚Foo和Object的原型关系，我还新建了一个Object的实例obj，对应的关系如下图：

![Alt text](http://media.tumblr.com/4a8b3940c0c7ee9b45e03a61c7b15ba7/tumblr_inline_n4l9v6EgcY1r336bu.png)

起先，当初最让我感到困惑的是**constructor**的值，因为根据官方的定义，constructor是存在于prototype中，如果我们直接访问`foo.constructor`,大家都知道它就是Foo,因为foo的构造函数就是Foo,如果访问`Foo.constructor`,它是什么呢？通过推测是`Function`。后来看到一片文章，一下子就清楚了。文章原文
> 做为一个对象，当你访问其中的一个成员或方法的时候，如果这个对象中没有这个方法或成员，那么javascript引擎将会访问这个对象的`__proto__`成员所指向的另外的一个对象，并在那个对象中查找指定的方法或成员，如果不能找到，那就会继续通过那个对象的`__proto__`成员指向的对象进行递归查找，直到这个链表结束
!注：`__proto__`这个属性只有在firefox或者chrome浏览器中才是公开允许访问的，

关系链：`foo.constructor`==>`foo.__proto__.constructor`
==>`Foo.prototype.constructor`==>`Foo`
主要的关系如下：
```js
( new Foo ).__proto__ === Foo.prototype
( new Foo ).prototype === undefined
```

####new 操作符
javascript的new操作符是从java和c++那边借鉴过来。在加上new操作符，我们就能完成传统面向对象的class + new的方式创建对象。
如下面的代码：
```js
function Person (name){
  this.name = name;
}
var boy = new Person('tj');
```
这是教科书式的`new`关键字使用方法，创建了一个`Person`对象的实例`boy`，并且`boy`的`name`属性名字是`tj`。发现`new`做的事情蛮多的。那么具体的情况是怎样的？其实很简单
```js
var boy = {};//常见一个boy的空对象
boy.__proto__ = Person.prototype;//得到原型，这是继承实现的基础
Person.call(boy,'tj'); //改变this的引用
```
这个时候通过给`Person.prototype`添加方法时，`boy`也可以调用
```js
Person.prototype.sayName = function(){
    console.log(this.name);
}

boy.sayName(); //‘tj’
```
是不是一下子就有了**类**的感觉！！

####继承
我们已经可以简单地模拟类的实现，那么如何实现类的的继承呢？其实基本就是通过`prototype`这个属性，我们只需要将子类的`prototype`指向父类的`prototype `就可以了。如
```js
function Man(name,age){
  this.name =name; 
  this.age=age;
}

Man.prototype = Person.prototype;

Man.prototype.sayAge = function(){
  console.log(this.age);
}

var michael = new Man('michael',30);
michael.sayName(); //michael
michael.sayAge(); //30

```
可以看到，`Man`这个对象继承了`Person`的`sayName()`方法。但是这个实现有一个不好的地方就是**如果修改子类的原型，那么父类的原型也会受到影响，所有继承该父类的子类都受到影响！**,所以这种继承实现方式需要改进。

改进的方案如下：
```js
lib.inherit = function (superClass,subClass) {
        function F() {}

        F.prototype = superClass.prototype;

        var selfPrototype = subClass.prototype;

        var proto = subClass.prototype = new F();

        for (var key in selfPrototype) {
            proto[key] = selfPrototype[key];
        }
        subClass.prototype.constructor = subClass;
        subClass.superClass = superClass.prototype;

        return subClass;
    };
```
其中`subClass.prototype.constructor = subClass;`这个用于保证子类的构造函数指向正确。此类方式避免了子类和父类之间的原型干扰，并且提供了一个子类访问父类的`superCalss`借口。

####接口
javascript本身并没有提供**接口**的实现，如今常用的一种的实现方式是通过通过讲**一个对象**挂载到对象的**原型**上，通过`mixin`的方式。
```js
function mixin(receiver,supply){
    for(var item in supply){
    	if(supply.hasOwnProperty(item)){
    		receiver[item] = supply[item];
    	}
    }
}

//假设一个Klass命名空间
Klass.Implements = function(items){
	isArray(items) || [items];
	var proto = this.prototype,item;
	while(item = items.shift()){
		mixin(proto,item.prototype || item);
	}
}
```
####其他
通过以上几点，简单的分析了OOP的某些特点。我对javascript也是熟悉不久，本文可能也会有一些荒谬之言甚至错误，还希望得到您的反馈和批评。

如果需要一个完整的oop代码库，可参考:
[ecomfe/oo](https://github.com/ecomfe/oo)，[aralejs/class](https://github.com/aralejs/class)这两个类库。

####参考链接
[http://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html](http://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html)

[http://www.cnblogs.com/dolphinX/p/3286177.html](http://www.cnblogs.com/dolphinX/p/3286177.html)

[OO 模拟那些事儿](http://aralejs.org/class/docs/competitors.html)
