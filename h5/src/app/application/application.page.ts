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
  selector: 'app-application',
  templateUrl: 'application.page.html',
  styleUrls: ['application.page.scss'],
  providers: [MemberApi, ActivityApi]
})
export class ApplicationPage extends AppBase {

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
      
  }
  xingming='';
  shoujihao='';
  activity=[];
  ages=[];
  id='';
  ages_id='';

  onMyLoad(){
    //参数
    this.params;
  }
  onMyShow(){

    this.getactivityinfo();
    this.getage();


  }
  adasd(){

    console.log(1231312312)
  }
  getactivityinfo(){
    var api=this.activityApi;
    api.activityinfo({id: this.params.id}).then(
      (activity)=>{
        this.activity=activity;
        this.id=activity.id;
      }
    )
  }

  getage(){
    var api=this.activityApi;
    api.getage({}).then(
      (ages)=>{
        this.ages=ages;
      }
    )
  }

  successfulRegistration(){

    var xingming=this.xingming;
    if (xingming == '') {
      return;
    }
    var shoujihao = this.shoujihao;
    if (shoujihao == '') {
      return;
    }
    var api=this.activityApi;
    console.log(this.ages_id);
    api.signactivity({activty_id: this.id, name: this.xingming, age_id: this.ages_id,
      phone: this.shoujihao, member_id: 1, status: 'M'}).then(
      (res)=>{
        console.log(res)
        if (res.code == 0) {
          
          this.navigate("successful-registration");
  
        }
      })
    
  }

 
}
