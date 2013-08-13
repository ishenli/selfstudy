##CSS3 HOVER EFFECT TUTORIAL WITH IMAGE CIRCLE

在本教程，我将通过图像动画过度来实现一个新的 css3 hover 效果增强你的web设计界面。利用图片过度效果来实现创造性的设计是非常有意思的。
通常css3的通过效果比jquery和flash的动画效果更好。

###效果图
<img src="http://cdn1.freshdesignweb.com/wp-content/uploads/2013/08/css3-hover-effect-screen.jpg"/>

ps：这个效果只有在支持css3的现代浏览器才有效

###HTML
html结构：
```html
<div id="skin">
  <p class="icon"></p>
  <a href="http://www.freshdesignweb.com" class="fdw_left">Left</a>
  <a href="http://www.freshdesignweb.com" class="fdw_right">Right</a>
</div>
```
CSS3代码
```css
#skin {
    position:relative;
    border-radius:50%;
    -moz-border-radius:50%;
    -webkit-border-radius:50%;
    border:10px solid rgba(255,255,255,.10);
    height:284px;
    overflow:hidden;
    -webkit-transition: all .3s ease;
    -moz-transition: all .3s  ease;
    -o-transition: all .3s  ease;
    -ms-transition: all .3s  ease;
}
.fdw_left,.fdw_right {
    float:left;
    width:50%;
    height:100%;
    margin:0;
    text-align:center;
    line-height:280px;
    text-decoration:none;
}
.fdw_right {
    border-radius:0 142px 142px 0;
    -moz-border-radius:0 142px 142px 0;
    -webkit-border-radius:0 142px 142px 0;
}
.fdw_left {
    background-color:#fff;
    border-radius:142px 0 0 142px;
    -moz-border-radius:142px 0 0 142px;
    -webkit-border-radius:142px 0 0 142px;
    color:#1e2a2a;
    text-indent:-30px;
}
.fdw_right {
    background-color:#1e2a2a;
    color:#FFFFFF;
    text-indent:35px;
}
#skin .icon {
    width:71px;
    height:77px;
    position:absolute;
    top:50%;
    left:50%;
    margin:-39px auto 0 -35px;
    background: url(images/icon.png) top center no-repeat;
    -webkit-transition: all .3s ease-in-out;
    -moz-transition: all .3s  ease-in-out;
    -o-transition: all .3s  ease-in-out;
    -ms-transition: all .3s  ease-in-out;
    transition: all .3s ease-in-out;
}
#skin a {
    font-weight:700;
    font-family: 'Open Sans Condensed','Arial Narrow', Arial, sans-serif;
    text-decoration:none;
    text-transform:uppercase;
    font-size:20px;
    -webkit-transition: background-color .3s;
    -moz-transition: background-color .3s;
    -o-transition: background-color .3s;
    -ms-transition: background-color .3s;
    transition: background-color .3s;
}
#skin a:hover {
    background-color:#00b68f;
    color:#FFF;
    }
#skin:hover {
    border:10px solid rgba(255,255,255,.5);
    }
#skin:hover .icon {
    transform: rotate(180deg);
    -ms-transform: rotate(180deg); /* IE 9 */
    -webkit-transform: rotate(180deg); /* Safari and Chrome */
    -webkit-transition: all .3s ease-in-out;
    -moz-transition: all .3s  ease-in-out;
    -o-transition: all .3s  ease-in-out;
    -ms-transition: all .3s  ease-in-out;
    transition: all .3s ease-in-out;
    }
````
        
