import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { OrderApi } from 'src/providers/order.api';
declare let WeixinJSBridge: any;
@Component({
  selector: 'app-appointment-payment',
  templateUrl: 'appointment-payment.page.html',
  styleUrls: ['appointment-payment.page.scss'],
  providers:[OrderApi]
})
export class AppointmentPaymentPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public orderApi:OrderApi,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
  }
  xianqin=null;
  onMyShow(){
    
     var api=this.orderApi;
      api.info({id:this.params.id}).then((xianqin)=>{
        console.log(xianqin);
        this.xianqin=xianqin

      })
  

  }
  quxiao() {
    var api = this.orderApi;

    api.quxiao({ id: this.params.id }).then((res) => {

      this.back();

    })

  }
  prepay1() {
    this.showConfirm("确定支付吗", (ret) => {
      if (ret) {
        var api = this.orderApi;
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
