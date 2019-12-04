import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OperatorApi } from 'src/providers/operator.api';
import { DoctorApi } from 'src/providers/doctor.api';
import { ApiConfig } from '../api.config';
import { AppUtil } from '../app.util';


@Component({
  selector: 'app-doctorschedule',
  templateUrl: './doctorschedule.component.html',
  styleUrls: ['./doctorschedule.component.scss'],
  providers:[InstApi,OperatorApi,DoctorApi]
})
export class DoctorscheduleComponent  extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public doctorApi:DoctorApi,
    public operatorApi:OperatorApi
  ) { 
    super(router,activeRoute,instApi);
  }

  static RangeDate=28;
  doctorlist=[];


  wdate:Date=new Date();
  wyear="";
  wmonth="";
  wday="";
  wenddate="";
  wcal=[];
  wtimeline=[];


  onMyLoad(){
    this.wtimeline=this.timeline(new Date());
  }
  onMyShow(){
    this.loaddata();
  }
num=[]
  loaddata(){

    var sdate=AppUtil.FormatDate(new Date());
    var edate=AppUtil.FormatDate( new Date( (new Date()).getTime()+DoctorscheduleComponent.RangeDate*24*3600*1000));
    this.operatorApi.doctorlist({needarrange:"Y",sdate,edate}).then((doctorlist:[])=>{
      console.log(doctorlist,'list')
      this.doctorlist=doctorlist;
      // var dates = [];
      // var ent=[];
      // this.doctorlist = this.doctorlist.filter(item=>{
      //   for(let date in item.timetable){
      //     if(this.check(item.timetable[date])==true){
      //       var rq = item.timetable[date].rd.slice(0,8);
       
      //         if(!dates[item.timetable[date].doctor_id]) {
      //             var arr = [];
      //             arr.push(rq);
      //             dates[item.timetable[date].doctor_id] = arr;
      //         }else {
                
      //           dates[item.timetable[date].doctor_id].push(rq)

      //         }
      //     }
      //   }
        


      //   return item
      // });
     
      
    });

    this.loadWeekCalendar();
  }

  getRepeatNum(arr){ 
    var obj = {}; 
    
    for(var i= 0, l = arr.length; i< l; i++){ 
        var item = arr[i]; 
        obj[item] = (obj[item] +1 ) || 1; 
    } 
    return obj; 
}

  check(date){
    var rq = date.rd.slice(0,8);
    if(date.rd.indexOf(rq)>-1){
      if(date.isleisure=="Y"){
        return true
      }
    }
    return false
  }

  overdoctor=0;
  overtime=0;
  overday="";
  setMouseOver(doctor,date,time){
    this.overdoctor=doctor.id;
    this.overtime=time.hour+time.minute;
    this.overday=date.dt;
  }

  clearMouseOver(){
    this.overdoctor=0;
    this.overtime=0;
  }

  setDate(doctor,date,time,flag){
    var dt=date.dt+time.hour+time.minute;
    if(doctor.timetable[dt]==undefined){
      doctor.timetable[dt]={rd:dt,fdate:date.datestr,ftime:time.hour+":"+time.minute,doctor_id:doctor.id,bookingcount:0};
    }
    if(doctor.timetable[dt].bookingcount>0){
      return;
    }
    if(time.pass==true){
      return;
    }
    if(flag==false){
      doctor.timetable[dt].isleisure=doctor.timetable[dt].isleisure=='Y'?"N":"Y";
    }else {
      doctor.timetable[dt].isleisure=doctor.timetable[dt].isleisure=='Y'?"Y":"Y";
    }
    this.operatorApi.settime(doctor.timetable[dt]).then((ret:any)=>{
      console.log(ret);
    });
  }

  xuanzhong(d,doctor,flag){
    console.log(d)
    console.log(doctor.id)
    
    if(d.pass==true && d.today==false){

        d.show = 0
      
    }else if (d.today==true || d.pass==false){

      if(doctor.id == d.show){
        d.show = 0
      }else {
        d.show = doctor.id;
      }
     
    }
    
    if(flag==false){
      for(let i=0;i<d.timeline.length;i++){
        this.setDate(doctor,d,d.timeline[i],true);
      }
    }else {
      for(let i=0;i<d.timeline.length;i++){
        this.setDate(doctor,d,d.timeline[i],false);
      }
    }
      
      

   

  }

  
  addWeek(m){
    this.wdate=new Date(this.wdate.getFullYear(),this.wdate.getMonth(),this.wdate.getDate()+(m*7));
    this.loaddata();
  }

  loadWeekCalendar(){
    var now=new Date();
    var nowtime=now.getTime();
    
    var wfirst=new Date(this.wdate.getFullYear(),this.wdate.getMonth(),this.wdate.getDate());
    this.wyear=wfirst.getFullYear().toString();
    this.wmonth=(wfirst.getMonth()+1).toString();
    var wfirsttime=wfirst.getTime();
    var kd=0;
    kd=wfirst.getDay()||7;
    kd=kd-1;
    console.log("ccw1",wfirst,wfirst.getDay());
    var startdate=new Date(wfirsttime - kd*24*3600*1000 );
    this.wday=startdate.getDate().toString();
    this.wenddate=(new Date(wfirsttime - kd*24*3600*1000 + 7*24*3600*1000 )).getDate().toString();
    console.log("ccw2",startdate);
    var startdatetime=startdate.getTime() ;
    var wcal=[];
    for(var j=0;j<7;j++){
        var sdatetime=startdatetime+j*24*3600*1000;
        var sdate=new Date(sdatetime);
        var d={
          sdate:sdate,
          pass:sdatetime<nowtime,
          today:sdate.getFullYear()==now.getFullYear()&&sdate.getMonth()==now.getMonth()&&sdate.getDate()==now.getDate(),
          d:sdate.getDate(),
          timeline:this.timeline(sdate),
          dayname:AppUtil.getDayname(sdate),
          dt:AppUtil.FormatDate2(sdate),
          datestr:AppUtil.FormatDate(sdate),
          show:0,
          monday: this.getmonday(AppUtil.FormatDate(sdate))
        };
        wcal.push(d);
    }
    this.wcal=wcal;
    console.log(this.wcal,"jsakfhsak")
  }
  getmonday(date){
    date = date.slice(5,10);
    var dates = date.replace('-','/');
    return dates;
  }
  timeline(sdate:Date){
    var now=new Date();
    var nowtime=now.getTime();

    var timeline=[];
    for(var i=8;i<=19;i++){
      var vi=i>9?i:"0"+i;

      var d1=new Date(sdate.getFullYear(),sdate.getMonth(),sdate.getDate(),i,29,59);
      var d1time=d1.getTime();
      timeline.push({
        hour:vi,
        minute:"00",
        pass:d1time<nowtime,
        passt:d1time+"<"+nowtime
      })
      var d2=new Date(sdate.getFullYear(),sdate.getMonth(),sdate.getDate(),i,59,59);
      var d2time=d2.getTime();
      timeline.push({
        hour:vi,
        minute:"30",
        pass:d2time<nowtime,
        passt:d2time+"<"+nowtime,
      })
    }
    return timeline;
  }

}
