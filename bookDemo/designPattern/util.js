/**
 * Created with JetBrains WebStorm.
 * User: shenli
 * Date: 13-6-27
 * Time: 下午5:26
 * 工具类，实现基本的javascript操作，实现兼容ECMAScript5和部门常用函数
 */

Function.prototype.method=function(name,fn){
    this.prototype[name]=fn
    return this;
}

/**
 * 添加数据中的forEach方法
 * 对数组中的每个元素都执行一次指定的函数（fn）
 */
if(!Array.prototype.forEach){
    Array.method('forEach',function(fn,thisObj){
        var scope=thisObj||window;
        for(var i= 0,len=this.length;i<len;++i){
            fn.call(scope,this[i],i,this);
        }
    })
}
/**
 * filter方法
 * 对数组中的每个元素都执行一次指定的函数（fn），并且创建一个新的数组并返回
 * fn 要对每个数组元素执行的回调函数
 * thisObj 在执行回调函数时定义的this对象
 */
if(!Array.prototype.filter){
    Array.method('filter',function(fn,thisObj){
        var scope=thisObj||window;
        var a=[];
        for(var i= 0,len=this.length;i<len;++i){
            if(!fn.call(scope,this[i],i,this)){
                continue;
            }
            a.push(this[i]);
        }
        return a;
    });
}