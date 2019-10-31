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
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [MemberApi, ActivityApi]
})
export class Tab2Page extends AppBase {

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
  
  activity=[];
  activity1=[];
  activity2=[];
  show=false;

  onMyLoad(){
    //参数
    this.params;
  }
  onMyShow(){
    this.getactivity();
  }

  getactivity(){
    var api=this.activityApi
    api.getactivity({}).then((activity)=>{

      console.log(activity);
      this.activity=activity;
     var  activity1=[];
     var activity2=[];
      for(let i of activity){
        var aT=new Date(i.activitytime).getTime();
        var nT=new Date().getTime();
     
        if(nT-aT<=0){
          activity1.push(i);
        }
        else{
          activity2.push(i);
        }
      }
      console.log(activity1);
      console.log(activity2);
      this.activity1=activity1;
      this.activity2=activity2;
      
    })
  }

  


  activityDetails(i){

    this.navigate("activity-details",{id:i})
  }
}
