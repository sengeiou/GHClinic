import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { InstApi } from 'src/providers/inst.api';


@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.page.html',
  styleUrls: ['./aboutus.page.scss'],
  providers:[MemberApi,Clipboard,InstApi]
})
export class AboutusPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private clipboard: Clipboard,
    private instApi: InstApi,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
  }
  email = ""
  phone=""
  onMyShow(){
      this.instApi.aboutuslist({}).then((aboutus:any)=>{
        console.log(aboutus)
        aboutus.filter(item=>{
          this.email = item.email
          this.phone = item.phone
        })
      })
      console.log(this.InstInfo.version)
  }

  copy() {
    console.log()
    this.clipboard.copy(this.email);
    this.toast('已复制')
  }

  call(){
    let tel_str = "tel:"+this.phone;
    document.location.href=tel_str;
  }

}
