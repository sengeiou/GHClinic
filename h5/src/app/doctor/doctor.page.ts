
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
  this.danqianyuyue={};
  }

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
    this.jt = 3;
    this.getdoctoinfo();
    this.hospital = JSON.parse(this.params.hospital);
    console.log("哈HAHAHAH");
    console.log(this.params.riqi);
    var d = new Date(this.params.riqi);


    this.jintian = {
      d1: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(),
      d: d.getFullYear() + "-" + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + "-" + d.getDate(), d2:
        (d.getMonth() + 1), d3: d.getDate(), d4: this.getxinqi(d), date: d
    };
    this.qiansantian = this.getQianDay(this.params.riqi);
    console.log(this.qiansantian);
    this.housantian = this.getNextDay(this.params.riqi);
    console.log(this.housantian);


    this.getyishenpaiban(this.qiansantian[2].d1, this.housantian[2].d1);

  }
  appointment(qqq) {
    if (qqq == undefined) {
      return
    }

    this.navigate("appointment", { date: JSON.stringify(qqq), yishen: JSON.stringify(this.doctorinfo), hospital_id:this.hospital.id })
  }
  paiban = [];
  getyishenpaiban(sdate, edate) {

    console.log(sdate, edate);
    var api = this.doctorApi;

    api.schedule({ doctor_id: this.params.id, sdate: sdate, edate: edate }).then((paiban) => {

      console.log(paiban);
      this.paiban = paiban;
      this.czdate();

    })


  }
  danqianyuyue = null;
  dlist = [];
  czdate() {
    console.log("哈哈哈");
    var qdate = this.qiansantian;
    var jdate = this.jintian;
    var hdate = this.housantian;
    var paiban = Object.values(this.paiban);
    var dlist = [];
    qdate.reverse();
    qdate.map((item) => {
      dlist.push(item);
    })

    dlist.push(jdate);
    hdate.map((item) => {
      dlist.push(item);
    })
    console.log(dlist);
    console.log(paiban);

    for (var i = 0; i < dlist.length; i++) {
      dlist[i].rq = [];

      var daylist = this.timeline(dlist[i].date);

      for (var d = 0; d < daylist.length; d++) {
        dlist[i].rq.push(daylist[d]);

        for (var j = 0; j < paiban.length; j++) {
          if (j != paiban.length) {

          }
          if (dlist[i].d == paiban[j].fdate) {

            if ((dlist[i].rq[d].hour + ':' + dlist[i].rq[d].minute) == paiban[j].ftime) {
              console.log("成功");
              console.log((dlist[i].rq[d].hour + ':' + dlist[i].rq[d].minute));
              console.log(paiban[j].ftime);

              dlist[i].rq[d].qwe = paiban[j];

            }
            else {

            }
          }


        }

      }





    }

    this.danqianyuyue = dlist[3];
    this.dlist = dlist;
    console.log(dlist);



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

  getNextDay(d) {
    var qiansantian = [];
    var q = d;
    d = new Date(q).getTime();
    d = +d + 1000 * 60 * 60 * 24;
    d = new Date(d);
    var sdata = { d1: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(), d: d.getFullYear() + "-" + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + "-" + d.getDate(), d2: (d.getMonth() + 1), d3: d.getDate(), d4: this.getxinqi(d), date: d }
    qiansantian[0] = sdata;

    d = new Date(q).getTime();
    d = +d + 2000 * 60 * 60 * 24;
    d = new Date(d);
    var sdata = { d1: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(), d: d.getFullYear() + "-" + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + "-" + d.getDate(), d2: (d.getMonth() + 1), d3: d.getDate(), d4: this.getxinqi(d), date: d }
    qiansantian[1] = sdata;


    d = new Date(q).getTime();
    d = +d + 3000 * 60 * 60 * 24;
    d = new Date(d);
    var sdata = { d1: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(), d: d.getFullYear() + "-" + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + "-" + d.getDate(), d2: (d.getMonth() + 1), d3: d.getDate(), d4: this.getxinqi(d), date: d }
    qiansantian[2] = sdata;




    return qiansantian;
  }

  getQianDay(d) {
    var qiansantian = [];
    var q = d;
    d = new Date(q).getTime();
    d = +d - 1000 * 60 * 60 * 24;
    d = new Date(d);
    var sdata = { d1: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(), d: d.getFullYear() + "-" + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + "-" + d.getDate(), d2: (d.getMonth() + 1), d3: d.getDate(), d4: this.getxinqi(d), date: d }
    qiansantian[0] = sdata;

    d = new Date(q).getTime();
    d = +d - 2000 * 60 * 60 * 24;
    d = new Date(d);
    var sdata = { d1: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(), d: d.getFullYear() + "-" + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + "-" + d.getDate(), d2: (d.getMonth() + 1), d3: d.getDate(), d4: this.getxinqi(d), date: d }
    qiansantian[1] = sdata;


    d = new Date(q).getTime();
    d = +d - 3000 * 60 * 60 * 24;
    d = new Date(d);
    var sdata = { d1: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(), d: d.getFullYear() + "-" + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + "-" + d.getDate(), d2: (d.getMonth() + 1), d3: d.getDate(), d4: this.getxinqi(d), date: d }
    qiansantian[2] = sdata;




    return qiansantian;
  }


  timeline(sdate: Date) {
    var now = new Date();
    var nowtime = now.getTime();

    var timeline = [];
    for (var i = 8; i <= 19; i++) {
      var vi = i > 9 ? i : "0" + i;

      var d1 = new Date(sdate.getFullYear(), sdate.getMonth(), sdate.getDate(), i, 29, 59);
      var d1time = d1.getTime();


      timeline.push({
        hour: vi,
        minute: "00",
        pass: d1time < nowtime,
        passt: d1time + "<" + nowtime
      })
      var d2 = new Date(sdate.getFullYear(), sdate.getMonth(), sdate.getDate(), i, 59, 59);
      var d2time = d2.getTime();
      timeline.push({
        hour: vi,
        minute: "30",
        pass: d2time < nowtime,
        passt: d2time + "<" + nowtime,
      })
    }
    return timeline;
  }
}
