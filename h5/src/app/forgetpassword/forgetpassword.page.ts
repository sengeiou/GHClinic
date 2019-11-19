import { Component, ViewChild, ElementRef } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { AliyunApi } from 'src/providers/aliyun.api';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.page.html',
  styleUrls: ['./forgetpassword.page.scss'],
  providers: [MemberApi, AliyunApi]
})
export class ForgetpasswordPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public ele: ElementRef,
    public memberApi: MemberApi,
    public aliyunApi: AliyunApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;


  }


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
  infocus = "";
  show = 1;
  timer = null;
  ismima = false;
  diyici = false;

  needlogin=false;
  condition=true;
  onMyShow() {
    console.log(this.params.id)
    if(this.params.id==1){
      this.condition=false;
    }else{this.condition=true}
    
   }
  



  setInVerify() {

    if (!this.mobile) {
      this.toast("手机号不能为空！");
      return;
    }
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(this.mobile)) {
      this.toast("手机号格式不正确");
      return
    }


    this.sendVerifyCode();
  
  }
  daojishi(){

    var k = this.timer = setInterval(() => {
      if (this.reminder >= 0) {
        this.reminder--;
      }
      if (this.reminder < 0) {
        clearInterval(k);
      }
  
    }, 1000);

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

  submitVerify() {
    var verifycode = this.c1 + this.c2 + this.c3 + this.c4;
    this.aliyunApi.verifycode({
      mobile: this.mobile,
      verifycode,
      type: "reset"
    }).then(ret => {
      if (ret.code == 0) {
        this.memberApi.resetpassword({
          mobile: this.mobile,
          password: this.password
        }).then(ret => {
          if (ret.code == "0") {
            this.toast("重设成功，请重新登录");
            this.back();
          } else {
            this.toast(ret.result);
          }
        });
      } else {
        this.c1 = "";
        this.c2 = "";
        this.c3 = "";
        this.c4 = "";
        this.toast("验证码校验失败，请重新尝试");
      }
    });
  }

  sendVerifyCode() {
    this.memberApi.checkcanreg({ mobile: this.mobile }).then(ret => {
      if (ret.code == "1") {
        // this.inverify = true;
        this.aliyunApi.sendverifycode({
          mobile: this.mobile,
          type: "reset"
        }).then(ret => {
          if (ret.code == 0) {
            this.reminder = 60;
            // this.show = 2;
            this.c1 = "";
            this.c2 = "";
            this.c3 = "";
            this.c4 = "";
            this.diyici = true;
           
            this.toast("验证码已发送，请注意查收");
            this.daojishi();
          } else {
            this.toast("验证码发送失败，请稍后重试");
          }
        });
      } else {
        this.toast("手机号码还没有注册");
      }
    });
  }

  xianshimima() {
    this.ismima = !this.ismima;

     console.log(this.ismima);

  }

  xiayibu() {

    var verifycode = this.yanzhenma;
    // this.show = 2;
    this.aliyunApi.verifycode({
      mobile: this.mobile,
      verifycode,
      type: "reset"
    }).then(ret => {
      if (ret.code == 0) {
        this.show = 2;
      } else {

        this.toast("验证码校验失败，请重新尝试");
      }
    });
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


    this.memberApi.resetpassword({
      mobile: this.mobile,

      password: this.mima1
    }).then(ret => {

      if (ret.code == "0") {
        this.toast("重设成功，请重新登录");
        this.store("UserToken", ret.return);
        this.backToUrl("/tabs/tab1");
      } else {
        this.toast(ret.result);
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
