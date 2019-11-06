import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { TijianApi } from 'src/providers/tijian.api';

@Component({
  selector: 'app-physical-examination-payment',
  templateUrl: 'physical-examination-payment.page.html',
  styleUrls: ['physical-examination-payment.page.scss'],
  providers:[TijianApi]
})
export class PhysicalExaminationPaymentPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public tijianApi:TijianApi,
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
  xianqin=null;
  onMyShow(){
    
     var api=this.tijianApi;
      api.info({id:this.params.id}).then((xianqin)=>{
        console.log(xianqin);
        this.xianqin=xianqin

      })
  

  }

  quxiao()
  {
    var api=this.tijianApi;
      
     api.quxiaoyuyue({id:this.params.id}).then((res)=>{

         this.back();

     })

  }

 
}
