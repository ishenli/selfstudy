/**
 * 观察值系统
 * User: shenli
 * Date: 13-6-28
 * Time: 上午10:45
 * To change this template use File | Settings | File Templates.
 */

window.DED=window.DED||{};
DED.util=DED.util||{};
DED.util.Observer=function(){
    this.fns=[];
}

DED.util.Observer.prototype={
    subscribe:function(fn){
        this.fns.push(fn);
    },
    unsubscribe:function(fn){
        this.fns=this.fns.filter(function(el){
            if(el!==fn){
                return el;
            }
        });
    },
    fire:function(o){
        this.fns.forEach(function(el){
            el(o);
        });
    }

};


DED.Queue=function(){
    this.queue=[];
    this.onComplete=new DED.util.Observer;
    this.onFailure=new DED.util.Observer;
    this.onFlush=new DED.util.Observer;

    this.retryCount=3;
    this.currentRetry=0;
    this.paused=false;
    this.timeout=5000;
    this.conn={};
    this.timer={};
};

DED.Queue.method("flush",function(){
   if(!this.queue.length>0){
       return;
   }
   if(this.paused){
       this.paused=false;
       return;
   }
   var that=this;
    this.currentRetry++;
    var abort=function(){
        that.coon.abort();
        if(that.currentRetry==that.retryCount){
            that.onFailure.fire();
            that.currentRetry=0;
        }else{
            that.flush();
        }
    };

    this.timer=window.setTimeout(abort,this.timeout);
    var callback=function(o){
        window.clearInterval(that.timer);
        that.currentRetry=0;
        that.queue.shift();
        that.onFlush.fire(o.responseText);
        if(that.queue.length==0){
            that.onComplete.fire();
            return;
        }

        //recursive call to flush
        that.flush();
    };

    that.coon=asyncRequest(
        this.queue[0]['method'],
        this.queue[0]['url'],
        callback,
        this.queue[0]['pararms']
    );
}).method('setRetryCount',function(count){
        this.retryCount=count;
}).method('setTimeout',function(time){
        this.timeout=time;
}).method('add',function(o){
        this.queue.push(o);
}).method('pause',function(){
        this.paused=true;
}).method('dequeue',function(){
        this.queue.pop();
}).method('clear',function(){
        this.queue=[];
});
