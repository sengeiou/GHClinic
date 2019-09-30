import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { MarketApi } from 'src/providers/market.api';

@Component({
  selector: 'app-commodity-details',
  templateUrl: 'commodity-details.page.html',
  styleUrls: ['commodity-details.page.scss'],
  providers:[MarketApi,MemberApi]
})
export class CommodityDetailsPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public marketApi: MarketApi,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  drugsinfo=[];

  onMyLoad(){
    //参数
    this.params;
  }
  onMyShow(){
    this.getdrugsinfo();
  }

  getdrugsinfo(){
    var api=this.marketApi;
    api.drugsinfo({id:this.params.id}).then((drugsinfo)=>{
      this.drugsinfo=drugsinfo;
      console.log(drugsinfo)
    })
  }
 

  order(){
    this.navigate("order")
  }
  cart(){
    this.navigate("carts")
  }
}
