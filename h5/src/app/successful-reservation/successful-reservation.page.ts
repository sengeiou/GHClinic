
import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-successful-reservation',
  templateUrl: './successful-reservation.page.html',
  styleUrls: ['./successful-reservation.page.scss'],
})
export class SuccessfulReservationPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
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
    var api=this.memberApi;
     api.getorder({id:this.params.id}).then((order)=>{

   this.order=order;
  console.log(order);
         
     })
  

  }

  onMyShow() {
      
    this.getorder();

  }
  
 
  

}

