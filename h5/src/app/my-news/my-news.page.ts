import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { ActivityApi } from 'src/providers/activity.api';
import { XitongApi } from 'src/providers/xitong.api';
import { OrderApi } from 'src/providers/order.api';
import { TijianApi } from 'src/providers/tijian.api';

@Component({
  selector: 'app-my-news',
  templateUrl: 'my-news.page.html',
  styleUrls: ['my-news.page.scss'],
  providers:[ActivityApi,XitongApi,OrderApi,TijianApi]
})
export class MyNewsPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public xitongApi:XitongApi,
    public tijanApi:TijianApi,
    public activityApi:ActivityApi,
    public orderApi:OrderApi,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }
  show=0;

  
  id=0;
  
  xitongnews=[];
  yuyue=[];
  

  tijian=[];
 

  huodong=[];
  
  onMyLoad(){
    //参数
    this.params;
  }

  onMyShow(){

    console.log(this.show);
    this.huoquactivityinfo();
    this.getxitongnews();
    this.getwodeyuyue();
    this.gettijian();

  }
  gettijian(){
    var tjj=[];
    var api =this.tijanApi;
    api.wodetijian({}).then((tijian)=>{
     
      for(let tj of tijian){
        if(tj.orderstatus=='B'){
          tjj.push(tj);
        }
      }
      this.tijian=tjj;
      console.log(this.tijian)
    })
  }
  getwodeyuyue(){
    var api=this.orderApi;
    var yuyue=[];
    api.wodeyuyue({}).then((wodeyuyue)=>{
      
      for(let yy of wodeyuyue){
        if(yy.orderstatus=='A'){
          yuyue.push(yy);
        }
      }
      this.yuyue=yuyue;
      console.log(this.yuyue);
    })
  }
  getxitongnews(){
    var api=this.xitongApi;
    api.xitongnews({}).then((xitongnews)=>{
      this.xitongnews=xitongnews;
    })
  }

  huoquactivityinfo(){
    var huodong=[];
    var api=this.activityApi;
    api.huoquactivityinfo({}).then((activityinfo)=>{

    
        for(let aa of activityinfo){
          if(aa.zhuangtai=='A'){
            
              huodong.push(aa);
           
          }
          // else{
            
          //     huodong.push('您取消了报名'+aa.activity_activityname+'的活动。')
          //     console.log(aa);
          //     this.day=new Date(aa.time).getDate();
          //     this.month=new Date(aa.time).getMonth()+1;
          //     this.year=new Date(aa.time).getFullYear();
          //     this.id=aa.id;
              
         
              
              
          //   }
           
          
        }
        this.huodong=huodong;
        console.log(this.huodong)
     
      
    })
  }

  ad(id){

    this.navigate("application-details",{id:id})
  }

  yd(id){

    this.navigate("appointment-payment",{id:id})
  }
  td(id){

    this.navigate("physical-examination-payment",{id:id})
  }
  

 
}
