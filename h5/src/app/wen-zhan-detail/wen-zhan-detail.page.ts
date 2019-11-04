import { Component, ViewChild, Query } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { WenzhangApi } from 'src/providers/wenzhang.api';

@Component({
  selector: 'app-wen-zhan-detail',
  templateUrl: './wen-zhan-detail.page.html',
  styleUrls: ['./wen-zhan-detail.page.scss'],
  providers:[MemberApi,WenzhangApi]
})
export class WenZhanDetailPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public wenzhangApi: WenzhangApi,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
  }
  wenzhangdetail = {};
  content=""
  onMyShow(){
    
    this.wenzhangApi.wenzhangdetail({id:this.params.id}).then((wenzhangdetail)=>{
      console.log(wenzhangdetail)
      // wenzhangdetail.content = wenzhangdetail.content.replace(/&lt;/g,'')
      // wenzhangdetail.content = htmlspecialchars_decode()
      this.wenzhangdetail = wenzhangdetail
      
      
    })
  }
}
