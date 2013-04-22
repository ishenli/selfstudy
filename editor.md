##元素

元素（element）是文档结构的基础。在HTML中，最常用的元素很容易识别，如p，table，span，a和div。每个元素都对文档的表现起到一定的作用，每个元素会生成一个box，其中包含元素的内容。

###替换和非替换元素

CSS预览于元素，并非所有的元素都以同样的方式创建，如img和p，span和div也不尽相同。在CSS通常有两种创建方式：替换和非替换。

###替换元素
**替换元素**是指用来替换**元素内容**的部分并非有文档内容直接表示。在HTML中，img是由本身之外的一个图像文件来替换，img没有具体的内容。


###非替换元素

**非替换元素**的内容是有用户代理（浏览器）在元素本身生成的框中显示。如`<span>hi mianchel</span>`就是一个非替换元素。文本“hi micha”是有浏览器显示。常用的**非替换元素**包括段落、标题、表单元格、列表等。

##元素显示角色
除了替换和非替换元素，css还提供另外两种基本元素类型：块级（block-level）和行内（inline-level）。

####块级元素
块级元素生成一个元素框，（默认地）会填充父元素的内容区，旁边不能有其他元素。这里可以理解为独占一行。我们最熟悉的块级元素就是div、p、ul、li。

####行内元素
行内元素就是在文本行内生成元素框，而不会打断这行本文。最好的例子就是a元素，strong和em。这些元素不会占据一整行，影响其他元素的显示。

#####注意：通常行内元素内部不会包含块级元素

在CSS中可以通过display改变元素的默认类型。常用的display数值为block，inline，list-item。具体值如下图

![display具体值列表](http://bcs.duapp.com/wordpressblog/blog%2Fcss-display.png?sign=MBO:37605d0593028e53e3128f4dd3e3e64b:DgFe%2Fe2cSAJzZo%2FptphGNgql368%3D)

对于HTML文档来说，尽管改变元素的显示角色可能很有用，不过对于XML的意思更为重大。XML文档不太有固定的显示，所以通过改变display的值可以控制元素的内容显示。

以上为基本知识，下面来详细深入的分析CSS的块级元素和行内元素。

##深入分析

###基本框

CSS规定每个元素都会生成一个或多个矩形框。各个元素中心都会有一个内容区（content area）。这个内容区有可选的内边距、边框和外边距。模型如下图：

![box](http://bcs.duapp.com/wordpressblog/blog%2Fcss-box.png?sign=MBO:37605d0593028e53e3128f4dd3e3e64b:zGDBc2bfZ6jzS10QREo4HxZoO6s%3D)

内容的背景（如平铺的背景和颜色）也会用应用到内边距。外边距通常是透明的，可以看到父元素的背景。内边距没有负值，外边距有。

边框的颜色可以通过border—color来进行设定。如果**没有设定颜色**，边框的元素就会取元素内容的颜色，例如如果文本为`color:red`，边框的颜色也为red。如果边框的**样式有空隙**（如设定为dotted），就可以看到元素的背景色。

###水平格式化

水平内容的显示往往比你想得复杂，其部分复杂性在于width影响的是内容区的宽度。对此，有一个很简单的规则，正常流中块级元素框的水平部分总和等于父元素的width。将设一个div中有两个段落，这两个段落的外边距设为1em。**段落的内容宽度（width的值）+左，右外边距+边框+外边距=
div内容区的width**。

假设div的width为30em，那么各段落内容宽度、内外边距，边框的总和及时30em。

###水平属性
CSS的7大水平属性：margin-left,margin-ringht,padding-left,padding-right,width,border-left,border-right。如下图：
![](http://bcs.duapp.com/wordpressblog/blog%2Fcss-sp.png?sign=MBO:37605d0593028e53e3128f4dd3e3e64b:rE5YsU8RK33HV0qU2j7XoVp%2FHOY%3D)

**注意：以上7个属性的值相加必须是元素包含块的宽度**

下一篇文章将分析7个属性值在不同情况下的表现



