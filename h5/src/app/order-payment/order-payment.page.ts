import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { DindanApi } from 'src/providers/dindan.api';

@Component({
  selector: 'app-order-payment',
  templateUrl: 'order-payment.page.html',
  styleUrls: ['order-payment.page.scss'],
  providers:[DindanApi]
})
export class OrderPaymentPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public dindanApi:DindanApi,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }
   orderinfo=null;
  onMyLoad(){
    //参数
    this.params;
  }
  getdindaninfo(){
  var api=this.dindanApi;
   api.myorderinfo({id:this.params.id}).then((orderinfo)=>{
   console.log(orderinfo);
    this.orderinfo=orderinfo;
   })
   

  }

  quxiao(){

    console.log(1231321313);
    var api =this.dindanApi;
    api.quxiaoorder({id:this.params.id}).then(()=>{
       
         this.toast("取消成功");
         this.back();
  
  
    })
  
  
    }
  
  onMyShow(){
   this.getdindaninfo();
  }

 
}
