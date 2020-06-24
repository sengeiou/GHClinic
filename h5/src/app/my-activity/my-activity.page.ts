import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { ActivityApi } from 'src/providers/activity.api';
import { ApiConfig } from '../api.config';

@Component({
  selector: 'app-my-activity',
  templateUrl: 'my-activity.page.html',
  styleUrls: ['my-activity.page.scss'],
  providers:[MemberApi,ActivityApi]
})
export class MyActivityPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public activityApi: ActivityApi,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }


  // phone=''
 
  activityinfo1=[];
  activityinfo2=[];
  activityinfo3=[];
  qiehuan=0;



 
  


  // show=false
 
 

  onMyLoad(){
    //参数
    this.params;
  }
  onMyShow(){

    console.log(this.MemberInfo);
    this.huoquactivityinfo();
   
   
     
  }


  huoquactivityinfo(){
    var activityinfo1=[];
    var activityinfo2=[];
    var activityinfo3=[];
    var api=this.activityApi;
    api.huoquactivityinfo({}).then((activityinfo)=>{
      for(let ai of activityinfo){
        var aT=new Date(ai.activity_activitytime.replace(/-/g,'/')).getTime();
        //console.log(ai.activty_activityTime)
        var nT=new Date().getTime();
        if(nT-aT<=0){
          activityinfo1.push(ai)
          console.log(ai)
          if(ai.zhuangtai=='A'){
            activityinfo2.push(ai)
            console.log(ai)
          }
          if(ai.zhuangtai=='S'){
            activityinfo3.push(ai)
            console.log(ai)
          }
        }
      }
      console.log(activityinfo1);
      console.log(123132)
      this.activityinfo1=activityinfo1;
      this.activityinfo2=activityinfo2;
      this.activityinfo3=activityinfo3;
    })
  
  }


  applicationDetails(i){
    this.navigate("application-details",{id:i});
  }
}
