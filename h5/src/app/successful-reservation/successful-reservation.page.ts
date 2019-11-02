
import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { DindanApi } from 'src/providers/dindan.api';
import { OrderApi } from 'src/providers/order.api';

@Component({
  selector: 'app-successful-reservation',
  templateUrl: './successful-reservation.page.html',
  styleUrls: ['./successful-reservation.page.scss'],
  providers:[OrderApi]
})
export class SuccessfulReservationPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public orderApi:OrderApi,
    public memberApi: MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;
      this.order={};
  }
  order=null;
  onMyLoad() {
    //参数
    this.params;
  }
  getorder(){
    var api=this.orderApi;
     api.info({id:this.params.id}).then((order)=>{

      this.order=order;
      console.log(order);
         
     })
  

  }

  onMyShow() {
      
    this.getorder();

  }

 

  appointmentComplete(){
    this.navigate("appointment-complete",{id:this.params.id})
  }
  
 tab1(){
   this.backToUrl("tabs/tab1");
 }
  

}

