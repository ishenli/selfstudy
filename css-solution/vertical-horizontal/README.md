##使用说明
本解决方案提供水平+垂直居中的解决方案，自定义宽高，兼容主流浏览器

### vertical-horizontal.html 说明

- [原理] 
- 垂直居中：设定父元素的display：table，直接子元素为display：table-cell，vertical-align: middle;
- 水平居中: 设定.sl-hv宽度，通过margin:0 auto 实现

```html
<div class="sl-hv" style="width:300px;"><!-- 在此添加块的宽度，触发margin:auto,实现水平居中 -->
  <div class="sl-hv-box">
      <div class="sl-hv-cnt">
           <!--此处添加代码 -->
      </div>
  </div>
</div>
```
