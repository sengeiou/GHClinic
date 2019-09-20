
import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { OrderApi } from 'src/providers/order.api';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
  providers: [MemberApi, OrderApi]
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
    public memberApi: MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  date = null;
  yishen = null;
  jiuzhenren = '';
  shoujihao = '';
  tuijianren = '';
  hospital=null;
  onMyLoad() {
    //参数
    this.params;
    var date = JSON.parse(this.params.date);
    this.date = date;
    console.log(this.date);
    this.yishen = JSON.parse(this.params.yishen);
    console.log(this.yishen);
    this.gethospital();
     
  }
  gethospital(){ 
var  api=this.memberApi;
  api.hospitalinfo({id:this.params.hospital_id}).then((hospital)=>{
   
    this.hospital=hospital;
     console.log(this.hospital);
     console.log("niudad");    
  })


  }
  hour = null;
  minute = null;
  onMyShow() {
    console.log(this.date.hour);
    console.log("08");
    console.log(parseInt(this.date.hour));
    console.log(parseInt("08"));
    if (this.date.minute == '00') {

      this.minute = '30';
      this.hour = parseInt(this.date.hour);
    } else {

      this.hour = parseInt(this.date.hour) + 1;
    }
    console.log(this.hour);
    console.log(this.minute);

  }

  successfulReservation() {

    var jiuzhenren = this.jiuzhenren;
    if (jiuzhenren == '') {
      return;
    }
    var shoujihao = this.shoujihao;
    if (shoujihao == '') {
      return;
    }
    var tuijianren = this.tuijianren;



    var api = this.orderApi;
    api.create({
      member_id: 1, doctor_id: this.yishen.id, schedule_id: this.date.qwe.id,
      patientname: jiuzhenren, patientsexual: 'M', photo: shoujihao, tuijianren: tuijianren,hospital_id:this.hospital.id
    }).then((res) => {
           console.log(res);
           console.log(this.date.qwe.id);
          
      if (res.code == 0) {
        this.navigate("successful-reservation",{id:res.return, hospital: JSON.stringify(this.hospital)});

      }

    })





  }


}

