import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router, LoadChildrenCallback } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides, LoadingController } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

declare let Wechat: any;


@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl:LoadingController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }
  show=true;
  mobile = "";
  password = "";
  wechatInstalled = false;
  needlogin=false;

  trylogin() {
           
   console.log(this.mobile);
   console.log(this.password);
   

    this.memberApi.login({
      mobile: this.mobile,
      password: this.password
    }).then((ret) => {
      console.log(ret);
      if (ret.code == "0") {
        AppBase.IsLogin=true;
        this.store("lastloginmobile", this.mobile);
        this.store("UserToken", ret.return);
        this.toast("登录成功");
        this.back();
      } else {
        this.toast("手机号码或密码不正确");
      }
    });

  }
  onMyLoad() {
    //参数
    this.params;

    var storemobile = this.store("lastloginmobile");
    this.mobile = storemobile;
    // WechatMgrWechatMgr.checkInstalled((isinstall)=>{
    //   this.wechatInstalled=isinstall;
    // });

    // wechatmgr.checkInstalled().then((isinstall) => {
    //   //alert(isinstall);
    //   this.wechatInstalled = isinstall;
    // });
    // Wechat.isInstalled( (installed)=>{
    //  this.wechatInstalled=installed;
    // }, function (reason) {
    //     //alert("Failed: " + reason);
    // });

  }
  onMyShow() {

  }
  zhuce(id=undefined) {
    console.log(123);
    this.navigate("/register",{id:id});

  }
  async checkWechatAuth() {


    const loading=await this.loadingCtrl.create({message:"微信登录中",backdropDismiss:false});

    await loading.present();
    var scope = "snsapi_userinfo",
    state = "_" + (+new Date());
    Wechat.auth(scope, state, (res) => {
      //alert(JSON.stringify(res));
      var code = res["code"];
      this.memberApi.wechatauth({ "oauthcode": code }).then((ret) => {
        loading.dismiss();
       
        if (ret.code == 0) {
          AppBase.IsLogin = true;
          this.store("UserToken", ret.return);
          this.toast("登录成功");
          this.back();
        } else {
          this.navigate("wxauthlogin", ret.return);
        }
      });
    },(reason) => {
      loading.dismiss();
      this.toast("授权失败，请稍后重试");
    });


  }
 
}
