/**
 * Created with JetBrains WebStorm.
 * User: shenli
 * Date: 13-7-6
 * Time: 上午10:32
 * To change this template use File | Settings | File Templates.
 */
/*假设要开发一个系统，来代表一个城市所有的车。你需要保存每一辆汽车的详细情况（品牌，型号和出厂日期）及所有权的详细
 情况（车主姓名、车牌和登记日期）*/

/*car class,un-optimizied*/
/*var Car=function(make,model,year,owner,tag,renewDate) {
    所有属性
};

Car.prototype={
    transferOwnerShip:function(newOwner,newTag,newRenewDate){ },
    renewRegistration:function(newRenewDate){}
    其他方法
};*/


/*Car class,optimized as a flyweight*/
var Car=function(make,model,year) {
    this.make=make;
    this.model=model;
    this.year=year;
};

Car.prototype = {
    getMake:function(){
        return this.make;
    },
    getModel:function() {
        return this.model;
    },
    getYear:function() {
        return this.year;
    }
};

/*用工厂进行实例化 CarFactory Singleton*/
var CarFactory=(function(){
    var createdCars={};
    return {
        createCar:function(make,model,year){
            //check to see if this particular combination has been created before.
            if(createdCars[make+"-"+model+"-"+year]){
                return createdCars[make+"-"+model+"-"+year];
            }else{
                //create a new car
                var car=new Car(make,model,year);
                createdCars[make+"-"+model+"-"+year]=car;
                return car;
            }
        }
    }
})();

var CarRecorDatabase=(function(){
    var carRecordDatabase={};
    return {
        addCarRecored:function(make,model,year,owner,tag,renewDate){
            var car=CarFactory.createCar(make,model,year);
            carRecordDatabase[tag]={
                owner:owner,
                renewDate:renewDate,
                car:car
            }
        },
        transferOwnership:function(tag,newOwner,newTag,newRenewDate){
            var record=carRecordDatabase[tag];
            record.owner=newOwner;
            record.tag=newTag;
            record.renewDate=newRenewDate;
        },
        renewRegistration:function(tag,newRenewDate){
            var today=new Date();
            return today.getTime()<Date.parse(carRecordDatabase[tag].renewDate);
        }
    }
}());
