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
  selector: 'app-my-physical-examination',
  templateUrl: 'my-physical-examination.page.html',
  styleUrls: ['my-physical-examination.page.scss'],
  providers:[TijianApi]
})
export class MyPhysicalExaminationPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public tijianApi:TijianApi,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
  }
  tijianlist=[];
  qiehuan=0;
  onMyShow(){
     var api=this.tijianApi;

      api.wodetijian({}).then((tijianlist)=>{
        console.log(tijianlist);
     this.tijianlist=tijianlist;


      })

     
  }

  physicalExaminationCancelled(id){
    this.navigate("physical-examination-payment",{id:id})
  }

  physicalExaminationPayment(id){
    this.navigate("physical-examination-payment",{id:id})
  }
  
  

 
}
