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
  selector: 'app-activity-details',
  templateUrl: 'activity-details.page.html',
  styleUrls: ['activity-details.page.scss'],
  providers: [MemberApi, ActivityApi]
})
export class ActivityDetailsPage extends AppBase {

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
  }

  show=true;
  activity=null;

  // nT=new Date().getTime();
  // aT=new Date(this.activity.activityName).getTime()

  onMyLoad(){
    //参数
    this.params;
    
  }
  onMyShow(){
    this.getactivityinfo();
  }
 
  getactivityinfo(){
    var api=this.activityApi;
    api.activityinfo({id: this.params.id}).then(
      (activity)=>{
        console.log(activity+'aaaaa');
        this.activity=activity;
        var nT=new Date().getTime();
        var aT=new Date(activity.activitytime).getTime();
        console.log(aT)
        if(nT-aT<=0){
          this.show=true;
          console.log(activity.activityTime);
        }else{
          this.show=false;
          console.log(activity.activityTime);
        }
       
      }
    )
  }









  application(id){
  
    this.navigate("application",{id:id})
  }
 
}
