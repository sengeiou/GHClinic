import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { DindanApi } from 'src/providers/dindan.api';
import { WechatApi } from 'src/providers/wechat.api';
declare let WeixinJSBridge: any;
@Component({
  selector: 'app-order',
  templateUrl: 'order.page.html',
  styleUrls: ['order.page.scss'],
  providers: [DindanApi,WechatApi]
})
export class OrderPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public dindanApi: DindanApi,
    public wechatApi:WechatApi,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  gouwuche = [];
  zonjia = 0;
  jian=0;
  qwe="请填写买家留言";
  onMyLoad() {
    //参数
    this.params;
  }

  getgouwuche() {
    var api = this.dindanApi;

    api.getgouwuche({ selected: 'Y' }).then((gouwuche) => {
      console.log("哈哈哈哈哈哈哈哈");
      console.log(gouwuche);
      var jiage = 0;
    var jian=0;
      gouwuche.map((item) => {

        if (item.selected_value == 'Y') {
          jiage += item.num * item.drugs_price;
           jian+= parseInt(item.num);
        }


      })

      this.zonjia = jiage;
  this.jian=jian;
      this.gouwuche = gouwuche;

    })


  }

  onMyShow() {
    this.getgouwuche();
  }
  address() {

    this.navigate("address");

  }
  successfulTrade() {
     var wechatapi=this.wechatApi;
    var api=this.dindanApi;
    
      api.createorder({}).then((res)=>{
            
        wechatapi.prepay({ id: res.id, h5: "Y" }).then((payret) => {
          if (payret.code != 0) {

            this.showAlert(payret.result);
            return;
          }

          console.log(payret);
          //wx.requestPayment(payret)

          WeixinJSBridge.invoke(
            'getBrandWCPayRequest', payret,
            (res) => {
              if(res.err_msg == "get_brand_wcpay_request:ok" ){


              
                this.navigate("successful-trade");
              


              } else {
                this.showAlert(res.errMsg);
              }
            });
        });

       console.log(res);

      })
      
   
   return
 
  }

}
