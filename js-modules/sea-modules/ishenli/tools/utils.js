/**
 * Created with JetBrains WebStorm.
 * User: shenli
 * Date: 13-2-19
 * Time: 上午10:26
 * To change this template use File | Settings | File Templates.
 */
define("ishenli/tools/utils", [], function(require, exports, module) {
    var classof=function(o){
        return Object.prototype.toString.call(o).slice(8,-1);//return is [object XXXX]
    }
    //返回函数的名字（可能是空字符串），不是函数的返回null
    Function.prototype.getName=function(){
        if("name" in this)return this.name;
        return this.name=this.toString().match(/function\s*([^(]*)\(/)[1];
    }
    var utils={
        type:function(o){
            var c, t,n; //class,type,name
            if(o===null) return "null";
            if(o!==o) return "NaN";

            //如果类型部位object，可是识别出原始值的类型和函数
            if((t=typeof o)!=="Object") return t;
            //返回对象的类名，除非为“Object”，可是识别大部分内置对象
            if((c=classof(o))!=="Object") return c;

            //对象构造函数存在的话，则返回它
            if(o.constructor&&typeof o.constructor==="function"&&(n= o.constructor.getName()))return n;

            //无法识别，则返回Object
            return "Object";
        }
    }
    module.exports=utils;
})
