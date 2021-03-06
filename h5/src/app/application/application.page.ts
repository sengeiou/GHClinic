import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { ActivityApi } from 'src/providers/activity.api';
// import { ConsoleReporter } from 'jasmine';
declare let WeixinJSBridge: any;
@Component({
  selector: 'app-application',
  templateUrl: 'application.page.html',
  styleUrls: ['application.page.scss'],
  providers: [MemberApi, ActivityApi]
})
export class ApplicationPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public activityApi: ActivityApi,
    public memberApi: MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;
    this.activity = {};
  }
  xingming = '';
  shoujihao = '';
  activity = null;
  ages = [];
  aactivity = [];
  id = '';


  fanhui(){
    this.navigate('tabs/tab2')
  }

  onMyLoad() {
    //参数
    this.params;
    this.needlogin=true;
  }
  onMyShow() {
    console.log('aaaaaaaaa' + this.params.id)
    this.getactivityinfo();
    this.getage();
  }






  getactivityinfo() {
    var api = this.activityApi;
    api.activityinfo({ id: this.params.id }).then(
      (activity) => {
        this.activity = activity;
        this.id = activity.id;
        console.log('aaaaaaaaa' + this.params.id)
      }
    )
  }

  getage() {
    var api = this.activityApi;
    api.getage({}).then(
      (ages) => {
        this.ages = ages;
      }
    )
  }
  age = null;
  aa(e) {
    console.log(this.age);
  }




  successfulRegistration() {
    var time = new Date();
    var id = this.id;
    var xingming = this.xingming;
    if (xingming == '') {
      this.toast("请输入姓名");
      return;
    }
    var shoujihao = this.shoujihao;
    if (shoujihao == '') {
      this.toast("请输入手机号");
      return;
    }

    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(shoujihao)) {
      this.toast("手机号格式不正确");
      return
    }




    var api = this.activityApi;

    var canshu = { activty_id: id, name: xingming, age_id: this.age, phone: shoujihao, zhuangtai: 'A', status: 'A', openid: this.openid,read_status:'B',read_status1:'B' }
    var canshu1 = { activty_id: id, name: xingming, age_id: this.age, phone: shoujihao, zhuangtai: 'A', status: 'A', openid: this.openid,read_status:'B',read_status1:'B' }

    api.signactivity(this.params.id == undefined ? canshu : canshu1).then(
      (res) => {
        console.log(res)
        if (res.code == 0) {

          this.navigate("successful-registration", { id: res.return, activity: JSON.stringify(this.activity) });

        }
        if (res.code == "233") {
          var order_id = res.return["order_id"];
          WeixinJSBridge.invoke(
            'getBrandWCPayRequest', res.return,
            (asd) => {
               //alert(asd);
              if (asd.err_msg == "get_brand_wcpay_request:ok") {
               // alert(123);
                this.navigate("successful-registration", { id:order_id, activity: JSON.stringify(this.activity) });
              } else {
              //  alert(456);
                this.toast(asd.errMsg);
              }
            });


        }
        if (res.code == -2) {

          this.toast("超出限制");
        }

      })
  }

  
}
