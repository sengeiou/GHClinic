import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { DindanApi } from 'src/providers/dindan.api';
import { ActivityApi } from 'src/providers/activity.api';
import { OrderApi } from 'src/providers/order.api';
import { XitongApi } from 'src/providers/xitong.api';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  providers:[DindanApi,ActivityApi,OrderApi,XitongApi]
})
export class Tab4Page extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public dindanApi:DindanApi,
    public orderApi:OrderApi,
    public xitongApi:XitongApi,
    public activityApi:ActivityApi,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }
  count=0;
  count1=0;
  count2=0;
  count3=0;
  count4=0;
  count5=0;
  order1=[];
  order2=[];

  onMyLoad(){
    //参数
    this.params;
  }
  onMyShow(){
     this.huoquactivityinfo();
     this.getwodeyuyue();
     console.log(this.MemberInfo)
     this.getgouwuche();
     this.getmyorder();
     this.getxitongnews();
  }
  getwodeyuyue(){
    var api=this.orderApi;
    var yuyue=[];
    var count4=0;
    api.wodeyuyue({}).then((wodeyuyue)=>{
      for(let yy of wodeyuyue){
        if(yy.orderstatus=='A'){
          yuyue.push(yy);
        }
      }
      count4=yuyue.length;
      this.count4=count4;
    })
  }
  huoquactivityinfo(){
    var ainfo=[];
    var count3=0;
    var api=this.activityApi;
    api.huoquactivityinfo({}).then((activityinfo)=>{
      for(let ai of activityinfo){
        var aT=new Date(ai.activity_activitytime).getTime();
        console.log(ai.activty_activityTime)
        var nT=new Date().getTime();
        if(nT-aT<=0){
          if(ai.zhuangtai=='A'){
            ainfo.push(ai)
          }
        }
      }
      count3=ainfo.length;
      this.count3=count3;       
    })
  
  }
  getxitongnews(){
    var api=this.xitongApi;
    var cc=0;
    api.xitongnews({}).then((xitongnews)=>{
      cc=this.count3+this.count4+xitongnews.length;
      this.count5=cc;
      console.log("您好呀！！！"+this.count5)
    })
  }
  getgouwuche(){
    var api=this.dindanApi;
    api.getgouwuche({}).then((gouwuche)=>{
    var count=0;
    count=gouwuche.length;
    this.count=count;
     }) 
  }
  getmyorder(){
    var api=this.dindanApi;
    api.myorder({}).then((orders)=>{
      var count1=0;
      var count2=0;
      for(let o of orders){
        if(o.status=='B'){
          this.order1.push(o);
        }
        if(o.status=='C'){
          this.order2.push(o);
        }
      }
      console.log('aaaaaaa'+this.order1.length);
      console.log('bbbbbbb'+this.order2.length);
      count1=this.order1.length;
      count2=this.order2.length;
      this.count1=count1;
      this.count2=count2;
    })
  }


  xianshi(){
    this.toast('暂不开放此模块')
  }
  
  address(){
    this.navigate("address");
  }
  gouwuche(){
   this.count=0;
   this.navigate("carts");

  }
  myOrder(){
    this.navigate("my-order");
  }

  MyAppointment(){
    this.navigate("my-appointment");
  }

  myNews(){
    this.count5=0;
    this.navigate("my-news");
  }

  myPhysicalExamination(){
    this.count4=0;
    this.navigate("my-physical-examination");
  }

  myActivity(){
    this.count3=0;
    this.navigate("my-activity");
  }


  myCustomer(){
    this.navigate("my-customer");
  }
 
  wenzhantuison(){
    this.navigate("wen-zhan-tui-son")
  }
  daifukuan(){
    this.count1=0;
    this.navigate("my-order",{id:1});

  }
  daishouhuo(){
    this.count2=0;
    this.navigate("my-order",{id:2});

  }
 yiwanchen(){
  this.navigate("my-order",{id:3});

 }
}
