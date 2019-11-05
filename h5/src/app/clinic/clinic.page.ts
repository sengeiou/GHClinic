
import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { HospitalApi } from 'src/providers/hospital.api';
declare let AMap: any;
@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.page.html',
  styleUrls: ['./clinic.page.scss'],
  providers:[HospitalApi,MemberApi]
})
export class ClinicPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public hospitalApi:HospitalApi
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;
      this.info={};
  }
  marker;
  onMyLoad() {
    //参数
    this.params;
  }
  bannerlist=[];
  departmentlist=[];
  info=null;
  onMyShow() {

  
    
      
  var map = new AMap.Map('container');
     
    
      
   
  
   




   this.hospitalApi.bannerlist({hospital_id:this.params.hospital_id}).then((bannerlist)=>{
     this.bannerlist=bannerlist;
   });
   this.hospitalApi.department({hospital_id:this.params.hospital_id}).then((departmentlist)=>{
     this.departmentlist=departmentlist;
   });
   this.memberApi.hospitalinfo({id:this.params.hospital_id}).then((info)=>{
     this.info=info;
     console.log('asdgfdhgf'+info.lat);
     this.marker = new AMap.Marker({
      icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
      position: [info.lat,info.lng]
    });
    map.add(this.marker);
   })
   
  }


  doctor(){
    this.navigate("doctor")
  }

}
