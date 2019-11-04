import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { WenzhangApi } from 'src/providers/wenzhang.api';

@Component({
  selector: 'app-wen-zhan-tui-son',
  templateUrl: 'wen-zhan-tui-son.page.html',
  styleUrls: ['wen-zhan-tui-son.page.scss'],
  providers:[WenzhangApi],
})
export class WenZhanTuiSonPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public wenzhangApi:WenzhangApi,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }
  wenzhangtype=[];
  wenzhang=[];
  wzhang=[];
  qiehuan=0;
  show=false;
  rad=1;
  onMyLoad(){
    //参数
    this.params;
  }
  onMyShow(){
    this.rad = 375 * 1.0 / screen.width;
    console.log(this.MemberInfo);
    this.getwenzhangtype();
    this.getwenzhangs();
  }


  getwenzhangtype(){

    var api=this.wenzhangApi;
    api.getwenzhangtype({}).then((wenzhangtype)=>{
      this.wenzhangtype=wenzhangtype;

      
    })
    
  }

  getwenzhangs(){
   
    var api=this.wenzhangApi;
    api.getwenzhang({}).then((wenzhang)=>{
      this.wenzhang=wenzhang;
      console.log(wenzhang)
    })
   
  }


  getwenzhang(type){
     console.log(type);

    var api=this.wenzhangApi;
    api.getwenzhang({wenzhang_type:type}).then((wenzhang)=>{
      this.wzhang=wenzhang;
      console.log("asdasds"+wenzhang);
    })

    
  }

 
}
