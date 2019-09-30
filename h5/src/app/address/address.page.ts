import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { AddressApi } from 'src/providers/address.api';

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
  show=false;

  onMyLoad(){
    //参数
    this.params;
  }
  onMyShow(){
    this.getaddress();
  }

  getaddress(){
    var api=this.addressApi;
    api.getaddress({people:this.params.people,phone:this.params.phone,dizhi:this.params.dizhi,menpaihao:this.params.menpaihao}).then((address)=>{
      console.log(address)
      if(address==''||address==undefined){
        this.show=false
      }
      else{
        this.address=address;
        this.show=true;
      }
    })
  }





  myAdress(i){
    this.navigate("my-address",{id: i})
  }

}
