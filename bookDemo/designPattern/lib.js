/**
 * Created with JetBrains WebStorm.
 * User: SH201
 * Date: 13-6-25
 * Time: 下午4:54
 * To change this template use File | Settings | File Templates.
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
            throw new Error("Interface constructor expectc method names to be"+
            "pass in as a string");
        }
        this.methods.push(methods[i]);
    }
}


var Offline=function(){
    this.storedRequests=[];
}
/**
 * xhrManager
 * @type {{createXhrHandler: Function, isOffline: Function, isHighLatency: Function}}
 */
var  xhrManager={
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
