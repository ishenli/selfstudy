/**
 * Created with JetBrains WebStorm.
 * User: shenli
 * Date: 13-7-6
 * Time: 下午4:48
 * To change this template use File | Settings | File Templates.
 */
var CalendarItem=new Interface("CalendarItem",['display']);

/*Calendar class ,a composite*/

var CalendarYear=function(year,parent){
    this.year=year;
    this.element=document.createElement("div");
    this.element.style.display="none";
    parent.appendChild(this.element);
    function isLeapYear(y){ //判断是否为闰年
        return (y>0)&&!(y%4)&&((y%100)||(y%400));
    }

    this.months=[];
    this.numDays=[31,isLeapYear(this.year)?29:28,31,30,31,30,31,31,30,31,30,31];
    for(var i=0,len=12;i<len;i++){
        this.months[i]=new CalendarMonth(i,this.numDays[i],this.element);
    }
};

CalendarYear.prototype={
   display:function(){
       for(var i= 0,len=this.months.length;i<len;i++){
           this.months[i].display(); // pass the call down to the next level
       }
       this.element.style.display="block";
   }
};

/*CalendarMonth class,a composite*/
var CalendarMonth=function(monthNum,numDays,parent){
    this.monthNum=monthNum;
    this.element=document.createElement("div");
    this.element.style.display="none";
    parent.appendChild(this.element);
    this.days=[];
    for(var i= 0,len=numDays.length;i<len;i++){
        this.days[i]=new CalendarDay(i,this.element);
    }
};

CalendarMonth.prototype={
    display:function(){
        for(var i= 0,len=this.days.length;i<len;i++){
            this.days[i].display();
        }
        this.element.style.display="block";
    }
}

var CalendarDay=function(date,parent){
    this.date=date;
    this.element=document.createElement("div");
    this.element.style.display="none";
    parent.appendChild(this.element);
};
CalendarDay.prototype={
    display:function(){
        this.element.style.display="block";
        this.element.innerHTML=this.date;
    }
};

//该代码的问题在于你不得不为每一年创建一个365个Calendar对象