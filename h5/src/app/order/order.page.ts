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
import { MarketApi } from 'src/providers/market.api';
declare let WeixinJSBridge: any;
@Component({
  selector: 'app-order',
  templateUrl: 'order.page.html',
  styleUrls: ['order.page.scss'],
  providers: [DindanApi, WechatApi,MarketApi]
})
export class OrderPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public dindanApi: DindanApi,
    public wechatApi: WechatApi,
    public marketApi:MarketApi,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  gouwuche = [];
  zonjia = 0;
  jian = 0;
  beizhu="";
  isf=0;
  qwe = "请填写买家留言";
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
      var jian = 0;
      gouwuche.map((item) => {

        if (item.selected_value == 'Y') {
          jiage += item.num * item.drugs_price;
          jian += parseInt(item.num);
        }


      })
   this.isf=1;
      this.zonjia = jiage;
      this.jian = jian;
      this.gouwuche = gouwuche;

    })


  }
  getshanpin(){
    var api=this.marketApi;
     api.drugsinfo({id:this.params.id}).then((res)=>{
             this.gouwuche=[];
           this.gouwuche.push(res);  
           this.isf=2;
   console.log(this.gouwuche);

     }) 
  
     

  }
  onMyShow() {
    var id=this.params.id;
    if(id==undefined)
    {
    this.getgouwuche();

  }
    else{
     
      this.getshanpin()



  }
  }
  address() {

    this.navigate("address");

  }
  successfulTrade() {

  
   

    var wechatapi = this.wechatApi;
    var api = this.dindanApi;


    if(this.params.id!=undefined)
    {
    api.addgouwuche({ drugs_id: this.params.id, num: 1, selected: 'Y', status: 'F' }).then((res) => {
          
      console.log(res);
      if(res.code==0)
      {
        api.createorder({lingshi:1,beizhu:this.beizhu}).then((res) => {

          wechatapi.prepay({ id: res.return, h5: "Y" }).then((payret) => {
            if (payret.code != 0) {
              this.showAlert(payret.result);
              return;
            }
    
            console.log(payret);
            //wx.requestPayment(payret)
    
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest', payret,
              (res) => {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
    
    
    
                  this.navigate("successful-trade");
    
    
    
                } else {
                  this.showAlert(res.errMsg);
                }
              });
          });
    
          console.log(res);
    
        })

      }
   

        
    })
  }
  else{



    api.createorder({beizhu:this.beizhu}).then((res) => {

      wechatapi.prepay({ id: res.return, h5: "Y" }).then((payret) => {
        if (payret.code != 0) {
          this.showAlert(payret.result);
          return;
        }

        console.log(payret);
        //wx.requestPayment(payret)

        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', payret,
          (res) => {
            if (res.err_msg == "get_brand_wcpay_request:ok") {



              this.navigate("successful-trade");



            } else {
              this.showAlert(res.errMsg);
            }
          });
      });

      console.log(res);

    })
  }

    return

  }

}
