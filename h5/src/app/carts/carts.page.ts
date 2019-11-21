import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { DindanApi } from 'src/providers/dindan.api';

@Component({
  selector: 'app-carts',
  templateUrl: 'carts.page.html',
  styleUrls: ['carts.page.scss'],
  providers: [DindanApi]
})
export class CartsPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public dindanApi: DindanApi,
    public memberApi: MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  zz = false;
  onMyLoad() {
    //参数
    this.params;
  }
  gouwuchelist = [];
  getgouwuche() {
    var api = this.dindanApi;
    api.getgouwuche({}).then((gouwuchelist) => {
      this.gouwuchelist = gouwuchelist;
      console.log(gouwuchelist);
      console.log("1111");
      this.jisuan();
    })

  }
  zonjia = "";
  jisuan() {

    var gouwuche = this.gouwuchelist;

    var jiage = 0;
    gouwuche.map((item) => {

      if (item.selected_value == 'Y') {
        jiage += item.num * item.drugs_price;

      }


    })
  
    this.zonjia = jiage.toFixed(2);



  }
  quanxuan() {
    this.gouwuchelist.map((item) => {
      item.selected_value = 'Y';
    })
    var api = this.dindanApi;
    api.quanxuan({ check: 'Y' }).then((res) => {

      this.zz = true;
      this.jisuan();

    })



  }
  quxiaoquanxuan() {
    this.gouwuchelist.map((item) => {

      item.selected_value = 'N';
    })

    var api = this.dindanApi;
    api.quanxuan({ check: 'N' }).then((res) => {

      this.zz = false;
      this.jisuan();


    })



  }

  onMyShow() {
    this.getgouwuche();
  }
  order() {

    if (this.zonjia == '') {

      this.toast("必须选择商品");
      return
    }

    this.navigate("order")
  }
  quxiao(item) {
    var api = this.dindanApi;

    api.addgouwuche({ drugs_id: item.drugs_id, num: 0, selected: 'N', status: 'A' }).then((res) => {

      if (res.code == 0) {

        this.jisuan();
        this.zz = false;
      }

    })
  }
  xuanze(item) {

    var api = this.dindanApi;

    api.addgouwuche({ drugs_id: item.drugs_id, num: 0, selected: 'Y', status: 'A' }).then((res) => {

      if (res.code == 0) {

        this.jisuan();
      }

    })
  }
  jia(item) {

    var api = this.dindanApi;

    api.addgouwuche({ drugs_id: item.drugs_id, num: 1, selected: item.selected_value, status: 'A' }).then((res) => {

      if (res.code == 0) {
        item.num++
        this.jisuan();
      }

    })



  }
  jian(item) {
    var api = this.dindanApi;

    if (item.num == 1) {

      this.showConfirm("是否删除", (res) => {


        if (res) {
          api.deletegouwuche({ id: item.id }).then((ret) => {

            console.log(ret);
            this.onMyShow();

          })
        }




      })

      return

    }

    api.addgouwuche({ drugs_id: item.drugs_id, num: -1, selected: item.selected_value, status: 'A' }).then((res) => {
      if (res.code == 0) {
        item.num--
        this.jisuan();
      }

    })


  }
  gotosc() {
    AppBase.CurrentRoute.navigateByUrl("/tabs/tab3");
  }
}
