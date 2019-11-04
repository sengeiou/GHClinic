
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
  selector: 'app-physical-examination',
  templateUrl: './physical-examination.page.html',
  styleUrls: ['./physical-examination.page.scss'],
  providers: [SetmealApi]
})
export class PhysicalExaminationPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public setmealApi: SetmealApi,
    public memberApi: MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  clinic() {

  }
  onMyLoad() {
    //参数
    this.params;
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
  hospitalinfo() {

    var api = this.memberApi;
    api.hospitalinfo({ id: this.params.yiyuanid }).then((hospital) => {
      console.log("hahah");
      console.log(hospital);
      this.hospital = hospital;
      this.getsetmeal(hospital.id);

    })

  }
  onMyShow() {

    this.hospitalinfo();

    this.fuwuleibie = this.params.fuwuleibie;
    var d = new Date(this.params.riqi);
    this.jintian = { d: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(), d2: (d.getMonth() + 1), d3: d.getDate(), d4: this.getxinqi(d), date: d };
    this.xzdate = this.jintian.date;
    this.qiansantian = this.getQianDay(this.params.riqi);
    console.log(this.qiansantian);
    this.housantian = this.getNextDay(this.params.riqi);
    console.log(this.housantian);
  }
  getsetmeal(id) {
    var api = this.setmealApi;
    api.getsetmeal({ hospital: id }).then((setmeal) => {
      console.log("套餐");
      console.log(setmeal);
      this.taocan = setmeal;

    })

  }
  clickdate(d) {

    this.xzdate = d.date;



  }
  detail(id) {
    this.navigate("detail", { riqi: this.xzdate, id: id, yiyuanid: this.params.yiyuanid })
  }



  comprehensive = () => {
    var divOne = document.getElementById('divOne')
    var divTwo = document.getElementById('divTwo')
    if (divOne.style.height === '246px') {
      divOne.style.height = 0 + 'px';
      divOne.style.display = "none";
      divTwo.style.display = "none";
      divTwo.style.opacity = '0';
    } else {
      divOne.style.height = 246 + 'px';
      divOne.style.display = "block";
      divTwo.style.display = "block";
      divTwo.style.opacity = '0.6';
    }

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

}

