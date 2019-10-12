import { Component, ViewChild,ElementRef } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides, IonInfiniteScroll, IonMenu } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { MarketApi } from 'src/providers/market.api';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers:[MarketApi],
})

export class Tab3Page extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public marketApi:MarketApi,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  list=false;
  tab3=true;
  qiehuan=1;
  lunbo=[];
  drugs=[];
  drugstype=[];
  onMyLoad(){
    //参数
    this.params;
  }
  rad=1;
  onMyShow(){
    this.rad = 375 * 1.0 / screen.width;
    var slides = document.querySelector('ion-slides');
    slides.startAutoplay();
    this.getlunbo();
    this.getdrugstype();
    
  }


  getlunbo(){
    var api=this.marketApi;
    api.getlunbo({}).then((lunbo)=>{
      this.lunbo=lunbo;
    })
    
  }

  getdrugstype(){
    var api=this.marketApi;
    api.getdrugstype({}).then((drugstype)=>{
      this.drugstype=drugstype;
      console.log(drugstype);
      this.getdrugs(drugstype[0].id);

    
    })
  }

  getdrugs(type){
    var api=this.marketApi;
    api.getdrugs({drugs_type:type}).then((drugs)=>{

      console.log("asdasds"+drugs);
      this.drugs=drugs;
    })
    
  }
 




  CommodityDetails(i){
    this.navigate("commodity-details",{id:i})
  }
  search(){
    this.navigate("search")
  }
   

 
}
