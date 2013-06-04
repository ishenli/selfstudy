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
    function utf8_encode(c) {
    if (c === null || typeof c === "undefined")
        return "";
    var c = c + "", g = "", b, d, f = 0;
    b = d = 0;
    for (var f = c.length, m = 0; m < f; m++) {
        var a = c.charCodeAt(m), r = null;
        a < 128 ? d++ : r = a > 127 && a < 2048 ? String.fromCharCode(a >> 6 | 192) + String.fromCharCode(a & 63 | 128) : String.fromCharCode(a >> 12 | 224) + String.fromCharCode(a >> 6 & 63 | 128) + String.fromCharCode(a & 63 | 128);
        if (r !== null) {
            d > b && (g = g + c.slice(b, d));
            g = g + r;
            b = d = m + 1
        }
    }
    d > b && (g = g + c.slice(b, f));
    return g
}
function base64_encode(c) {
    var g, b, d, f, m = 0, a = 0, r = "", r = [];
    if (!c)
        return c;
    c = utf8_encode(c + "");
    do {
        g = c.charCodeAt(m++);
        b = c.charCodeAt(m++);
        d = c.charCodeAt(m++);
        f = g << 16 | b << 8 | d;
        g = f >> 18 & 63;
        b = f >> 12 & 63;
        d = f >> 6 & 63;
        f = f & 63;
        r[a++] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(g) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(b) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(d) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(f)
    } while (m <
        c.length);
    r = r.join("");
    switch (c.length % 3) {
        case 1:
            r = r.slice(0, -2) + "==";
            break;
        case 2:
            r = r.slice(0, -1) + "="
    }
    return r
}
function urlsafe_base64_encode(c) {
    return base64_encode(c).replace(/\+/g, "-").replace(/\//g, "_")
}
function generate_rs_put_path(c, g, b) {
    b = b || "image/jpeg";
    return "/rs-put/" + urlsafe_base64_encode(c + ":" + g) + "/mimeType/" + urlsafe_base64_encode(b) + "/rotate/0"
}
    module.exports=utils;
})
