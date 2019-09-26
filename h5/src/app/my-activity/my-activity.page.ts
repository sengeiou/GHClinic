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
  // show=false
 


  onMyLoad(){
    //参数
    this.params;
  }
  onMyShow(){
    this.getactivity();
    console.log(this.MemberInfo)
    // this.getactivitysigninfo()
    
  }

  getactivity(){
    var api=this.activityApi
    api.getactivity({}).then((activity)=>{
    
     var  activity1=[];
     var activity2=[];
      for(let i of activity){
        var aT=new Date(i.activityTime).getTime();
        var nT=new Date().getTime();
        if(nT-aT<=0){
          activity1.push(i);
        }
       
      }
      this.activity1=activity1;
      
    
      
    })
  }



 



  applicationDetails(i){
    this.navigate("application-details",{id:i});
  }
  
 
}
