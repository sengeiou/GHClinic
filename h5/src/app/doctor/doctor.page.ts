
import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { DoctorApi } from 'src/providers/doctor.api';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.page.html',
  styleUrls: ['./doctor.page.scss'],
  providers: [MemberApi, DoctorApi]
})
export class DoctorPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public doctorApi: DoctorApi,
    public memberApi: MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;
    this.danqianyuyue = {};
    this.doctorinfo = {};
    this.hospital = {};
  }


  show=true;

  mdate: Date = new Date();
  myear = "";
  mmonth = "";
  mcal = [];


  ddate: Date = new Date();

  onMyLoad() {
    //参数
    this.params;
  }
  doctorinfo = null;
  hospital = null;
  getdoctoinfo() {
    var api = this.doctorApi;
    api.info({ id: this.params.id }).then((doctorinfo) => {
      console.log(doctorinfo);
      this.doctorinfo = doctorinfo;
    })
  }

  sw = true;
  jt = 3;
  qiansantian = [];
  housantian = [];
  jintian = null;
  xzdate = null;

  clickdate(d, i) {
    console.log(d);

    this.xzdate = d.date;
    this.danqianyuyue = this.dlist[i];
  }
  onMyShow() {
    this.loadMonthCalendar();
    this.jt = 3;
    this.getdoctoinfo();
    //this.hospital = JSON.parse(this.params.hospital);
    this.memberApi.hospitalinfo({ id: this.params.hospital_id }).then((hospital) => {
      this.hospital = hospital;
    });
    console.log("哈HAHAHAH");
    console.log(this.params.riqi);
    if (this.params.riqi != "") {
      this.riqi = this.params.riqi;
    } else {
      var d = new Date();
      var dt = d.getTime() + 24 * 3600 * 1000;
      d = new Date(dt);
      this.riqi = AppUtil.FormatDate(AppUtil.FormatDateTime(d));
    }

    // this.qiansantian = this.getQianDay(this.params.riqi);
    // console.log(this.qiansantian);
    // this.housantian = this.getNextDay(this.params.riqi);
    // console.log(this.housantian);


    this.getyishenpaiban();

  }
  appointment(ban) {
    if (Number(ban.bookingcount)>=Number(this.InstInfo.orderlimit)) {
      return
    }
    this.navigate("appointment", {doctor_id:this.params.id,hospital_id:this.params.hospital_id,departmentname:this.params.departmentname,schedule_id:ban.id })
  }

  paiban = [];
  getyishenpaiban() {
    var api = this.doctorApi;
    var now = new Date();
    var m=now.getMinutes();
 
     var dqdate=this.bu0(now.getHours())+":"+this.bu0(now.getMinutes());
    console.log(dqdate);
    api.dayschedule({ doctor_id: this.params.id, fdate:this.riqi}).then((paiban) => {
        
      paiban=paiban.filter((item)=>{

           return    item.ftime>dqdate

          })

      console.log("paiban",paiban);
      this.paiban = paiban;

    })
  }
 bu0(time)
 {
  if(time<10){
    time = ""+"0"+time;
}
return time;

 }

  danqianyuyue = null;
  dlist = [];


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

  riqi = "";
  asd(d, i) {
    if (d.pass == true&&d.today==false) {
      return
    }
    else {
      this.riqi = d.dt;
    }
    this.getyishenpaiban();
  }
  addMonth(m) {
    this.mdate = new Date(this.mdate.getFullYear(), this.mdate.getMonth() + m, 1);
    this.loadMonthCalendar();
  }

  loadMonthCalendar() {
    var now = new Date();
    var nowtime = now.getTime();

    var mfirst = new Date(this.mdate.getFullYear(), this.mdate.getMonth(), 1);
    this.myear = mfirst.getFullYear().toString();
    this.mmonth = (mfirst.getMonth() + 1).toString();
    var mfirsttime = mfirst.getTime();
    var kd = 0;
    if (mfirst.getDay()) {
      kd = 0 - mfirst.getDay();
    }

    var startdate = new Date(mfirsttime + kd * 24 * 3600 * 1000);
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
          f: sdate.getMonth() + 1,
          dt: AppUtil.FormatDate(AppUtil.FormatDateTime(sdate))
        };
        w.push(d);
      }
      mcal.push(w);
    }
    this.mcal = mcal;
  }



  fanhui(){
    this.navigate('tabs/tab1')
  }





}
