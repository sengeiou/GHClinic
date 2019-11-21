
import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-userpermission',
  templateUrl: './userpermission.page.html',
  styleUrls: ['./userpermission.page.scss'],
  providers:[MemberApi]
})
export class UserpermissionPage extends AppBase {

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
  userpermission=[];
  needlogin=false;
  onMyLoad() {
    //参数
    this.params;
  }
  onMyShow() {
    this.getuserpermission();   
  }
  getuserpermission(){
    var api=this.memberApi;
    api.getuserpermission({}).then((userpermission)=>{
      for(let up of userpermission){
        up.content = AppUtil.HtmlDecode( up.content);
      }
      this.userpermission=userpermission;
    })
  }
  

  

}