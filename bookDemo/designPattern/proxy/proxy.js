/**
 * Created with JetBrains WebStorm.
 * User: shenli
 * Date: 13-7-7
 * Time: 下午3:29
 * To change this template use File | Settings | File Templates.
 */

var Library=new Interface("Library",['findBooks','checkoutBooks','returnBooks']);

var PublicLibrary=function(books){
    this.catalog=[];
    for(var i= 0,len=books.length;i<len;i++){
        this.catalog[books[i].getIsbn()]={book:books[i],available:true};
    }
};
PublicLibrary.prototype={
    findBooks:function(){},
    checkoutBooks:function(){},
    returnBooks:function(){}

}
/*
假设PublicLibrary的实例化很慢，不能在网页加载的时候立即完成，可以创建一个虚拟代理*/
var PublicLibraryVirtualProxy=function(catalog){
    this.library=null;
    this.catalog=catalog;
};
PublicLibraryVirtualProxy.prototype={
    _initializeLibray:function(){
        if(this.library==null){
            this.library=new PublicLibrary(this.catalog);
        }
    },
    findBooks:function(searchString){
        this._initializeLibray(); //等到需要时才会创建实例
        return this.library.findBooks(searchString);
    },
    checkoutBooks:function(book){
        this._initializeLibray();
        return this.library.checkoutBooks(book);
    }

}
