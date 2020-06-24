import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { TijianApi } from 'src/providers/tijian.api';
declare let WeixinJSBridge: any;
@Component({
  selector: 'app-physical-examination-payment',
  templateUrl: 'physical-examination-payment.page.html',
  styleUrls: ['physical-examination-payment.page.scss'],
  providers: [TijianApi]
})
export class PhysicalExaminationPaymentPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public tijianApi: TijianApi,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  nt;
  ot;
  show=true;
  onMyLoad() {
    //参数
    this.params;
  }
  xianqin = null;
  onMyShow() {

    var api = this.tijianApi;
    api.info({ id: this.params.id }).then((xianqin) => {
      console.log(xianqin);
      this.xianqin = xianqin
      this.ot=new Date(xianqin.ordertime.replace(/-/g,'/')).getTime();
      this.nt=new Date().getTime();
      if(xianqin.orderstatus=='B'){
        if(this.ot-this.nt>=24*60*60*1000){
          this.show=true;
        }else{this.show=false;}
      }

    })


  }

  quxiao() {
    var api = this.tijianApi;

    if(this.show==true){
      api.quxiaoyuyue({ id: this.params.id }).then((res) => {

       this.navigate('tabs/tab2');
  
      })
    }else{
      this.toast('取消预约需提前一天通知')
    }

  }
  prepay1() {

  

    this.showConfirm("确定支付吗", (ret) => {
      if (ret) {
        var api = this.tijianApi;
        api.prepay({
          id: this.params.id, openid: this.openid
        }).then((res) => {

          if (res.code == "233") {
            var order_id = res.return["order_id"];
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest', res.return,
              (res) => {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                  this.onMyShow();
                } else {

                  this.toast(res.errMsg);
                }
              });
          } else {
            this.toast(res.result);
          }



        })

      }
      else {


      }


    })

  }

}
