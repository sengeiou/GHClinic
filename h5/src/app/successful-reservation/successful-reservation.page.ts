
import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { DindanApi } from 'src/providers/dindan.api';

@Component({
  selector: 'app-successful-reservation',
  templateUrl: './successful-reservation.page.html',
  styleUrls: ['./successful-reservation.page.scss'],
  providers:[DindanApi]
})
export class SuccessfulReservationPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public dindanApi:DindanApi,
    public memberApi: MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  hospital=null;
  order=null;
  onMyLoad() {
    //参数
    this.params;
    this.hospital=JSON.parse(this.params.hospital);
    console.log(this.hospital);
  }
  getorder(){
    var api=this.dindanApi;
     api.myorder({id:this.params.id}).then((order)=>{

   this.order=order;
  console.log(order);
         
     })
  

  }

  onMyShow() {
      
    this.getorder();

  }

 

  appointmentComplete(){
    this.navigate("appointment-complete")
  }
  
 tab1(){
   this.backToUrl("tabs/tab1");
 }
  

}

