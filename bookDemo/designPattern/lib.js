/**
 * Created with JetBrains WebStorm.
 * User: SH201
 * Date: 13-6-25
 * Time: 下午4:54
 * To change this template use File | Settings | File Templates.
 */

/**
 * 获取元素
 * @param id
 * @returns {HTMLElement}
 */
var $=function(id){
    return document.getElementById(id);
}
/**
 * Intenface 类,规定对象的接口实现方法
 * @param name
 * @param methods
 * @constructor
 */
var Interface=function(name,methods){
    if(arguments.length!==2){
        throw new Error("Interface constructor called with "+arguments.length
            +"arguments,but expected exactly 2");
    }

    this.name=name;
    this.methods=[];
    for(var i= 0,len=methods.length;i<len;i++){
        if(typeof methods[i]!=="string"){
            throw new Error("Interface constructor expect method names to be"+
            "pass in as a string");
        }
        this.methods.push(methods[i]);
    }
}

Interface.ensureImplements=function(object){
    if(arguments.length<2){
        throw new Error("Function Interface.ensureImplements called with"+arguments.length+
        "arguments,but expected at least 2");
    }

    for(var i= 1,len=arguments.length;i<len;i++){
        var interface=arguments[i];
        if(interface.constructor!==Interface){
            throw new Error("Function Interface.ensureImplements expects arguments"
            +"two and above to be instances of Interface");
        }
        for(var j= 0,methodLen=interface.methods.length;j<methodLen;j++){
            var method=interface.methods[j];
            if(!object[method]||typeof object[method]!=='function'){
                throw new Error("Function Interface.ensureImplements:object:"+"does not implement the"
                +interface.name
                +"interface.Method "+method+"was not found.");
            }
        }
    }
}
/**
 * 类式继承
 * @param subClass
 * @param superClass
 */
var extend=function(subClass,superClass){
    var F=function(){};
    F.prototype=superClass.prototype;
    subClass.prototype=new F();
    subClass.prototype.constructor=subClass;
    subClass.superclass=superClass.prototype;
    if(superClass.prototype.constructor==Object.prototype.constructor){
        superClass.prototype.constructor=superClass;
    }
}
var SimpleHandler=function(){};
SimpleHandler.prototype={
    request:function(method,url,callback,postVars){
        var xhr=this.createXhrObject();
        xhr.onreadystatechange=function(){
            if(xhr.readyState!==4) return;
            (xhr.stauts===200)?callback.success(xhr.responseText,xhr.responseXML):
                (callback.failure(xhr.status));
        }
        xhr.open(method,url,true);
        if(method!="POST") postVars=null;
        xhr.send(postVars);
    },
    createXhrObject:function(){
        var methods=[
            function(){return new XMLHttpRequest();},
            function(){return new ActiveXObject('Microsoft.XMLHTTP');}
        ]
        for(var i= 0,len=methods.length;i<len;i++){
            try{
                methods[i]();
            }
            catch(e){
                continue;
            }

            this.createXhrObject=methods[i];
            return methods[i];
        }

        throw new Error("SimpleHandler:Could not create an XHR object;");

    }
}

/**
 * Handler in Queue
 * @constructor
 */
var QueueHandler=function(){
    this.queue=[];
    this.requestInProgress=false;
    this.retryDelay=5;//in seconds
};
var Offline=function(){
    this.storedRequests=[];
}
extend(QueueHandler,SimpleHandler);
/**
 * 在发起新的请求之前先确保所有的请求都已成功处理
 * @param method
 * @param url
 * @param callback
 * @param postVars
 * @param override
 */
QueueHandler.prototype.request=function(method,url,callback,postVars,override){
   if(this.requestInProgress&&override){
       this.queue.push({
           method:method,
           url:url,
           callback:callback,
           postVars:postVars
       });
   }
   else {
       var xhr=this.createXhrObject(),that=this;
       xhr.onreadystatechange=function(){
           if(xhr.readyState!==4) return;
           if(xhr.stauts===200){
               callback.success(xhr.responseText,xhr.responseXML);
               that.advanceQueue();
           }else{
               callback.failure(xhr.stauts);
               setTimeout(function(){
                   that.request(method,url,callback,postVars,true)
               },this.retryDelay*1000);
           }
       }
       xhr.open(method,url,true);
       if(method!="POST") postVars=null;
       xhr.send(postVars);
   }
};

QueueHandler.prototype.advanceQueue=function(){
    if(this.queue.length===0){
        this.requestInProgress=false;
        return;
    }
    var req=this.queue.shift();
    this.request(req.method,req.url,req.callback,req.postVars,true);
};
/**
 * OfflineHandler Class
 * @constructor
 */
var OfflineHandler=function(){
    this.storedRequests=[];
};
extend(OfflineHandler,SimpleHandler);
OfflineHandler.prototype.request=function(method,url,callback,postVars){
    if(xhrManager.isOffline()){ //store the requests until we are online
        this.storedRequests.push({
            method:method,
            url:url,
            callback:callback,
            postVars:postVars
        });
    }else{
        this.flushStoredRequests();
        OfflineHandler.superclass.request(method,url,callback,postVars);
    }
};

OfflineHandler.prototype.flushStoredRequests=function(){
    for(var i=0,len=this.storedRequests.length;i<len;i++){
        var req=this.storedRequests[i];
        OfflineHandler.superclass.request(req.method,req.url,req.callback,req.postVars);
    }
}
/**
 * xhrManager
 * @type {{createXhrHandler: Function, isOffline: Function, isHighLatency: Function}}
 */
var  XhrManager={
    createXhrHandler:function(){
        var xhr;
        if(this.isOffline()){
            xhr=new OfflineHandler();
        }else if(this.isHighLatency()){
            xhr=new QueueHandler();
        }else{
            xhr=new SimpleHandler();
        }
        Interface.ensureImplements(xhr,AjaxHandler);
        return xhr;
    },
    isOffline:function(){

    },
    isHighLatency:function(){

    }
}

/**
 * 立即执行函数，创建请求对象
 */
var asyncRequest=(function(){
    function handleReadyState(o,callback){
        var poll=window.setInterval(function(){
            if(o&& o.readyState==4){
                window.clearInterval(poll);
                if(callback) {callback(o);}
            }
        },50);
    }

    var getXHR=function(){
        var http;
        try{
            http=new XMLHttpRequest();
            getXHR=function(){
                return new XMLHttpRequest();
            }
        }catch (e){
            console.log("the browser does not support the XMLHttpRequest");
        }

        return http;
    };
    return function(method,uri,callback,postData){
        var http=getXHR();
        http.open(method,uri,true);
        handleReadyState(http,callback);
        http.send(postData||null);
        return http;
    }
}());