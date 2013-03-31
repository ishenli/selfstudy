##webApp
最近又看了html5的一些资料，对于新的功能非常有兴趣。然而在平常的项目练习中，鲜有机会可以尝试最新的html5技术，因此希望可以通过构建一个html应用，
来更好的把握此项技术。在alloyTeam看到一个开源的html5图像处理js类库，完全可以以此构建在线的“美图秀秀”。

###构建平台
本应用是通过百度的bae作为构建平台，由于作为一个webApp模式，无需后台数据库支持。

###技术支持
本应用通过传统的web前端技术实现，包含html5和css3。在类库方面使用了常用的jquery，以及基于jquery的fileReaderJS插件，实现图片的
拖拽上传。

在实现图片的处理功能，通过利用腾讯alloyTeam团队开源的alloyImage类库实现。点击访问[官网](http://alloyteam.github.com/AlloyPhoto/)

###app功能
app主要包含对图片的美化功能，包含一系列的滤镜功能，现阶段主要包括美肤，素描，自然增强，紫调，柔焦，复古，黑白，仿lomo，亮白增强，
等。

###源码分析
图片的上传功能主要包含两部分，拖拽上传和手动选择上传。拖拽上传通过fileReaderJS类库实现,通过on方法绑定各种事件.
源码如下:
```js
$("#id").fileReaderJS({
   on:{
       load: function(e, file){
         //do something
         }
     }
})
```
图片上传完成以后,通过document.getElementById的方法获取该图片元素,调用alloyImage的ps方法进行图片的滤镜处理
```js
var pic=document.getElementById("pic");

AlloyImage(pic).ps(effect).replace(pic);//effect 为效果参数

var effects = {
     "美肤" : "softenFace",
     "素描" : "sketch",
     "自然增强" : "softEnhancement",
     "紫调" : "purpleStyle",
     "柔焦" : "soften",
     "复古" : "vintage",
     "黑白" : "gray",
     "仿lomo" : "lomo",
     "亮白增强" : "strongEnhancement",
     "灰白" : "strongGray",
     "灰色" : "lightGray",
     "暖秋" : "warmAutumn",
     "粗糙" : "carveStyle"
};
```

###todo



