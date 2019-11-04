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
  selector: 'app-order-complete',
  templateUrl: 'order-complete.page.html',
  styleUrls: ['order-complete.page.scss'],
  providers:[DindanApi]
})
export class OrderCompletePage extends AppBase {

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
  orderinfo=null;
  getdindaninfo(){
    var api=this.dindanApi;
     api.myorderinfo({id:this.params.id}).then((orderinfo)=>{
     console.log(orderinfo);
      this.orderinfo=orderinfo;
     })
     
  
    }
  onMyLoad(){
    //参数
    this.params;
  }
  onMyShow(){
    this.getdindaninfo();
  }

  evaluate(){
    this.navigate("evaluate",{id:this.params.id})
  }

 
}
