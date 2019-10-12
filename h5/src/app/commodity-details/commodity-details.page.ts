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

  onMyLoad() {
    //参数
    this.params;
  }
  onMyShow() {
    this.getdrugsinfo();
  }

  getdrugsinfo() {
    var api = this.marketApi;
    api.drugsinfo({ id: this.params.id }).then((drugsinfo) => {
      this.drugsinfo = drugsinfo;
      console.log(drugsinfo)
    })
  }
  addcart() {
    var api = this.dindanApi;

    api.addgouwuche({ drugs_id: this.params.id, num: 1, selected: 'N', status: 'A' }).then((res) => {
          
      console.log(res);
        
    })
        

  }

  order() {
    this.navigate("order")
  }
  cart() {
    this.navigate("carts")
  }
}
