/**
 * Created with JetBrains WebStorm.
 * User: shenli
 * Date: 13-7-3
 * Time: PM4:09
 * To change this template use File | Settings | File Templates.
 */

var Composite=new Interface("Composite",['add','remove','getChild']);
var FormItem=new Interface('FormItem',['save']);

var CompositeForm=function(id,method,action){ // implements Composite interface
    this.formComponents=[];
    this.element=document.createElement("form");
    this.element.id=id;
    this.element.method=method||"post";
    this.element.action=action||"#";

};

CompositeForm.prototype.add=function(child){
    Interface.ensureImplements(child,Composite,FormItem);
    this.formComponents.push(child);
    this.element.appendChild(child.getElement());
}

CompositeForm.prototype.remove=function(child){
    for(var i= 0,len=this.formComponents.length;i<len;i++){
        if(this.formComponents[i]==child){
            this.formComponents.splice(i,1); //remove the element from array at position i
            break;
        }
    }
};

CompositeForm.prototype.getChild=function(i) {
    return this.formComponents[i];
}

CompositeForm.prototype.save=function(){
    for(var i= 0,len=this.formComponents.length;i<len;i++){
        this.formComponents[i].save();
    }
}

CompositeForm.prototype.getElement=function(){
    return this.element;
}

var Field=function(id){          //implements Composite ,FormItems
    this.id=id;
    this.element=null;
}

Field.prototype.add=function(){};
Field.prototype.remove=function(){};
Field.prototype.getChild=function(){};
Field.prototype.save=function(){
    setCookie(this.id,this.getValue());
}
Field.prototype.getElement=function(){
    return this.element;
}

Field.prototype.getValue=function(){
    throw new Error("Unsupported operation on the class Field");
}

var InputField=function(id,label){
    Field.call(this,id);
    this.input=document.createElement("input");
    this.input.id=id;
    this.label=document.createElement("label");
    var labelText=document.createTextNode(label);
    this.label.appendChild(labelText);
    this.element=document.createElement("div");
    this.element.className="input-field";
    this.element.appendChild(this.label);
    this.element.appendChild(this.input);
};

extend(InputField,Field);// inherit from field

InputField.prototype.getValue=function(){
    return this.input.value;
}



