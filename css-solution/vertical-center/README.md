##使用说明
本解决方案提供垂直居中的两种解决方案，一种用于div宽高固定的常用方案，demo为margin-vc.html，另一种为div自定义宽高的兼容性方案
demo为common-vc.html

### margin-vc.html 说明

- [原理] 设定宽度和高度，父节点为 position:relative; CSS是这样写的:

 <pre>
position:absolute;left:50%;top:50%;
margin-top:-元素自身高度的一半;
 </pre>

### common-vc.html 说明

- [原理] 该方法不适用于ie6和ie7，设定父元素的display：table，直接子元素为display：table-cell，vertical-align: middle;:

 <pre>
&lt;div class="sl-vc" &gt; &lt;!-- sl前缀为解决方案的标记 --&gt;
        &lt;div class="sl-vc-cnt"&gt;
              &lt;!-- your code --&gt;
        &lt;/div&gt;
&lt;/div&gt; &lt;!-- .sl-vc --&gt;
 </pre>

