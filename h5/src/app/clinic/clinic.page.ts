
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
 
  map;
  onMyLoad() {
    //参数
    this.params;
  }
  bannerlist=[];
  departmentlist=[];
  info=null;
  onMyShow() {

  
    
      

     
    
      
   
  
   




   this.hospitalApi.bannerlist({hospital_id:this.params.hospital_id}).then((bannerlist)=>{
     this.bannerlist=bannerlist;
   });
   this.hospitalApi.department({hospital_id:this.params.hospital_id}).then((departmentlist)=>{
     
     this.departmentlist=departmentlist;
   });
   this.memberApi.hospitalinfo({id:this.params.hospital_id}).then((info)=>{
     this.info=info;
     console.log('asdgfdhgf'+info.lat);
     this.map = new AMap.Map("container", {
      resizeEnable: true,
      center: [info.lat, info.lng],
      zoom: 16
    });
      var marker = new AMap.Marker({
      icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
      position: [info.lat,info.lng]
    });
    this.map.add(marker);
   })
  }

  nav(){
    this.openLocation(this.info.lat,this.info.lng,this.info.name,this.info.address)
  }

  keshi(item){
   this.navigate("information",{fuwuleibie:item.name,yiyuanid:this.params.hospital_id});

  }

  doctor(){
    this.navigate("doctor")
  }

  call(tel){
    console.log(tel)
    let tel_str = "tel:"+tel;
    document.location.href=tel_str; 
  }

}
