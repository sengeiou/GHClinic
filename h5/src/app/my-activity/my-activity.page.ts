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
  activity1=[];
  activityinfo=[];
  name='';
  id=1;

 
  


  // show=false
 
 

  onMyLoad(){
    //参数
    this.params;
  }
  onMyShow(){
    // this.getactivity();
    console.log(this.MemberInfo);
    this.activitysigninfo();
   
   
     
  }

  // getactivity(){
  //   var api=this.activityApi
  //   api.getactivity({}).then((activity)=>{
  //    var  activity1=[];
  //    var activity2=[];
  //     for(let i of activity){
  //       var aT=new Date(i.activityTime).getTime();
  //       var nT=new Date().getTime();
  //       if(nT-aT<=0){
  //         activity1.push(i);
  //       }      
  //     }
  //     this.activity1=activity1;     
  //   })
  // }

  // getactivity(){
  //   var api=this.activityApi
  //   api.getactivity({}).then((activity)=>{
  //    var  activity1=[];
  //    var activity2=[];
  //     for(let i of activity){
  //       var aT=new Date(i.activityTime).getTime();
  //       var nT=new Date().getTime();
  //       if(nT-aT<=0){
  //         activity1.push(i);
  //         for(let ii of i.activityName){
  //           console.log(ii)
  //           api.activitysigninfo({id:25}).then((activityinfo)=>{
  //                 if(activityinfo.id){
  //                   this.activityinfo=activityinfo;
  //                   console.log(activityinfo);
  //                 }
  //               })
  //         }
  //       }      
  //     }
  //     this.activity1=activity1;     
  //   })
  // }





  

  activitysigninfo(){
    var api=this.activityApi;
    api.huoquactivityinfo({}).then((activityinfo)=>{
      this.activityinfo=activityinfo;
      console.log(activityinfo);
    })
  }


  applicationDetails(i){
    this.navigate("application-details",{id:i});
  }
}
