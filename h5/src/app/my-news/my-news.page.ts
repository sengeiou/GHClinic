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
  show=0;

  
  id=0;
  day;
  month;
  year;

  

  huodong=[];
  onMyLoad(){
    //参数
    this.params;
  }

  onMyShow(){

    console.log(this.show);
    this.huoquactivityinfo();

  }

  huoquactivityinfo(){
    var huodong=[];
    var api=this.activityApi;
    api.huoquactivityinfo({}).then((activityinfo)=>{


        for(let aa of activityinfo){
          if(aa.zhuangtai=='A'){
            
              huodong.push('您已成功报名'+aa.activity_activityname+'的活动，请准时参加。');
              console.log(aa);
              this.day=new Date(aa.time).getDate();
              this.month=new Date(aa.time).getMonth()+1;
              this.year=new Date(aa.time).getFullYear();
              this.id=aa.id;
              
             
             
            
          }
          else{
            
              huodong.push('您取消了报名'+aa.activity_activityname+'的活动。')
              console.log(aa);
              this.day=new Date(aa.time).getDate();
              this.month=new Date(aa.time).getMonth()+1;
              this.year=new Date(aa.time).getFullYear();
              this.id=aa.id;
              
         
              
              
            }
           
          
        }
        this.huodong=huodong;
        console.log(this.huodong)
     
      
    })
  }

  // ad(){

  //   this.navigate("application-details",{id:this.id})
  // }
  

 
}
