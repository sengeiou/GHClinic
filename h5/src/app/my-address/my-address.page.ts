import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { AddressApi } from 'src/providers/address.api';

@Component({
  selector: 'app-my-address',
  templateUrl: 'my-address.page.html',
  styleUrls: ['my-address.page.scss'],
  providers: [AddressApi]
})
export class MyAddressPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public addressApi: AddressApi,
    public memberApi: MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  isToggled=false
  people = "";
  phone = "";
  member = [];
  dizhi = "";

  id = '';
  
  menpaihao = '';
  addressinfo = [];
  onMyLoad() {
    //参数
    this.params;
  }
  onMyShow() {




    this.getaddressinfo();






  }


  toggleFun(e) {
   
    console.log(e.detail.checked);
    this.isToggled = e.detail.checked
    console.log(this.isToggled);
  }

  // close() {
  //   this.modalCtrl.dismiss({});
  // }

  id1 = 0;

  // shanchu() {


  //   console.log("12313");
  //   this.showConfirm("是否删除此地址", (ret) => {
  //     if (ret == true) {
  //       this.addressApi.shanchuaddress({ id: this.id1 }).then((res) => {
  //         if (res.code == 0) {
  //           this.toast("删除成功");
  //           this.close();
  //         }


  //       })
  //     }
  //   });
  // }


  getaddressinfo() {
    var api = this.addressApi;
    if (this.params.id == undefined) {
      return
    }

    api.addressinfo({ id: this.params.id }).then((addressinfo) => {
      var ai = addressinfo;

      this.id1 = ai.id;
      this.addressinfo = addressinfo;
      this.people = ai.people;
      this.phone = ai.phone;
      this.dizhi = ai.dizhi;
      this.id = ai.member_id;
      this.isToggled = ai.isdefault_value == 'Y' ? true : false;
      this.menpaihao = ai.menpaihao;

    })
  }

  delete() {

    var id = this.id1;
    if (id == 0) {
      return
    }
    var api = this.addressApi;

    api.shanchuaddress({ idlist: id }).then((res) => {

      if (res.code == 0) {
        this.back();

      }


    })




  }



  address() {
    var id1 = this.id1;

    var people = this.people;
    if (people == '') {
      this.toast("请输入收货人");
      console.log(1);
      return;
    }
    var phone = this.phone;
    if (phone == '') {
      this.toast("请输入手机号");
      console.log(2);
      return;
    }
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(phone)) {
      this.toast("手机号格式不正确");
      return
    }

    var dizhi = this.dizhi;
    if (dizhi == '') {
      this.toast("请输入地址");
      console.log(3);
      return;
    }
    var menpaihao = this.menpaihao;
    if (menpaihao == '') {
      this.toast("请输入门牌号");
      console.log(4);
      return;
    }

    var canshu = { status: 'A', people: people, phone: phone, dizhi: dizhi, menpaihao: menpaihao,isdefault: this.isToggled ? 'Y' : 'N', }
    var canshu1 = { primary_id: id1, status: 'A', people: people, phone: phone, dizhi: dizhi, menpaihao: menpaihao,isdefault: this.isToggled ? 'Y' : 'N', }






    var api = this.addressApi;
    // api.tianjiaaddress({status:'M',people:people,phone:phone,dizhi:dizhi,menpaihao:menpaihao,member_id:id}).then((res)=>{
    //   console.log(res)
    //   if(res.code == 0){
    //     this.navigate("address",{
    //       people:people,phone:phone,dizhi:dizhi,menpaihao:menpaihao

    //     })
    //   }

    // })

    api.tianjiaaddress(id1 == 0 ? canshu : canshu1).then((res) => {
      console.log(res)
      if (res.code == 0) {

        this.back();

      }

    })








  }

}
