##hasLayout的常见问题
本文接着上文（[关于hasLayout（一）](http://www.ishenli.com/?p=208)）,按照具体事例来分析hasLayout的问题。

####1.自动拓展高度和宽度
浮动元素会自动被具有hasLayout的祖先元素所自动包含。其最典型的元素是：ie6会自动扩展已包含溢出的元素。例如以下代码
```html
#float1{
  width:400px;//for hasLayout
}
.sample1{
  width:200px;
  height:60px;
  float:left;
  background:#fc6;
  +display:inline;/*解决ie6双倍边距*/
}
<div id="float1">
  <p class="sample1">浮动的p</p>
  <p>不浮动的p</p>
</div>
```
#####ie6/ie7的效果

<img src="http://bcs.duapp.com/wordpressblog/hasLayout%2FQQ%E6%88%AA%E5%9B%BE20130318153430.jpg?sign=MBO:37605d0593028e53e3128f4dd3e3e64b:3MdTW%2BaWEyN65j6PgzzlToUAdMQ%3D"/>

具有haslayout的元素的高度会包含浮动的子元素

#####ie8+/标准浏览器的效果

<img src="http://bcs.duapp.com/wordpressblog/hasLayout%2F1.jpg?sign=MBO:37605d0593028e53e3128f4dd3e3e64b:ehH6gErnxivLL7Lth9ZLiQe6P1k%3D"/>

height属性为auto，高度不包含浮动的子元素

这种情况在通过float布局时经常遇到，往往我们希望可以到达ie6/7所示的效果，防止父元素的高度塌陷。

####2.浮动元素旁边的元素
浮动元素旁的块级元素还是会独占一行，但是其内的行框缩短以容纳浮动元素，因此其文字的高度大于浮动元素，高出部分的内容在浮动元素的下方显示。例如以下代码
```html
*{
  	margin: 0;
		padding: 0;
	}
	#float1{
	  width:400px;
	  background-color: green;
	}
	.sample1{
	  width:200px;
	  height:60px;
	  float:left;
	  background:#fc6;
	  +display:inline;/*解决ie6双倍边距*/
	}
	.sample2{
		height: 100%;
	}
<div id="float1">
    <p class="sample1">浮动的p</p>
    <p class="sample2">不浮动的p,不浮动的p不浮动的p不浮动的p不浮
    动的p不浮动的p不浮动的p不浮动的p不浮动的p不浮动的p不浮动的p不浮动的p不浮动的p不浮动的p</p>
</div>
```
#####ie6/ie7的效果

<img src="http://bcs.duapp.com/wordpressblog/hasLayout%2Ffloattext7.jpg?sign=MBO:37605d0593028e53e3128f4dd3e3e64b:XIibWGvf4PbU0LHElrncvY5BOKg%3D"/>

ie将不浮动元素的框压缩，元素框整体右移，好像他也是一个浮动元素一样，因此文中的字就不再环绕左浮动的元素了（形成一个矩形区域，保持在它的右边）。

#####ie8+/标准浏览器的效果

<img src="http://bcs.duapp.com/wordpressblog/hasLayout%2Ffloattext8.jpg?sign=MBO:37605d0593028e53e3128f4dd3e3e64b:4YCirb465IlL%2Bp8HHjgi42IycgI%3D"/>

不浮动的元素仍会独占一行

同样会受到影响的还有相对定位的元素。相对定位的元素应该参照其静态偏移量来进行定位，但是在ie6/7中，偏移是从浮动元素的右边距开始算起。如以下代码
```html
*{
  	margin: 0;
		padding: 0;
	}
	#float1{
	  width:400px;
	  background-color: green;
	}
	.sample1{
	  width:200px;
	  height:60px;
	  float:left;
	  background:#fc6;
	  +display:inline;/*解决ie6双倍边距*/
	}
	.sample2{
		height: 100%;
		background-color: orange;
	position: relative;
	left: 20px;
	}
  <div id="float1">
    <p class="sample1">浮动的p</p>
	  <p class="sample2">不浮动的p,不浮动的p不浮动的p不浮动的p不浮动的p不浮动的p不浮动的p不浮动的p不浮动的p不浮动的p
    不浮动的p不浮动的p不浮动的p不浮动的p</p>
	</div>
```
#####ie6/ie7的效果

<img src="http://bcs.duapp.com/wordpressblog/hasLayout%2Fposition8.jpg?sign=MBO:37605d0593028e53e3128f4dd3e3e64b:9zP56drHEj%2F3CzrMZZ6S6Ub2uSc%3D"/>

偏移的距离如红框所示

#####ie8+/标准浏览器的效果

<img src="http://bcs.duapp.com/wordpressblog/hasLayout%2Fposition7.jpg?sign=MBO:37605d0593028e53e3128f4dd3e3e64b:STld6w5V4HxtBrSYm10WIgoMz9o%3D"/>

定位自身元素为起点

####3.未定义宽度的浮动元素
如果一个<strong style="color:red">浮动</strong>元素未定义宽度，那么这个元素将会被压缩，宽度由其包含的内容来决定。但是，对于ie6，如果子元素有haslayout，元素的宽度将会被撑到可以容纳它的最大宽度。如以下代码：
```html
#div1 {
  	width: 400px;
		height: 100px;
		background-color: green;
	}
	.sample1{
		margin: 5px;
	  float:left;
	  background:#fc6;
	  +display:inline;/*解决ie6双倍边距*/
	}
	.sample1 strong{
		display: block;
		height: 100%;/*for haslayout*/
	}
<div id="div1">
    <p class="sample1">浮动的p</p>
	  <p class="sample1">浮动的p,<strong>子元素具有hasLayout</strong>浮动的p,浮动的p</p>
	</div>
```
#####ie6的效果

<img src="http://bcs.duapp.com/wordpressblog/hasLayout%2Fnowidth6.jpg?sign=MBO:37605d0593028e53e3128f4dd3e3e64b:jY95fhGLYXUDMO70Mevh7uyc7js%3D"/>

ie6内具有layout的子元素会将浮动元素撑开

#####ie8+/标准浏览器的效果

<img src="http://bcs.duapp.com/wordpressblog/hasLayout%2Fnowidth8.jpg?sign=MBO:37605d0593028e53e3128f4dd3e3e64b:eY9qTcTLWm9tIycv2BhMUjAuEv8%3D"/>

未设定宽度的浮动将会被正确压缩


