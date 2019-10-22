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
  selector: 'app-my-order',
  templateUrl: 'my-order.page.html',
  styleUrls: ['my-order.page.scss'],
  providers:[DindanApi]
})
export class MyOrderPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public dindanApi:DindanApi,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }
  order=[];
  qiehuan=0;
  onMyLoad(){
    //参数
    this.params;
  }
  onMyShow(){
  this.getmyorder();
  }
  getmyorder(){
   var api=this.dindanApi;
   api.myorder({}).then((order)=>{
     console.log(order);
   this.order=order;

   })


  }

  orderCancelled(id){
    this.navigate("order-cancelled",{id:id})
  }
  
  orderPayment(id){
    this.navigate("order-payment",{id:id})
  }

  orderSign(id){
    this.navigate("order-sign",{id:id})
  }

  orderComplete(id){
    this.navigate("order-complete",{id:id})
  }
}
