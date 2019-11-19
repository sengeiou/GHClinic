
import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { SetmealApi } from 'src/providers/setmeal.api';
import { TijianApi } from 'src/providers/tijian.api';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
  providers: [SetmealApi, TijianApi]
})
export class InformationPage extends AppBase {
  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public tijianApi: TijianApi,
    public setmealApi: SetmealApi,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;
    this.hospital = {};
  }

  zhankai = false;
  mdate: Date = new Date();
  myear = "";
  mmonth = "";
  mcal = [];
  wdate: Date = new Date();
  wyear = "";
  wmonth = "";
  wcal = [];
  wtimeline = [];

  taocanshuxin = null;

  ddate: Date = new Date();




  onMyLoad() {
    //参数
    this.params;
    this.wtimeline = this.timeline(new Date());
    console.log("hahah");
    console.log(this.params.riqi);
  }
  jt = 3;
  qiansantian = [];
  housantian = [];
  jintian = null;
  xzdate = null;
  yiyuanid = null;
  fuwuleibie = null;
  hospital = null;
  hospitalinfo() {

    var api = this.memberApi;
    api.hospitalinfo({ id: this.params.yiyuanid }).then((hospital) => {
      console.log("hahah");
      console.log(hospital);
      this.hospital = hospital;


    })



  }
  taocan = [];
  getsetmeal(id) {
    var api = this.setmealApi;
    api.getsetmeal({ hospital: id }).then((setmeal) => {
      console.log("套餐");
      console.log(setmeal);
      this.taocan = setmeal;

    })

  }
  gettaocanshuxin() {
    var api = this.tijianApi;
    api.taocanshuxin({}).then((shuxin) => {
      console.log(shuxin);
      shuxin.nianlin.map((item, idx) => {
        if (idx == 0) {
          item.xz = true;
        }
        else {
          item.xz = false;
        }
      })
      shuxin.renqun.map((item, idx) => {
        if (idx == 0) {
          item.xz = true;
        }
        else {
          item.xz = false;
        }
      })
      shuxin.xianmu.map((item, idx) => {
        if (idx == 0) {
          item.xz = true;
        }
        else {
          item.xz = false;
        }
      })
      this.taocanshuxin = shuxin;



    })


  }
  onMyShow() {
    this.loadMonthCalendar();
    this.loadWeekCalendar();
    this.gettaocanshuxin();
    this.hospitalinfo();
    this.fuwuleibie = this.params.fuwuleibie;
    if (this.fuwuleibie == '体检') {
      this.getsetmeal(this.params.yiyuanid)
    }
    else {
      var d = new Date();
      this.jintian = { d: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(), d2: (d.getMonth() + 1), d3: d.getDate(), d4: this.getxinqi(d), date: d };
     
    console.log(this.jintian);
       this.riqi=d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      this.getdoctor();
    }




    
  
    this.xzdate = this.jintian.date;
    this.qiansantian = this.getQianDay(this.params.riqi);
    console.log(this.qiansantian);
    this.housantian = this.getNextDay(this.params.riqi);
    console.log(this.housantian);

  }
  doctorlist = [];
  getxinqi(d) {

    var d = d.getDay();

    switch (d) {
      case 0:
        return '日';
      case 1:
        return '一';
      case 2:
        return '二';
      case 3:
        return '三';
      case 4:
        return '四';
      case 5:
        return '五';
      case 6:
        return '六';
    }



  }
  clickdate(d) {

    this.xzdate = d.date;

  }
  getdoctor() {
    var api = this.memberApi;
        



    api.getdoctor({ departmentname: this.params.fuwuleibie, hospital_id: this.params.yiyuanid, riqi: this.riqi }).then((doctorlist) => {
      console.log(doctorlist);
      this.doctorlist = doctorlist;
    })
  }
  // doctor(id) {
  //   this.navigate("doctor",{ riqi:this.xzdate,id:id,hospital: JSON.stringify(this.hospital)})
  // }

  doctor(id) {
    this.navigate("doctor", { id: id, departmentname: this.params.fuwuleibie, hospital_id: this.params.yiyuanid, riqi: this.riqi });
  }

  clinic() {
    this.navigate("clinic", { hospital_id: this.params.yiyuanid })
  }
  getNextDay(d) {
    var qiansantian = [];
    var q = d;
    d = new Date(q).getTime();
    d = +d + 1000 * 60 * 60 * 24;
    d = new Date(d);
    var sdata = { d: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(), d2: (d.getMonth() + 1), d3: d.getDate(), d4: this.getxinqi(d), date: d }
    qiansantian[0] = sdata;

    d = new Date(q).getTime();
    d = +d + 2000 * 60 * 60 * 24;
    d = new Date(d);
    var sdata = { d: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(), d2: (d.getMonth() + 1), d3: d.getDate(), d4: this.getxinqi(d), date: d }
    qiansantian[1] = sdata;


    d = new Date(q).getTime();
    d = +d + 3000 * 60 * 60 * 24;
    d = new Date(d);
    var sdata = { d: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(), d2: (d.getMonth() + 1), d3: d.getDate(), d4: this.getxinqi(d), date: d }
    qiansantian[2] = sdata;




    return qiansantian;
  }

  getQianDay(d) {
    var qiansantian = [];
    var q = d;
    d = new Date(q).getTime();
    d = +d - 1000 * 60 * 60 * 24;
    d = new Date(d);
    var sdata = { d: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(), d2: (d.getMonth() + 1), d3: d.getDate(), d4: this.getxinqi(d), date: d }
    qiansantian[0] = sdata;

    d = new Date(q).getTime();
    d = +d - 2000 * 60 * 60 * 24;
    d = new Date(d);
    var sdata = { d: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(), d2: (d.getMonth() + 1), d3: d.getDate(), d4: this.getxinqi(d), date: d }
    qiansantian[1] = sdata;


    d = new Date(q).getTime();
    d = +d - 3000 * 60 * 60 * 24;
    d = new Date(d);
    var sdata = { d: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(), d2: (d.getMonth() + 1), d3: d.getDate(), d4: this.getxinqi(d), date: d }
    qiansantian[2] = sdata;




    return qiansantian;
  }




  xzrq = null;
  xzy = null;
  riqi = "";
  asd(d, i) {
    console.log("123123123");
    if (d.pass == true&&d.today==false) {
      console.log(d);
      console.log("当天");
      return
    }
    else {
      console.log(d.sdate);
      console.log(new (Date));
      this.xzrq = d.d;
      this.xzy = d.f;
      this.riqi = d.dt;
      this.myday = d.d;
      this.getdoctor();
    }
    console.log(d);
    console.log(i);
  }
  addMonth(m) {
    this.mdate = new Date(this.mdate.getFullYear(), this.mdate.getMonth() + m, 1);
    this.loadMonthCalendar();
  }

  addWeek(m) {
    this.wdate = new Date(this.wdate.getFullYear(), this.wdate.getMonth(), this.wdate.getDate() + (m * 7));
    this.loadWeekCalendar();
  }
  loadWeekCalendar() {
    var now = new Date();
    var nowtime = now.getTime();

    var wfirst = new Date(this.wdate.getFullYear(), this.wdate.getMonth(), this.wdate.getDate());
    this.wyear = wfirst.getFullYear().toString();
    this.wmonth = (wfirst.getMonth() + 1).toString();
    var wfirsttime = wfirst.getTime();
    var kd = 0;
    if (wfirst.getDay()) {
      kd = 0 - wfirst.getDay();
    }

    console.log("ccw1", wfirst, wfirst.getDay());
    var startdate = new Date(wfirsttime + kd * 24 * 3600 * 1000);
    console.log("ccw2", startdate);
    var startdatetime = wfirsttime + kd * 24 * 3600 * 1000;
    var wcal = [];
    for (var j = 0; j < 7; j++) {
      var sdatetime = startdatetime + j * 24 * 3600 * 1000;
      var sdate = new Date(sdatetime);
      var d = {
        sdate: sdate,
        pass: sdatetime < nowtime,
        today: sdate.getFullYear() == now.getFullYear() && sdate.getMonth() == now.getMonth() && sdate.getDate() == now.getDate(),
        d: sdate.getDate(),
        q: sdate.getMonth(),
        dt: AppUtil.FormatDate(AppUtil.FormatDateTime(sdate)),
        timeline: this.timeline(sdate)
      };
      if (d.today) {
        this.xzrq = d.d;
        //this.riqi = d.dt;
      }
      wcal.push(d);
    }
    this.wcal = wcal;
  }
  timeline(sdate: Date) {
    var now = new Date();
    var nowtime = now.getTime();

    var timeline = [];
    for (var i = 8; i <= 19; i++) {
      var d1 = new Date(sdate.getFullYear(), sdate.getMonth(), sdate.getDate(), i, 29, 59);
      var d1time = d1.getTime();
      timeline.push({
        hour: i,
        minute: "00",
        pass: d1time < nowtime,
        passt: d1time + "<" + nowtime
      })
      var d2 = new Date(sdate.getFullYear(), sdate.getMonth(), sdate.getDate(), i, 59, 59);
      var d2time = d2.getTime();
      timeline.push({
        hour: i,
        minute: "30",
        pass: d2time < nowtime,
        passt: d2time + "<" + nowtime,
      })
    }
    return timeline;
  }
  myday = '';
  loadMonthCalendar() {
    var now = new Date();
    var nowtime = now.getTime();

    var mfirst = new Date(this.mdate.getFullYear(), this.mdate.getMonth(), 1);
    console.log("niubiadas");
    console.log(this.ddate.getDate());
    this.myday = this.ddate.getDate().toString();
    this.myear = mfirst.getFullYear().toString();

    this.mmonth = (mfirst.getMonth() + 1).toString();

    var mfirsttime = mfirst.getTime();
    var kd = 0;
    if (mfirst.getDay()) {
      kd = 0 - mfirst.getDay();
    }

    console.log("cc1", mfirst, mfirst.getDay());
    var startdate = new Date(mfirsttime + kd * 24 * 3600 * 1000);
    console.log("cc2", startdate);
    var startdatetime = mfirsttime + kd * 24 * 3600 * 1000;
    var mcal = [];
    for (var i = 0; i < 5; i++) {
      var w = [];
      for (var j = 0; j < 7; j++) {
        var vd = i * 7 + j;
        var sdatetime = startdatetime + vd * 24 * 3600 * 1000;
        var sdate = new Date(sdatetime);
        var d = {
          sdate: sdate,
          pass: sdatetime < nowtime,
          today: sdate.getFullYear() == now.getFullYear() && sdate.getMonth() == now.getMonth() && sdate.getDate() == now.getDate(),
          d: sdate.getDate(),
          dt: AppUtil.FormatDate(AppUtil.FormatDateTime(sdate)),
          f: sdate.getMonth() + 1
        };
        if (d.today) {
          this.xzrq = d.d;
          this.xzy = d.f;
          //this.riqi = d.dt;
        }
        w.push(d);
      }
      mcal.push(w);
    }
    this.mcal = mcal;
  }
  screen = () => {

    var divThree = document.getElementById('divThree')
    var divTwo = document.getElementById('divTwo')
    if (divThree.style.height === '418px') {
      divThree.style.height = 0 + 'px';
      divThree.style.display = "none";
      divTwo.style.display = "none";
      divTwo.style.opacity = '0';
    } else {
      divThree.style.height = 418 + 'px';
      divThree.style.display = "block";
      divTwo.style.display = "block";
      divTwo.style.opacity = '0.6';
    }

  }


  comprehensive=()=>{
    var divOne = document.getElementById('divOne')
    var divFour = document.getElementById('divFour')
    if (divOne.style.height === '285px') {
      divOne.style.height = 0 + 'px';
      divOne.style.display = "none";
      divFour.style.display = "none";
      divFour.style.opacity = '0';
    } else {
      divOne.style.height = 285 + 'px';
      divOne.style.display = "block";
      divFour.style.display = "block";
      divFour.style.opacity = '0.6';
    }
  }

  detail(id) {
    this.navigate("detail", { riqi: this.riqi, id: id, yiyuanid: this.params.yiyuanid })
  }
  qiehuan1(item) {
    var taocanshuxin = this.taocanshuxin;

    if (item.xz != true) {

      taocanshuxin.nianlin.map((item) => {
        item.xz = false;
      })

      item.xz = true;





    }
    else {

    }

  }
  qiehuan2(item) {
    var taocanshuxin = this.taocanshuxin;
    if (item.xz != true) {

      taocanshuxin.renqun.map((item) => {
        item.xz = false;
      })
      item.xz = true;

    }
    else {

    }

  }
  qiehuan3(item) {
    var taocanshuxin = this.taocanshuxin;
    if (item.xz != true) {

      taocanshuxin.xianmu.map((item) => {
        item.xz = false;
      })
      item.xz = true;

    }
    else {

    }

  }
  chonzhi() {
    this.gettaocanshuxin();

  }

  shuaixuan(){
    var xinbie=0;
    var renqun=0;
    var taocan=0;
    var taocanshuxin=this.taocanshuxin;
       
      taocanshuxin.nianlin.map((item)=>{
        
        if(item.xz==true)
        {
           xinbie=item.id;
       
        }

      })
      taocanshuxin.renqun.map((item)=>{
        if(item.xz==true)
        {
          renqun=item.id;
       
        }

      })
      taocanshuxin.xianmu.map((item)=>{

        if(item.xz==true)
        {
          taocan=item.id;
       
        }
      })
    
      var  api=this.tijianApi;
         
       api.taocanshaixuan({xinbie:xinbie,renqun:renqun,taocan:taocan}).then((taocan)=>{
           
          this.taocan=taocan;
         this.screen();
       })
      
       



  }
}
