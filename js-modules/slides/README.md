# slides


该模块的概要介绍。

------

## 使用说明

如何使用该模块，可以根据组件的具体特征，合理组织。

## API

####preload（boolean）
设置为true时在图片幻灯片中预加载图片
`````js
new slides({
  preload:true
})
`````
####preloadImage（String）
预加载图片所用的地址和名称
`````js
new slides({
  preload:true,
  preloadImage: '/img/loading.gif'
})
`````
####generateNextPrev (boolean)
自动生成前进后退按钮，默认为false
`````js
new slides({
  generateNextPrev: true
})
`````
####next (string)
自定义后退按钮的样式，默认为'next'
`````js
new slides({
   next: 'next'
})
`````
