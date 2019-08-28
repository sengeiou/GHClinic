import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers:[InstApi]
})
export class CalendarComponent  extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi
  ) { 
    super(router,activeRoute,instApi);
  }

  mdate:Date=new Date();
  myear="";
  mmonth="";
  mcal=[];


  wdate:Date=new Date();
  wyear="";
  wmonth="";
  wcal=[];
  wtimeline=[];


  ddate:Date=new Date();

  onMyLoad(){
    this.wtimeline=this.timeline(new Date());
  }

  onMyShow(){
    
    this.loadMonthCalendar();
    this.loadWeekCalendar();
  }

  addMonth(m){
    this.mdate=new Date(this.mdate.getFullYear(),this.mdate.getMonth()+m,1);
    this.loadMonthCalendar();
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
          timeline:this.timeline(sdate)
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
      var d1=new Date(sdate.getFullYear(),sdate.getMonth(),sdate.getDate(),i,29,59);
      var d1time=d1.getTime();
      timeline.push({
        hour:i,
        minute:"00",
        pass:d1time<nowtime,
        passt:d1time+"<"+nowtime
      })
      var d2=new Date(sdate.getFullYear(),sdate.getMonth(),sdate.getDate(),i,59,59);
      var d2time=d2.getTime();
      timeline.push({
        hour:i,
        minute:"30",
        pass:d2time<nowtime,
        passt:d2time+"<"+nowtime,
      })
    }
    return timeline;
  }

  loadMonthCalendar(){
    var now=new Date();
    var nowtime=now.getTime();
    
    var mfirst=new Date(this.mdate.getFullYear(),this.mdate.getMonth(),1);
    this.myear=mfirst.getFullYear().toString();
    this.mmonth=(mfirst.getMonth()+1).toString();
    var mfirsttime=mfirst.getTime();
    var kd=0;
    if(mfirst.getDay()){
      kd=0-mfirst.getDay();
    }

    console.log("cc1",mfirst,mfirst.getDay());
    var startdate=new Date(mfirsttime + kd*24*3600*1000 );
    console.log("cc2",startdate);
    var startdatetime=mfirsttime + kd*24*3600*1000 ;
    var mcal=[];
    for(var i=0;i<5;i++){
      var w=[];
      for(var j=0;j<7;j++){
        var vd=i*7+j;
        var sdatetime=startdatetime+vd*24*3600*1000;
        var sdate=new Date(sdatetime);
        var d={
          sdate:sdate,
          pass:sdatetime<nowtime,
          today:sdate.getFullYear()==now.getFullYear()&&sdate.getMonth()==now.getMonth()&&sdate.getDate()==now.getDate(),
          d:sdate.getDate()
        };
        w.push(d);
      }
      mcal.push(w);
    }
    this.mcal=mcal;
  }

}
