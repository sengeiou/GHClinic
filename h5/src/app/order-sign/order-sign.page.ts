import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { DindanApi } from 'src/providers/dindan.api';

@Component({
  selector: 'app-order-sign',
  templateUrl: 'order-sign.page.html',
  styleUrls: ['order-sign.page.scss'],
  providers:[DindanApi],
})
export class OrderSignPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public dindanApi: DindanApi,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }
  orderinfo=null;
  onMyLoad(){
    //参数
    this.params;
  }
  onMyShow(){
    this.getdindaninfo();
  }
  getdindaninfo(){
    var api=this.dindanApi;
     api.myorderinfo({id:this.params.id}).then((orderinfo)=>{
     console.log(orderinfo);
      this.orderinfo=orderinfo;
     })
     
  
    }
    qianshou(){
      var api=this.dindanApi;
    
        api.qianshou({id:this.params.id}).then(( res)=>{

         this.back();


        })
    


    }

    fanhui(){
      this.navigate('/tabs/tab3');
    }
 
  
}
