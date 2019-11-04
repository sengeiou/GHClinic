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
  selector: 'app-application-details',
  templateUrl: 'application-details.page.html',
  styleUrls: ['application-details.page.scss'],
  providers:[MemberApi,ActivityApi]
})
export class ApplicationDetailsPage extends AppBase {

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
    this.activity='';
  }
  activity=null;
  // memberinfo=[]
  activityinfo=[];
  status='';


  

  onMyLoad(){
    //参数
    this.params;
  }
  onMyShow(){
    this.activitysigninfo();
    // console.log(this.activityinfo)
    console.log(this.MemberInfo); 
   
  }

  

  activitysigninfo(){
    var api=this.activityApi;
    api.activitysigninfo({id: this.params.id}).then(
      (activityinfo)=>{
        this.activityinfo=activityinfo;
        console.log(activityinfo);
        
      
      }
    )
  }

  confirmCancellation(){
    console.log("已取消");

    var api=this.activityApi;
    api.cancelactivity({id:this.params.id}).then((res)=>{
      this.back();
    })
  }

  activityInformation(id){
    this.navigate("activity-information",{id:id})
  }

 
  
 
}
