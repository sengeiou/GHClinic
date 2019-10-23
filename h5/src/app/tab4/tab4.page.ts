import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
  }
  onMyShow(){
     console.log(this.MemberInfo)
  }


  
  address(){
    this.navigate("address");
  }
  gouwuche(){

   this.navigate("carts");

  }
  myOrder(){
    this.navigate("my-order");
  }

  MyAppointment(){
    this.navigate("my-appointment");
  }

  myNews(){
    this.navigate("my-news");
  }

  myPhysicalExamination(){
    this.navigate("my-physical-examination");
  }

  myActivity(){
    this.navigate("my-activity");
  }


  myCustomer(){
    this.navigate("my-customer");
  }
 
  wenzhantuison(){
    this.navigate("wen-zhan-tui-son")
  }
 
}
