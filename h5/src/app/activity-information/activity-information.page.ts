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
  selector: 'app-activity-information',
  templateUrl: 'activity-information.page.html',
  styleUrls: ['activity-information.page.scss'],
  providers:[ActivityApi]
})
export class ActivityInformationPage extends AppBase {

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
    this.activityinfo=null
  }
  i=0;
  activityinfo=null;

  onMyLoad(){
    //参数
    this.params;
  }
  onMyShow(){
    this.getactivitysigninfo();
  }


  getactivitysigninfo(){
    var api=this.activityApi;
    api.activitysigninfo({id: this.params.id}).then(
      (activityinfo)=>{
        this.activityinfo=activityinfo;
        console.log(activityinfo)
        this.i=activityinfo.activty_id;
      
      }
    )
  }



  application(){
    var i=this.i;
    this.navigate("application",{id:i});
  }
 
  
 
}
