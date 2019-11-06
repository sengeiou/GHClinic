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
  selector: 'app-my-appointment',
  templateUrl: 'my-appointment.page.html',
  styleUrls: ['my-appointment.page.scss'],
  providers:[OrderApi]
})
export class MyAppointmentPage extends AppBase {

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
  qiehuan=0;
  yuyue=[];
  onMyLoad(){
    //参数
    this.params;
  }
  getyuyue(){
  var api=this.orderApi;
    api.wodeyuyue({}).then((yuyue)=>{
      console.log(yuyue);
      this.yuyue=yuyue;

    })

  }
  onMyShow(){
    this.getyuyue();

  }
  appointmentCancelled(id){
    this.navigate("appointment-cancelled",{id:id})
  }
  appointmentPayment(id){
    this.navigate("appointment-payment",{id:id})
  }
  

 
}
