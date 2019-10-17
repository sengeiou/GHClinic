import { Component, ViewChild,ElementRef } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { AliyunApi } from 'src/providers/aliyun.api';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
  providers: [MemberApi, AliyunApi]
})
export class RegisterPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,

    public ele: ElementRef,
    public aliyunApi: AliyunApi,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  condition=true;
  diyici = false;
  mobile = "";
  name = "";
  yanzhenma = "";
  password = "";
  reminder = 0;
  inverify = false;
  mima1 = '';
  mima2 = '';
  c1 = "";
  c2 = "";
  c3 = "";
  c4 = "";
  ismima = true;
  infocus = "";
  show = 1;
  timer = null;
needlogin=false;
onMyShow() {
 console.log(this.params.id)
 if(this.params.id==1){
   this.condition=false;
 }else{this.condition=true}
}
  xianshimima() {
    this.ismima = !this.ismima;
  }
  denglu() {
    console.log(11111);
    if (this.mima1 != this.mima2) {
      this.toast("两次输入的密码不一样");
      return
    }
    if (this.mima1.length < 8) {
      this.toast("密码长度需大于8");
      return
    }


    this.memberApi.register({
      mobile: this.mobile,

      password: this.mima1
    }).then(ret => {

      if (ret.code == "0") {
        this.toast("绑定成功");
        this.store("UserToken", ret.return);
        this.backToUrl("/tabs/tab1");
      } else {
        this.toast(ret.result);
      }
    });


  }

  setInVerify() {


    var k = this.timer = setInterval(() => {
      if (this.reminder >= 0) {
        this.reminder--;
      }
      if (this.reminder < 0) {
        clearInterval(k);
      }
  
    }, 1000);
  }
  xiayibu() {

    var verifycode =this.yanzhenma;
    if (verifycode=='1234') {
      this.show = 2;
    } 
    return
     console.log(verifycode);
    this.aliyunApi.verifycode({
      mobile: this.mobile,
      verifycode,
      type: "register"
    }).then(ret => {
      if (ret.code == 0) {
      this.show = 2;
    } else {
     
      this.toast("验证码校验失败，请重新尝试");
    }
  });


  }
  setC2Focus() {
    this.c2 = "";
    var obj = this.ele.nativeElement.querySelector('#inputc2');
    obj.focus();
  }
  setC3Focus() {
    this.c3 = "";
    var obj = this.ele.nativeElement.querySelector('#inputc3');
    obj.focus();
  }
  setC4Focus() {
    this.c4 = "";
    var obj = this.ele.nativeElement.querySelector('#inputc4');
    obj.focus();
  }
  submitRegister() {
    this.memberApi.register({
      mobile: this.mobile,
      name: this.name,
      password: this.password
    }).then(ret => {
      if (ret.code == "0") {
        this.toast("绑定成功");
        this.store("UserToken", ret.return);
        this.backToUrl("/tabs/tab5");
      } else {
        this.toast(ret.result);
      }
    });
  }

  sendVerifyCode() {

    this.memberApi.checkcanreg({ mobile: this.mobile }).then(ret => {
      console.log(ret);

      if (ret.code == "0") {
        // this.inverify = true;
        this.aliyunApi.sendverifycode({
          mobile: this.mobile,
          type: "register"
        }).then(ret => {
          console.log(ret);
          if (ret.code == 0) {
            this.reminder = 60;
            this.show = 1;

            this.c1 = "";
            this.c2 = "";
            this.c3 = "";
            this.c4 = "";
            //this.$refs["inputc1"].focus();

            //var obj = this.ele.nativeElement.querySelector('#inputc1');
            //obj.focus();

            this.toast("验证码已发送，请注意查收");
            this.diyici = true;
            this.setInVerify();
          } else {
            this.toast("验证码发送失败，请稍后重试");
          }
        });
      } else {
        this.toast("手机号码已经被使用");
      }
    });
  }
  nextone() {
    this.show = 2;
    console.log(this.show);
  }
  nexttwo() {
    this.show = 3;
    console.log(this.show);
  }
  nextthree() {
    this.show = 1;
    console.log(this.show);
  }

  tryMyBack() {
    if (this.show == 1) {
      this.back();
      return;
    }
    if (this.show == 2) {
      this.nextthree();
    }
  }


 
}
