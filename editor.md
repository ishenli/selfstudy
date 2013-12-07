##开发switchable组件的心得
####何为switchable组件
switchable顾名思义就是切换的意思，在如今的网页设计中，这是一个很常见的效果。
如[百度爱玩](http://iwan.baidu.com/info)资讯页面中就有好几个切换的效果：

示例1：

![image](http://bcs.duapp.com/wordpressblog/gitpress/slide1.png?sign=MBO:cYNBSUK2FS1telkxKKYb6lGG:l9kdDa1JVwllo4x9RMj0VodV%2BmU%3D)

一个渐隐渐现的效果，通常称为slide

示例2：

![image](http://bcs.duapp.com/wordpressblog/gitpress/slide2.png?sign=MBO:cYNBSUK2FS1telkxKKYb6lGG:s6efeggDCzFfM6BLw7vFj3gRtSU%3D)

一个滚动切换的效果，通常称为carousel

#####两者具有相似的html结构：
1. 作为主体的列表结构
2. 用于控制的切换行为的"prev/next”按钮
3. 通过切换到指定面板的trigger按钮
	
#####两者具有相似的交互操作：
1. 当鼠标移动主体内容上，应该停止当前的动画
2. 当鼠标hover/click某个trigger的时候，应该指定到某个panel
3. 当该组件不在显示窗口的区域内，应该可以停止该动画浏览器的性能消耗

#####其他事项：
1. 定时动画
2. 支持自定义事件(如switch，swtiched)
3. 更丰富的动画切换效果

####如何设计

#####配置参数
经过了上面的简单分析，可以想到该组件需要以下几个配置

```js
options:{
            element: '',
            container: '',
            prevBtn: '',
            nextBtn: '',
            panels: '',
            triggers: '',
            interval: 5000,
            autoplay: false,
            classPrefix: "mp",
            triggerType: "hover",
            circular: true,
            step: 1,
            effect: 'none',
            easing: 'none',
            disabledBtnClass:'mp-btn-disable',
            activeTriggerClass:'mp-btn-active',
            viewSize: [],
            activeIndex: 0,
            hasTriggers: false,
            duration: 500,
        }
```

#####功能实现

step1：初始化panels

switchable的组件阻的主体是panels，我们第一步就是初始化panels。主要操作就是获取panel的具体信息，当panel的长度为0时，抛出异常。

```js
	function initPanles(){
		var panels = this.get("panels");
        if (panels.length === 0) {
           throw new Error("panels.length is ZERO");
        }
	}
```
step2:绑定triggers

triggers的操作会触发相应的监听函数来对组件当前的现实状态进行修改。triggers的事件类型主要有click/hover两种，当triggerType为hover时，需要指示器一个计时器，来达到鼠标离开triggers时来触发切换效果

step3:实现switch功能

前面两步就是为更好的实现switch功能。整个switch功能主要包含一下几个部分

1. switchPanel
2. switchTrigger
3. switch/switched函数触发

switchPanel函数：
```js
	switchPanel: function (panelInfo) {
    	// 默认是最简单的切换效果：直接隐藏/显示
        panelInfo.fromPanels.hide();
        panelInfo.toPanels.show();
    }
```
该函数的参数为panelInfo对象，该对象决定了swithPanel的具体表现。
```js
	_getPanelInfo: function (toIndex, fromIndex) {
            var panels = this.get('panels').get();
            var step = this.get('step');

            var fromPanels, toPanels;

            // 初始情况下 fromIndex 为 undefined
            if (fromIndex > -1) {
            	//根据不同的step计算起始panel
                fromPanels = panels.slice(fromIndex * step, (fromIndex + 1) * step);
            }
			////根据不同的step计算最终panel
            toPanels = panels.slice(toIndex * step, (toIndex + 1) * step);

            return {
                toIndex: toIndex,
                fromIndex: fromIndex,
                toPanels: $(toPanels),
                fromPanels: $(fromPanels)
            };
        }
```       
当switachPanel函数执行后，trggiers来改变自身的状态，就是简单的修改class

switchTrigger函数
```js
	switchTrigger: function (toIndex, fromIndex) {
            var triggers = this.get('triggers');
            if (triggers.length < 1) return;

            triggers.eq(fromIndex).removeClass(this.get('activeTriggerClass'));
            triggers.eq(toIndex).addClass(this.get('activeTriggerClass'));
        }
```      
####结语
通过以上的几点分析，我简单地实现了switchable最原始的功能，初始化switchable，切换panel和trigger的状态，但是这样一个简陋的组件是无法满足需求的，所以我将会为它添加循环，切换效果自定义等特点，下一篇文章来说吧

未然待续……
