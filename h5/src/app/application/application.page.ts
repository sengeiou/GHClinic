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
 

  onMyLoad(){
    //参数
    this.params;
  }
  onMyShow(){

    this.getactivityinfo();
    this.getage();


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
  age=null;
  aa(e){
    console.log(this.age);
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

    api.signactivity({activty_id: this.id, name: xingming, age_id: this.age,
      phone: shoujihao, member_id: 1, status: 'M'}).then(
      (res)=>{
        console.log(res)
        if (res.code == 0) {
          
          this.navigate("successful-registration",{id:res.return, activity: JSON.stringify(this.activity)});
  
        }
      })
    
  }

 
}
