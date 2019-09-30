
import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-physical-examination-appointment',
  templateUrl: './physical-examination-appointment.page.html',
  styleUrls: ['./physical-examination-appointment.page.scss'],
})
export class PhysicalExaminationAppointmentPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;
    this.d={};
  }
  hospital=null;
  hospitalinfo(){
   
    var api=this.memberApi;
    api.hospitalinfo({id:this.params.yiyuanid}).then((hospital)=>{
        console.log("hahah");
        console.log(hospital);
       this.hospital=hospital;
    })
 
   }
  onMyLoad() {
    this.params;
  }
  d=null;
  onMyShow() {
    this.hospitalinfo();
    var d =JSON.parse(this.params.riqi);
    console.log("qweqweqew");
    this.d=d;
  }
}
