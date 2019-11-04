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
  selector: 'app-evaluate',
  templateUrl: 'evaluate.page.html',
  styleUrls: ['evaluate.page.scss'],
  providers: [DindanApi]
})
export class EvaluatePage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public dindanApi: DindanApi,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  orderinfo = null;
  getdindaninfo() {
    var api = this.dindanApi;
    api.myorderinfo({ id: this.params.id }).then((orderinfo) => {
      console.log(orderinfo);

      orderinfo.orders.map((item) => {

        item.beizhu = '';

      })


      this.orderinfo = orderinfo;



    })


  }
  onMyLoad() {
    //参数
    this.params;
  }
  onMyShow() {
    this.getdindaninfo();
  }
  tijiao() {

    var api = this.dindanApi;
    api.yipinjia({ id: this.params.id }).then((res) => {



    })


    var pinjialist = [];







    this.orderinfo.orders.map((item) => {

      this.pinjia(item);


    })


    this.toast("提交成功");
    this.back();





  }
  pinjia(item) {
    var api = this.dindanApi;
    setTimeout(() => {
      api.pinjiashanpin({ drugs_id: item.id, content: item.beizhu }).then((res) => {




      })
    }, 200)




  }

}
