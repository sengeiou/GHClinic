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
import { ReadApi } from 'src/providers/read.api';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  providers:[DindanApi,ActivityApi,OrderApi,XitongApi,ReadApi]
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
    public readApi:ReadApi,
    public activityApi:ActivityApi,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }
 
  onMyLoad(){
    //参数
    this.params;
  }
  onMyShow(){
     console.log(this.MemberInfo)
  }
  

  xianshi(){
    this.toast('暂不开放此模块')
  }
  
  address(){
    this.navigate("address");
  }
  gouwuche(){
    this.navigate("carts");

  }
  myOrder(){
   
    
      this.navigate("my-order");

    
  }

  MyAppointment(){
    var api=this.readApi;
    api.bianweiyidu2({}).then(()=>{
      this.navigate("my-appointment");
    })
    // this.navigate("my-appointment");
  }

  myNews(){
    var api=this.readApi;
    api.bianweiyidu1({}).then((res)=>{})
    api.bainweiyidu00({}).then((res)=>{
    })
    api.bianweiyidu22({}).then((res)=>{
    })
    api.bianweiyidu4({}).then((res)=>{
    })
    this.navigate("my-news");
    
  }

  myPhysicalExamination(){
    
      this.navigate("my-physical-examination");
  
  }

  myActivity(){
    var api=this.readApi;
    api.bianweiyidu({}).then((res)=>{
      this.navigate("my-activity");
    })
    // this.navigate("my-activity");
  }


  myCustomer(){
    this.navigate("my-customer");
  }
 
  wenzhantuison(){
    this.navigate("wen-zhan-tui-son")
  }
  daifukuan(){
  
    this.navigate("my-order",{id:1});

  }
  daishouhuo(){
 
    this.navigate("my-order",{id:2});

  }
 yiwanchen(){
  this.navigate("my-order",{id:3});

 }
}
