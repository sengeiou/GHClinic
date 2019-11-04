import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { ActivityApi } from 'src/providers/activity.api';

@Component({
  selector: 'app-successful-registration',
  templateUrl: 'successful-registration.page.html',
  styleUrls: ['successful-registration.page.scss'],
  providers: [MemberApi, ActivityApi]
})
export class SuccessfulRegistrationPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public activityApi:ActivityApi,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      this.activity={};
      this.activitysigninfo={};
  }

  activity=null;
  activitysigninfo=null;

  onMyLoad(){
    //参数
    this.params;
    this.activity=JSON.parse(this.params.activity);
  }
  onMyShow(){

    this.getactivitysigninfo();

  }

  getactivitysigninfo(){
    var api=this.activityApi;
    api.activitysigninfo({id:this.params.id}).then((activitysigninfo)=>{
      this.activitysigninfo=activitysigninfo;
      console.log(activitysigninfo)
    })
  }

  tab2(){
    this.backToUrl("tabs/tab2");
  }
  applicationDetails(id){
    this.navigate("application-details",{id:id})
  }


 
}
