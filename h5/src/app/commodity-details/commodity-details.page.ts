import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { MarketApi } from 'src/providers/market.api';
import { DindanApi } from 'src/providers/dindan.api';


@Component({
  selector: 'app-commodity-details',
  templateUrl: 'commodity-details.page.html',
  styleUrls: ['commodity-details.page.scss'],
  providers: [MarketApi, MemberApi, DindanApi]
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
    public dindanApi: DindanApi,
    public memberApi: MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;
    this.drugsinfo = {};
  }

  drugsinfo = null;
  pinlun=[];
  count=0;
  onMyLoad() {
    //参数
    this.params;
    
  }
  zhuye(){
    this.navigate('tabs/tab3')

  }
  onMyShow() {
    this.getdrugsinfo();
   
   
    this.getgouwuche();
    
  }
 getgouwuche(){
  var api=this.dindanApi;
  api.getgouwuche({}).then((gouwuche)=>{
  
      
    var count=0;

   count=gouwuche.length;
      
  console.log(count);

    this.count=count;
   })
    
 }
  getdrugsinfo() {
    var api = this.marketApi;
    api.drugsinfo({ id: this.params.id }).then((drugsinfo) => {
      this.drugsinfo = drugsinfo;
      console.log(drugsinfo)
    })
   api.pinlun({drugs_id:this.params.id}).then((pinlun)=>{
      this.pinlun=pinlun;
      console.log(pinlun);  


   })

  }
  addcart() {
      console.log(this.MemberInfo);
      if(this.MemberInfo.id==''||this.MemberInfo==null)
      {
        this.navigate("login");
        return  
      }
     
    

    var api = this.dindanApi;

    api.addgouwuche({ drugs_id: this.params.id, num: 1, selected: 'N', status: 'A'}).then((res) => {
          
      console.log(res);
        this.getgouwuche();
        this.toast("加入购物车成功");
    })
        
  }

 

  order() {

    console.log(this.MemberInfo);
    if(this.MemberInfo.id==''||this.MemberInfo==null)
      {
        this.navigate("login");
        return  
      }

    this.navigate("order",{id:this.params.id})
  }
  cart() {
    this.navigate("carts")
  }
}
