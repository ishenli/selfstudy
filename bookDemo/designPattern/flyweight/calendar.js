/**
 * Created with JetBrains WebStorm.
 * User: shenli
 * Date: 13-7-6
 * Time: 下午9:59
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
/*首先修改CalendarDay对象的本身，除去其中保存的所有数据，让这些数据成为外在数据*/
var CalendarDay=function(){};

CalendarDay.prototype={
    display:function(date,parent){
        var element=document.createElement("div");
        parent.appendChild(element);
        element.innerHTML=date;
    }
};
//Single instance of CalendarDay
var calendarDay=new CalendarDay();

/*CalendarMonth class ,a composite
*   原来CalendarDay类构造函数创建该类实例的那个表达式被替换为calendarDay对象，而那些原本提供给CalendarDay类构造函数的参数
*   现在被转而提供display方法
* */
var CalendarMonth=function(mouthNum,numDays,parent){
    this.monthNum=mouthNum;
    this.element=document.createElement("div");
    parent.appendChild(this.element);
    this.days=[];
    for(var i= 0,len=numDays;i<len;i++){
        this.days[i]=calendarDay; //the difference
    }
};

CalendarMonth.prototype={
    display:function(){
        for(var i= 0,len=this.days.length;i<len;i++){
            this.days[i].display(i,this.element);
        }
        this.element.style.display="block";
    }
}