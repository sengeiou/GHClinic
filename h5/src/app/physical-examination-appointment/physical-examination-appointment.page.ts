
import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { SetmealApi } from 'src/providers/setmeal.api';
import { Http } from '@angular/http';
import { TijianApi } from 'src/providers/tijian.api';
declare let WeixinJSBridge: any;
@Component({
  selector: 'app-physical-examination-appointment',
  templateUrl: './physical-examination-appointment.page.html',
  styleUrls: ['./physical-examination-appointment.page.scss'],
  providers: [SetmealApi,TijianApi]
})
export class PhysicalExaminationAppointmentPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public setmealApi: SetmealApi,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public tijianApi:TijianApi,
    public http: Http,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;
    this.d = {};
  }
  photolist = [];
  hospital = null;
  canshu = null;
  hospitalinfo() {

    var api = this.memberApi;
    api.hospitalinfo({ id: this.params.yiyuanid }).then((hospital) => {
      console.log("hahah");
      console.log(hospital);
      this.hospital = hospital;
    })

  }
  onMyLoad() {
    this.params;
  }
  d = null;
  onMyShow() {
    var canshu = { name: '', id: '', shouji: '', beizhu: '' };
    this.canshu = canshu;

    this.hospitalinfo();
    this.taocaninfo(this.params.id);
    var d = this.params.riqi;
    console.log("qweqweqew");
    this.d = d;
  }
  setmealinfo = null;
  taocaninfo(id) {
    var api = this.setmealApi;

    api.setmealinfo({ id: id }).then((setmealinfo) => {
      console.log("taocanxiangqin", setmealinfo);
      this.setmealinfo = setmealinfo;

    })


  }
  upload(ec) {
    console.log(123132);
    var that = this;
    var file = ec.target.files[0];
    console.log("file", file);
    if (file.type == 'image/jpeg' || file.type == 'image/png') {

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        var data = e.target.result;
        console.log(data);
        that.uploadBase64(that.http, data, "appointment").then((filename) => {
          //alert(filename);
          that.photolist.push(filename);
        });
      }
    } else {
      this.toast("请上传图片文件");
    }

  }

  yuyue() {

    var canshu = this.canshu;
    if (canshu.name == '') {
      this.toast("请输入就诊人姓名");
      return;
    }
    if (canshu.id == '') {
      this.toast("请输入就诊人身份证");
      return
    }
    var mr = /^\d{17}[\d|X]$|^\d{15}$/;
    if (!mr.test(canshu.id)) {
      this.toast("身份证格式不正确");
      return
    }
    if (canshu.shouji == '') {
      this.toast("请输入就诊人联系方式");
      return
    }
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(canshu.shouji)) {
      this.toast("手机号格式不正确");
      return
    }
    this.showConfirm("我已经确保所有信息填写无误", (ret) => {
      if (ret) {
        var api=this.tijianApi;
        api.create({setmeal_id:this.params.id,hospital_id:this.params.yiyuanid, patientname:canshu.name,patientmobile:canshu.shouji,
          patientid:canshu.id, openid:this.openid,beizhu:canshu.beizhu
        }).then((res)=>{
         
          if(res.code=="233"){
            var order_id=res.return["order_id"];
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', res.return,
                  (res) => {
                  if(res.err_msg == "get_brand_wcpay_request:ok" ){
                    this.navigate("physical-examination-payment",{id:order_id, hospital_id:  this.params.hospital_id});
                  } else {
                    this.navigate("my-physical-examination");
                    this.toast(res.errMsg);
                  }
                });
          }else{
            this.toast(res.result);
          }



        })

      }
      else {


      }


    }
    )
  }
}
