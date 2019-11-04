import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { OrderApi } from 'src/providers/order.api';

@Component({
  selector: 'app-appointment-complete',
  templateUrl: 'appointment-complete.page.html',
  styleUrls: ['appointment-complete.page.scss'],
  providers:[OrderApi]
})
export class AppointmentCompletePage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public orderApi:OrderApi,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      this.order={photolist:[]};
  }

  onMyLoad(){
    //参数
    this.params;
    this.getorder();
  }
  onMyShow(){
    
  }
  order=null;

  getorder(){
    var api=this.orderApi;
     api.info({id:this.params.id}).then((order)=>{

      this.order=order;
      console.log(order);
         
     })
  

  }
 
}
