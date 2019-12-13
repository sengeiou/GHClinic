
import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { MarketApi } from 'src/providers/market.api';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  providers: [MarketApi]
})
export class SearchPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public marketApi: MarketApi,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  name = '';
  onMyLoad() {
    //参数
    this.params;
  }
  onMyShow() {
    var api = this.memberApi;
    api.getbiaoqian({}).then((biaoqian) => {
      console.log(biaoqian);
      this.biaoqian = biaoqian;
    })

  }
  biaoqian = [];
  drugs = [];
  sousuo() {

    if (this.name == '') {

      return

    }
    console.log(this.name);

    var api = this.memberApi;
    var api1 = this.marketApi;
    api.addsousuojilu({ name: this.name }).then((res) => {


      api1.getdrugs({ name: this.name }).then((drugs) => {
        console.log(drugs);
        this.drugs = drugs;
        this.name = '';

      })




    })


  }
  guanjianzisousuo(name) {
    var api1 = this.marketApi;
    api1.getdrugs({ name: name }).then((drugs) => {
      console.log(drugs);
      this.drugs = drugs;
      this.name = '';

    })
  }
  CommodityDetails(i) {
    this.navigate("commodity-details", { id: i })
  }
  qinkon() {

    var api = this.memberApi;
    api.qinkonsousuojilu({}).then(() => {

      this.onMyShow();

    })


  }
  // searchDrugs(){
  //   this.navigate("search-drugs")
  // }



}
