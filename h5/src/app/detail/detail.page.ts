
import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { SetmealApi } from 'src/providers/setmeal.api';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  providers: [SetmealApi]
})
export class DetailPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public setmealApi: SetmealApi,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;
    this.setmealinfo = {};
  }
  jt = 3;
  qiansantian = [];
  housantian = [];
  jintian = null;
  xzdate = null;
  yiyuanid = null;
  fuwuleibie = null;
  hospital = null;
  taocan = [];
  setmealinfo = null;

  mdate: Date = new Date();
  myear = "";
  mmonth = "";
  mcal = [];


  ddate: Date = new Date();

  onMyLoad() {
    //参数

    this.params;
  }
  hospitalinfo() {

    var api = this.memberApi;
    api.hospitalinfo({ id: this.params.yiyuanid }).then((hospital) => {
      console.log("hahah");
      console.log(hospital);
      this.hospital = hospital;

     
    })

  }


  taocaninfo(id) {
    var api = this.setmealApi;

    api.setmealinfo({ id: id }).then((setmealinfo) => {
      console.log("taocanxiangqin", setmealinfo);
      this.setmealinfo = setmealinfo;

    })


  }
  riqi = "";
  onMyShow() {
    this.loadMonthCalendar();
    this.hospitalinfo();
    this.taocaninfo(this.params.id);
    if (this.params.riqi != "") {
      this.riqi = this.params.riqi;
    } else {
      var d = new Date();
      var dt = d.getTime() + 24 * 3600 * 1000;
      d = new Date(dt);
      this.riqi = AppUtil.FormatDate(AppUtil.FormatDateTime(d));
    }

  }
  physicalExaminationAppointment() {
    this.navigate("physical-examination-appointment", { riqi: this.riqi, id: this.params.id, yiyuanid: this.params.yiyuanid })
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
  ddddd = null;
  clickdate(d) {

    this.xzdate = d.date;
    this.ddddd = d;
    console.log(d);

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

  asd(d, i) {
    if (d.pass == true&&d.today==false) {
      return
    }
    else {
      this.riqi = d.dt;
    }
   
  }



}

