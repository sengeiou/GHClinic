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
  count=0;
  count1=0;
  count2=0;
  count3=0;
  count33=0;
  count4=0;
  count44=0;
  count5=0;
  order1=[];
  order2=[];
  read_status;

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
    var yuyue1=[];
    var count4=0;
    var count44=0;
    api.wodeyuyue({}).then((wodeyuyue)=>{
      for(let yy of wodeyuyue){
        if(yy.orderstatus=='A'){
          if(yy.read_status=='B'){
          yuyue.push(yy);
          }
          if(yy.read_status1=='B'){
            yuyue1.push(yy);
            }
        }
      }
      count4=yuyue.length;
      this.count4=count4;
      console.log(this.count4)
      count44=yuyue1.length;
      this.count44=count44;
    })
  }
  huoquactivityinfo(){
    var ainfo=[];
    var ainfo1=[];
    var count3=0;
    var count33=0;
    var api=this.activityApi;
    api.huoquactivityinfo({}).then((activityinfo)=>{
      for(let ai of activityinfo){
        var aT=new Date(ai.activity_activitytime).getTime();
        console.log(ai.activty_activityTime)
        var nT=new Date().getTime();
        if(nT-aT<=0){
          if(ai.zhuangtai=='A'){
            if(ai.read_status=='B'){
            ainfo.push(ai)
            }
            if(ai.read_status1=='B'){
              ainfo1.push(ai)
            }
          }
        }
      }
      count3=ainfo.length;
      this.count3=count3; 
      count33=ainfo1.length;
      this.count33=count33;      
    })
  
  }

  getxitongnews(){
    var api=this.xitongApi;

    var x=[];
    api.xitongnews({}).then((xitongnews)=>{
      for(let xtn of xitongnews){
        if(xtn.read_status=='B'){
          x.push(xtn);
          
        }
      }
      this.count5=this.count33+this.count44+x.length;
    })
  }
  getgouwuche(){
    var api=this.dindanApi;
    api.getgouwuche({}).then((gouwuche)=>{
      for(let gwc of gouwuche){
        if(gwc.read_status=='B'){
            var count=0;
            count=count+1;
            this.count=count;
        }
      }
    }) 
  }
  getmyorder(){
    var api=this.dindanApi;
    api.myorder({}).then((orders)=>{
      var count1=0;
      var count2=0;
      for(let o of orders){
        if(o.status=='B'){
          if(o.read_status=='B'){
          this.order1.push(o);
        }
        }
        if(o.status=='C'){
          if(o.read_status=='B'){
          this.order2.push(o);
        }
        }
      }
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
    var api=this.readApi;
    api.bianweiyidu1({}).then((res)=>{
      this.navigate("carts");
    })
  

  }
  myOrder(){
   
    
      this.navigate("my-order");

    
  }

  MyAppointment(){
    var api=this.readApi;
    api.bianweiyidu2({}).then(()=>{
      this.navigate("my-appointment");
    })
  }

  myNews(){
    var api=this.readApi;
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
    
  }


  myCustomer(){
    this.navigate("my-customer");
  }
 
  wenzhantuison(){
    this.navigate("wen-zhan-tui-son")
  }
  daifukuan(){
    var api=this.readApi;
    api.bianweiyidu3({}).then((res)=>{
      this.navigate("my-order",{id:1});
    })
    

  }
  daishouhuo(){
    var api=this.readApi;
    api.bianweiyidu3({}).then((res)=>{
      this.navigate("my-order",{id:2});
    })
    

  }
 yiwanchen(){
  this.navigate("my-order",{id:3});

 }
}
