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
  selector: 'app-my-news',
  templateUrl: 'my-news.page.html',
  styleUrls: ['my-news.page.scss'],
  providers:[ActivityApi]
})
export class MyNewsPage extends AppBase {

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

  day=new Date().getDate();
  month=new Date().getMonth()+1;
  year=new Date().getFullYear();
  
  ai=0;
  huodong=[];
  onMyLoad(){
    //参数
    this.params;
  }

  onMyShow(){

    console.log(this.day);
    this.huoquactivityinfo();

  }

  huoquactivityinfo(){
    var huodong=[];
    var api=this.activityApi;
    api.huoquactivityinfo({}).then((activityinfo)=>{


        for(let aa of activityinfo){
          if(aa.zhuangtai=='A'){
            
              huodong.push('您添加了报名活动信息');
             
            
          }
          else{
            
              huodong.push('您取消了报名活动信息')
              
            }
            this.ai=aa.activty_id;
          
        }
        this.huodong=huodong;
        console.log(this.huodong)
     
      
    })
  }

  ad(){
    this.navigate("application-details",{id:this.ai})
  }
  

 
}
