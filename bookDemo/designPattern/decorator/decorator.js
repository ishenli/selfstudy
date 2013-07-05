/**
 * Created with JetBrains WebStorm.
 * User: shenli
 * Date: 13-7-5
 * Time: 下午7:48
 * To change this template use File | Settings | File Templates.
 */
var Bicycle=new Interface('Bicycle',['assemble','wash','ride','repair','getPrice']);

var AcmeComfortCruiser=function(){};

AcmeComfortCruiser.prototype={
    assemble:function(){},
    wash:function(){},
    ride:function(){},
    repair:function(){},
    getPrice:function(){
        return 399.00;
    }
}


/*The BicycleDecorator abstract decorator class*/

var BicycleDecorator=function(bicycle){
    Interface.ensureImplements(bicycle,Bicycle);
    console.log("doing the BicycleDecorator constructor……");
    this.bicycle=bicycle;
}
BicycleDecorator.prototype={
    assemble:function(){
        return this.bicycle.assemble();
    },
    wash:function(){
        return this.bicycle.wash();
    },
    ride:function(){
        return this.bicycle.ride();
    },
    repair:function(){
        return this.bicycle.repair();
    },
    getPrice:function(){
        return this.bicycle.getPrice();
    }
}

//HeadlightDecorator class
var HeadlightDecorator=function(bicycle){ //implements Bicycle
    //call the superclass's constructor
    HeadlightDecorator.superclass.constructor.call(this,bicycle);
}

extend(HeadlightDecorator,BicycleDecorator);//Extend the superclass

HeadlightDecorator.prototype.assemble=function(){
    return this.bicycle.assemble()+"Attach headlight to handlebars.";
};
HeadlightDecorator.prototype.getPrice=function(){
    return this.bicycle.getPrice()+15.00;
}