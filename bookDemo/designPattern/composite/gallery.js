/**
 * Created with JetBrains WebStorm.
 * User: shenli
 * Date: 13-7-4
 * Time: PM4:09
 * To change this template use File | Settings | File Templates.
 */

var Composite=new Interface("Composite",['add','remove','getChild']);
var GalleryItem=new Interface('GalleryItem',['hide','show']);


//DynamicGallery
var DynamicGallery=function(id){
    this.element=document.createElement("div");
    this.element.id=id;
    this.children=[];
}

DynamicGallery.prototype={
    add:function(child){
        Interface.ensureImplements(child,Composite,GalleryItem);
        this.children.push(child);
        this.element.appendChild(child.getElement());
    },
    remove:function(child){
        for(var i= 0,node;node=this.getChild(i);i++){
            if(child==node){
                this.children.splice(i,1);
                break;
            }
        }
        this.children.removeChild(child.getElement());
    },
    getChild:function(i){
        return this.children[i];
    },
    getElement:function(){
        return this.element;
    },
    //implements the GalleryItem interface
    show:function(){
        this.element.style.display="block";
        for(var i= 0,node;node=this.getChild(i);i++){
            node.show();
        }
    },
    hide:function(){
        for(var i= 0,node;node=this.getChild(i);i++){
            node.hide();
        }
    }
};

var GalleryImage=function(src){
    this.element=document.createElement("img");
    this.element.src=src;
}

GalleryImage.prototype={
    add:function(){},    //this is a leaf node,we just define the method
    remove:function(){},
    getChild:function(){},
    hide:function(){
        this.element.style.display="none";
    },
    show:function(){
        this.element.style.display="";
    },
    getElement:function(){
        return this.element;
    }
};




