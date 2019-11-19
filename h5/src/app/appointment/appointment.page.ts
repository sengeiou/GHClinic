
import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { OrderApi } from 'src/providers/order.api';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Http } from '@angular/http';
import { DoctorApi } from 'src/providers/doctor.api';
declare let WeixinJSBridge: any; 

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
  providers: [MemberApi, OrderApi, FileTransfer, DoctorApi]
})
export class AppointmentPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public orderApi: OrderApi,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public doctorApi: DoctorApi,
    public http: Http,
    private transfer: FileTransfer) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;
    this.hospital = {};
    this.doctor = {};
    this.schedule = {};
  }
  patientname = '';
  patientsexual = 'M';
  patientmobile = '';
  tuijianren = '';
  hospital = null;
  doctor = null;
  schedule = null;
  onMyLoad() {
    //参数
    this.params;
    this.gethospital();
    this.getDoctor();
    this.getSchedule();

  }
  gethospital() {
    var api = this.memberApi;
    api.hospitalinfo({ id: this.params.hospital_id }).then((hospital) => {
      this.hospital = hospital;
    })
  }
  getDoctor() {
    var api = this.doctorApi;
    api.info({ id: this.params.doctor_id }).then((doctor) => {
      this.doctor = doctor;
    })
  }
  getSchedule() {
    var api = this.doctorApi;
    api.scheduleinfo({ id: this.params.schedule_id }).then((schedule) => {
      this.schedule = schedule;
    })
  }
  hour = null;
  minute = null;
  onMyShow() {
    

  }

  successfulReservation() {

    var patientname = this.patientname;
    var patientmobile = this.patientmobile;
    if (patientname.trim() == '') {
      this.toast("请输入就诊人姓名");
      return;
    }
    if (patientmobile.trim() == '') {
      this.toast("请输入就诊人联系电话");
      return;
    }
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(patientmobile)) {
      this.toast("手机号格式不正确");
      return
    }


    var tuijianren = this.tuijianren;

    this.showConfirm("我已经确保所有信息填写无误",(ret)=>{
      if(ret){

        var api = this.orderApi;
        api.create({
           doctor_id: this.params.doctor_id, schedule_id: this.params.schedule_id,hospital_id:this.hospital.id,
          patientname: patientname, patientmobile: patientmobile, tuijianren: tuijianren,photolist:this.photolist.join(","),
          openid:this.openid
        }).then((res) => {

          if (res.code == 0) {
            this.navigate("successful-reservation",{id:res.return, hospital_id:  this.params.hospital_id});
          }else if(res.code=="233"){
            var order_id=res.return["order_id"];
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', res.return,
                  (res) => {
                  if(res.err_msg == "get_brand_wcpay_request:ok" ){
                    this.navigate("successful-reservation",{id:order_id, hospital_id:  this.params.hospital_id});
                  } else {
                    this.toast(res.errMsg);
                  }
                });
          }else{
            this.toast(res.result);
          }
        })
      }
    });


  }

  photolist = [];
  upload(ec) {
    var that = this;
    var file = ec.target.files[0];
    console.log("file",file);
    if(file.type=='image/jpeg'||file.type=='image/png'){
      
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
    }else{
      this.toast("请上传图片文件");
    }

  }

  shanchu(item){
    var id=item;
    console.log(id);
 this.showConfirm(("确认删除图片吗"),(res)=>{
    
     if(res)
     {
     var photolist=this.photolist;
   
     photolist= photolist.filter((item,idx)=>{
        
          return  idx!=id; 
          
       })
        
   this.photolist=photolist;

     }

 }





 )}

}

