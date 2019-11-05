import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { AddressApi } from 'src/providers/address.api';
import { OrderPage } from '../order/order.page';

@Component({
  selector: 'app-address',
  templateUrl: 'address.page.html',
  styleUrls: ['address.page.scss'],
  providers:[AddressApi]
})
export class AddressPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public addressApi: AddressApi,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  address=[];

  onMyLoad(){
    //参数
    this.params;
  }
  onMyShow(){
    this.getaddress();
  }

  getaddress(){
    var api=this.addressApi;
    api.getaddress({}).then((address)=>{
      this.address=address;
    })
  }

  returntolast(id){
    OrderPage.SADDRESSID=id;
    this.back();
  }

  myAdress(i){
        
    if(i==0)
    {
      this.navigate("my-address")
    }
    else{

      this.navigate("my-address",{id: i})
    }
  }

}
