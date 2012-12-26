##使用说明
本解决方案提供在ie6中实现position:fixed的解决思路

### ie-fixed.html 说明

- [原理] 通过hack技巧和css expression实现元素的position:fixed

```html
<div class="sl-fixed sl-fixed-top sl-fixed-right">
   这个块固定在右上方
   <code>class="sl-fixed sl-fixed-top sl-fixed-right"</code>.
</div>
```

- 基本功能：

 <pre>
.sl-fixed-top 相当于正常的 position:fixed; top:0; 
.sl-fixed-bottom 相当于正常的 position:fixed;bottom:0px;
.sl-fixed-left 相当于正常的 position:fixed;left:0px;
.sl-fixed-right 相当于正常的 position:fixed;right:0;
 </pre>

- 有一些需要注意的是:

 - 如果需要多个方向的固定位置，比如 top + right，需要加两个 class
 - 如果加了 `.sl-fixed-top`, 那么就别给这个元素加 `top` 属性的值
 - 为了不出现异常，这个只作为套用。比如要<code>top:30px</code> 的时候，请在 `.sl-fixed-top` 的子元素内设置

转自：[sofish](https://github.com/sofish/)

