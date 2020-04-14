import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { AddressApi } from 'src/providers/address.api';
import { ApiConfig } from '../api.config';
import { ReciveServeProvider } from 'src/provider/activity.api';
import { InstApi } from 'src/providers/inst.api';


@Component({
  selector: 'app-my-address',
  templateUrl: 'my-address.page.html',
  styleUrls: ['my-address.page.scss'],
  providers: [AddressApi,ReciveServeProvider,InstApi]
})
export class MyAddressPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public instApi:InstApi,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private reviceServe: ReciveServeProvider,
    public addressApi: AddressApi,
    public memberApi: MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  listData = [];
  address = {
    primary_id: 0,
    people: "",
    phone: "",
    dizhi: "",
    menpaihao: "",
    isdefault: "N"
  };
  getRequestContact() {
    this.reviceServe.getRequestContact().subscribe(res => {
        this.listData = res.json();
    }, error => {
        console.log(error);
    })
}
shen=[];
xzshen='湖南省';
xzshi='';
shi=[];
qidon=false;
  onMyLoad() {
    //参数
    this.params;
    this.getRequestContact();
    var api=this.instApi;
    api.shen({}).then((shen)=>{
       console.log(shen);  
         this.shen=shen;
 
    })
  }
  typeTxt='';
  switchType(e){
      
    this.xzshen=e.detail.value.province;
    var api=this.instApi;
      api.shi({provinceid:e.detail.value.id}).then((shi)=>{
        console.log(shi);  
        this.shi=shi;

      })
    
   
  }
  switchshi(e)
  { 
 
  
    this.xzshi=e.detail.value.provincecity;

    this.address.dizhi=this.xzshi;
   
  }
  onMyShow() {
    this.getaddressinfo();
  }

  toggleFun(e){
    console.log(e);
    this.address.isdefault=e.detail.checked?"Y":"N";
  }

  getaddressinfo() {
    var api = this.addressApi;
    if (this.params.id == undefined) {
      
      return
    }
    api.addressinfo({ id: this.params.id }).then((addressinfo) => {
      this.address = addressinfo;
      console.log(addressinfo);
      this.address.primary_id = this.params.id;
    })
  }

  saveaddress() {

    var people = this.address.people;
    if (people == '') {
      this.toast("请输入收货人");
      console.log(1);
      return;
    }
    var phone = this.address.phone;
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

    var dizhi = this.address.dizhi;
    if (dizhi == '') {
      this.toast("请输入地址");
      console.log(3);
      return;
    }
    var menpaihao = this.address.menpaihao;
    if (menpaihao == '') {
      this.toast("请输入门牌号");
      console.log(4);
      return;
    }

    var api = this.addressApi;

    api.tianjiaaddress(this.address).then((res) => {
      console.log(res)
      if (res.code == 0) {

        this.back();

      } else {
        this.toast(res.result);
      }

    })

  }
  shanchu(){
    this.showConfirm("确定删除该地址？",(ret)=>{
      if(ret){

        this.addressApi.shanchuaddress({idlist:this.address.primary_id}).then(()=>{
          this.back();
        });
      }
    });
  }

  fanhui(){
    this.navigate('tabs/tab4')
  }

}
