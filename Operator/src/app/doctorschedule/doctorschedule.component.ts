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
  wcal=[];
  wtimeline=[];


  onMyLoad(){
    this.wtimeline=this.timeline(new Date());
  }
  onMyShow(){

    var sdate=AppUtil.FormatDate(new Date());
    var edate=AppUtil.FormatDate( new Date( (new Date()).getTime()+DoctorscheduleComponent.RangeDate*24*3600*1000));
    this.operatorApi.doctorlist({needarrange:"Y",sdate,edate}).then((doctorlist:[])=>{
      
      this.doctorlist=doctorlist;

    });

    this.loadWeekCalendar();
  }

  setDate(doctor,date,time){
    
  }

  
  addWeek(m){
    this.wdate=new Date(this.wdate.getFullYear(),this.mdate.getMonth(),this.mdate.getDate()+(m*7));
    this.loadWeekCalendar();
  }

  loadWeekCalendar(){
    var now=new Date();
    var nowtime=now.getTime();
    
    var wfirst=new Date(this.wdate.getFullYear(),this.wdate.getMonth(),this.wdate.getDate());
    this.wyear=wfirst.getFullYear().toString();
    this.wmonth=(wfirst.getMonth()+1).toString();
    var wfirsttime=wfirst.getTime();
    var kd=0;
    if(wfirst.getDay()){
      kd=0-wfirst.getDay();
    }

    console.log("ccw1",wfirst,wfirst.getDay());
    var startdate=new Date(wfirsttime + kd*24*3600*1000 );
    console.log("ccw2",startdate);
    var startdatetime=wfirsttime + kd*24*3600*1000 ;
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
        };
        wcal.push(d);
    }
    this.wcal=wcal;
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
