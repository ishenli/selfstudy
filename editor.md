CSS选择符由一些初始化参数组成，这些参数指明了要应用这个CSS规则的页面元素。作为一个网站的前端开发工程师，应该避免编写一些常见的开销很大的CSS选择符模式，尽量编写高效的CSS选择符，从而加快页面的渲染速度，缩短页面呈现时间。
  
我们先来看一下safari和webkit的架构师David Hyatt的两段话：

样式系统从最右边的选择符开始向左进行匹配规则。只要当前选择符的左边还有其他选择符，样式系统就会继续向左移动，直到找到
和规则匹配的元素，或者因为不匹配而退出。
如果你非常在意页面的性能那千万别使用CSS3选择器。实际上，在所有浏览器中，用 class 和 id 来渲染，比那些使用同胞，后代选
择器，子选择器（sibling, descendant and child selectors）对页面性能的改善更值得关注。

#####Google 资深web开发工程师Steve Souders对CSS选择器的效率从高到低做了一个排序：
1. id选择器（#myid)
2. 类选择器（.myclassname）
3. 标签选择器（div,h1,p）
4. 相邻选择器（h1+p）
5. 子选择器（ul > li）
6. 后代选择器（li a）
7. 通配符选择器（*）
8. 属性选择器（a[rel="external"]）
9. 伪类选择器（a:hover,li:nth-child）

上面九种选择器中ID选择器的效率是最高，而伪类选择器的效率则是最底。详细的介绍大家还可以点击[Writing efficient CSS selectors](https://developer.mozilla.org/en-US/docs/CSS/Writing_Efficient_CSS?redirectlocale=en-US&redirectslug=Writing_Efficient_CSS)

综合上面的顺序，我们清楚的知道

#####id和类名用于关键选择器上效率是最高的，而CSS3的仿伪类和属性选择器，虽然使用方便，但其效率却是最低的。

知道了基本原理以后，我们编写CSS时就应该注意了。下面举几个例子，让大家理解的更透彻一些：

####1.不要在编写id规则时用标签名或类名
```
BAD：div#test{} 以及 .new#testNew{}

GOOD：#backButton {…} , #testNew{}
```
由于样式系统从最右边的选择符开始向左进行匹配，只要当前选择符的左边还有其他选择符，样式系统就会继续向左移动，直到找到和规则匹配的元素，或者因为不匹配而退出，所以，在button#backButton {…}中，样式系统先找到id为backButton的元素，然后继续向左匹配，查看该元素的标签名是不是button，如果不是，查找下一个id为backButton的元素，再检查这个元素的标签名，如此周而复始，直到到达文档末尾。如果只是#backButton {…}，则样式系统找到id为backButton的元素后，因为左边没有其他选择符了，它就退出而结束查找了。

另外，根据HTML规范，id在HTML中是唯一的，也就是说一个HTML页面只限定有一个id为“XX”的元素，而不限制拥有这个ID元素的标签名，所以,在button#backButton {…}中,button标签完全是无意义的，可以，而且应该去掉，button#backButton {…}与#backButton {…}是等价的。在#backButton前多写了button,只会引起样式系统向左移动，继续查找页面元素，损耗页面性能，延长页面渲染时间。


####2.不要在编写class规则时用标签名
```
BAD：treecell.indented {…}

GOOD：.treecell-indented {…} //语言化和标签名绑在一起 假设treecell

BEST：.hierarchy-deep {…} //语言化和标签名无关
```
####3.把多层标签选择规则用class规则替换，减少css查找
```
BAD：treeitem[mailfolder="true"] > treerow > treecell {…}

GOOD：.treecell-mailfolder {…}
```

####4.避免使用子选择器
现在我们来看看David Hyatt的第3段话：后代选择器在CSS中是最昂贵的选择器。贵得要命——尤其是把它和标签或通配符放在一起！
```
BAD：treehead treerow treecell {…}

BETTER, BUT STILL BAD (see next guideline)：treehead > treerow > treecell {…}
```

####标签后面最好永远不要再增加子选择器
```
BAD：treehead > treerow > treecell {…}
GOOD：.treecell-header {…}
BAD：treeitem[IsImapServer="true"] > treerow > .tree-folderpane-icon {…}
GOOD：.tree-folderpane-icon[IsImapServer="true"] {…}
```

####5.依靠继承
```
BAD：#bookmarkMenuItem > .menu-left { list-style-image: url(blah) }

GOOD：#bookmarkMenuItem { list-style-image: url(blah) }
```

最后，我们来做个总结，网站编写CSS时，应该优先考虑使用class选择器，避免使用通配符选择器（*）和属性选择器（a[rel="external"]），后代选择器与标签选择器结合使用也应避免。使用id选择器的性能最好，但是编写时要注意其唯一性，谨慎使用。CSS3选择器（例如：:nth-child(n)第n个孩子）在帮助我们锁定我们想要的元素的同时保持标记的干净和语义化，但事实是，这些花哨的选择器让更多的浏览器资源被密集使用。引用David Hyatt关于CSS3选择器的论述：如果你关心页面性能的话，他们真不该被使用！

原文链接：[网站CSS选择器性能讨论](http://www.aliued.cn/2013/01/24/%E7%BD%91%E7%AB%99css%E9%80%89%E6%8B%A9%E5%99%A8%E6%80%A7%E8%83%BD%E8%AE%A8%E8%AE%BA.html)
