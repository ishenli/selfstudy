##浮动和定位

css定位的基本思想很简单，它允许你定义元素相对于其正常位置应该出现在哪里，或者相对于父元素、另一个元素甚至浏览器窗口本身的位置。

###浮动

浮动的基本属性

![](http://bcs.duapp.com/wordpressblog/blog%2Ffloat.png?sign=MBO:37605d0593028e53e3128f4dd3e3e64b:JLBDd4lrw4wYE4Egkb1YEBY7Gv4%3D)

###浮动元素
注意点：

+ 当一个元素浮动时，其他内容会“环绕”该元素
+ 浮动元素的周围的外边距**不会**合并
+ 非替换元素浮动时，它的width趋于**0**

在深入地了解浮动元素，首先要建立包含块（containing block）的概念。**浮动元素的包含块是其最近的块级祖先元素**。此外，浮动元素还会生成一个块级框，不论这个元素是什么。因此，如果让一个元素浮动，即使该元素本身是行内元素，通常会生成一个行内框，但只要它是浮动的，就会生成一个块级框，如果一个div元素。因此，对于浮动元素声明`display:none`是多余的。

###浮动规则

1.浮动元素的左（或右）外边界不能超出其**包含块**的左（或右）内边界

2.浮动元素的左（或右）外边界必须是源文档中之前出现的左浮动（或右浮动）元素的右（左）外边界，除非后出现浮动元素的顶端在先出现浮动元素的底端下面

3.左浮动元素的右外边界不会在其右边右浮动元素的左外边界的右边。同理于右浮动元素。

这条规则可以防止于浮动元素的相互重叠。假设一个body，宽为500px，内部有两个300px的图像，第一个图像浮动到左边，第二个浮动到右边。这个规则可以防止两个图像重叠100px。

4.左浮动元素的左边有另一个浮动元素，前者的右外边界不能在其包含块的右边界的右边。也就是说，浮动元素不能超出其包含元素的边界。 

CSS2.1 澄清了一个浮动元素行为的一个方面：浮动元素会延伸，从而包含其所有后代元素。----包裹性

###浮动元素、内容和重叠

**行内框**与一个浮动元素重叠时，其边框、背景和内容都在该浮动元素**“之上”**显示

**块框**与一个浮动元素重叠时，其边框和背景在该浮动元素**”之下“**，而**内容**在浮动元素**”之上“**显示

例如：

DOM结构:

    <img src="1.jpg" class="slideline">
    <p class="box">
    This is the first paragraph <strong> strongly text</strong>
    </p>
    <p>
    This is a second paragraph.
    </p>
    <h2 id="jump-up">A heading!!!</h2>

CSS样式：
    
    img.slideline{float:left;margin:10px -15px 10px 10px;}
    p.box{border:1px sollid gray;padding:0.5em;
    p.box strong{border:3px double black;background:sliver;padding:2px;}
    h2#jump-up{margin-top：-15px;background:silver;}

效果图：

![](http://bcs.duapp.com/wordpressblog/blog%2Fchongdie.png?sign=MBO:37605d0593028e53e3128f4dd3e3e64b:xlVc6vGBvVjzr62Zhu%2FxOhF6lzs%3D)

行内元素（strong）完全覆盖了浮动图像，块状元素只是将其内容显示在浮动元素之上，但其背景和边框都在浮动元素之下。

###清除
通过clear属性可以使元素周边的浮动元素是否浮动在该元素的周围。
如

    h3{clear：left}
    <h3>what is with all the latin</h3>

**如图所示：**

![](http://bcs.duapp.com/wordpressblog/blog%2Ffleft.png?sign=MBO:37605d0593028e53e3128f4dd3e3e64b:g2DvH55AMYcp0XJ6X%2BZgkCtXoSQ%3D)

上图为清除左边，但不清除右边的浮动元素。

    h3{clear：both}
    <h3>what is with all the latin</h3>

**如图所示：**

![](http://bcs.duapp.com/wordpressblog/blog%2Ffboth.png?sign=MBO:37605d0593028e53e3128f4dd3e3e64b:AvK7YoxVQQG11Wg0wYGinVMNVag%3D)

上图为两边都清除

**clear的原理**:在CSS1和CSS2中，clear工作如下，它会增加元素的**margin-top**，使之最后落在浮动元素的下面，这实际上会忽略为清除元素顶端设置的外边距宽度。也就是说，清除元素的上外边距可能会调整。

    img.sider{float:left;,margin:0;}
    h3{border:1px solid gray;clear:left;margin-top:15px;}

    <img src="boxer.gif" class="sider" height="50" width="50">
    <img src="stripe.gif" height="10" width="100">
    <h3> Why Doubt Salmon?</h3>

![](http://bcs.duapp.com/wordpressblog/blog%2Ffclear.png?sign=MBO:37605d0593028e53e3128f4dd3e3e64b:H9XMiE8m6OpOz5F412f1HXIMYhg%3D)

h3上边框与浮动图像下边框之间没有间隔，因为在h3的上外边距（15像素）之上增加25px的清除区域，将h3的上边距推到刚好越过浮动元素的下边界。除非h3的上外边距计算为40px或更多。在这种情况下，h3会很自然地放在浮动元素下面，clear值是什么无关紧要。

大多数情况下，要确保一个清除元素的顶端与一个浮动元素的底端有一定的空间，可以为浮动元素本身设置一个下外边距。所以上例中的浮动元素下面至少有15px的空间，可以修改如下：

    img.sider{float:left;margin:0 0 15px}
