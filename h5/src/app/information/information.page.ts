
import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }

  onMyLoad() {
    //参数
    this.params;
    console.log("hahah");
    console.log(this.params.riqi);
  }
  jt = 3;
  qiansantian = [];
  housantian = [];
  jintian = null;
  xzdate=null;
  yiyuanid=null;
  fuwuleibie=null;
  hospital=null;
  hospitalinfo(){
   
   var api=this.memberApi;
   api.hospitalinfo({id:this.params.yiyuanid}).then((hospital)=>{
       console.log("hahah");
       console.log(hospital);
      this.hospital=hospital;


   })

  

  }

  onMyShow() {
    this.getdoctor();
        this.hospitalinfo();
      this.fuwuleibie=this.params.fuwuleibie;
     
    var d = new Date(this.params.riqi);

     
    this.jintian = { d: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(), d2: (d.getMonth() + 1), d3: d.getDate(), d4: this.getxinqi(d),date:d };
    this.xzdate=this.jintian.date;
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

    this.xzdate=d.date;
  
  }
  getdoctor() {
    var api = this.memberApi;
    api.getdoctor({}).then((doctorlist) => {
      console.log(doctorlist);
      this.doctorlist = doctorlist;
    })
  }
  doctor(id) {
    this.navigate("doctor",{ riqi:this.xzdate,id:id,hospital: JSON.stringify(this.hospital)})
  }
  clinic() {
    this.navigate("clinic")
  }
  getNextDay(d) {
    var qiansantian = [];
    var q = d;
    d = new Date(q).getTime();
    d = +d + 1000 * 60 * 60 * 24;
    d = new Date(d);
    var sdata = { d: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(), d2: (d.getMonth() + 1), d3: d.getDate(), d4: this.getxinqi(d) ,date:d}
    qiansantian[0] = sdata;

    d = new Date(q).getTime();
    d = +d + 2000 * 60 * 60 * 24;
    d = new Date(d);
    var sdata = { d: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(), d2: (d.getMonth() + 1), d3: d.getDate(), d4: this.getxinqi(d),date:d }
    qiansantian[1] = sdata;


    d = new Date(q).getTime();
    d = +d + 3000 * 60 * 60 * 24;
    d = new Date(d);
    var sdata = { d: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(), d2: (d.getMonth() + 1), d3: d.getDate(), d4: this.getxinqi(d) ,date:d}
    qiansantian[2] = sdata;




    return qiansantian;
  }

  getQianDay(d) {
    var qiansantian = [];
    var q = d;
    d = new Date(q).getTime();
    d = +d - 1000 * 60 * 60 * 24;
    d = new Date(d);
    var sdata = { d: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(), d2: (d.getMonth() + 1), d3: d.getDate(), d4: this.getxinqi(d),date:d }
    qiansantian[0] = sdata;

    d = new Date(q).getTime();
    d = +d - 2000 * 60 * 60 * 24;
    d = new Date(d);
    var sdata = { d: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(), d2: (d.getMonth() + 1), d3: d.getDate(), d4: this.getxinqi(d),date:d }
    qiansantian[1] = sdata;


    d = new Date(q).getTime();
    d = +d - 3000 * 60 * 60 * 24;
    d = new Date(d);
    var sdata = { d: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(), d2: (d.getMonth() + 1), d3: d.getDate(), d4: this.getxinqi(d),date:d }
    qiansantian[2] = sdata;




    return qiansantian;
  }


}
