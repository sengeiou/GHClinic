
import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-physical-examination',
  templateUrl: './physical-examination.page.html',
  styleUrls: ['./physical-examination.page.scss'],
})
export class PhysicalExaminationPage extends AppBase {

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

  }
  
  onMyLoad() {
    //参数
    this.params;
  }
  onMyShow() {
   
  }
  
 detail(){
   this.navigate("detail")
 }


 
 comprehensive=()=>{
  var divOne=document.getElementById('divOne')
  var divTwo=document.getElementById('divTwo')
    if(divOne.style.height==='246px'){
       divOne.style.height=0+'px';
       divOne.style.display="none";
       divTwo.style.display="none";
       divTwo.style.opacity='0';
    }else{
       divOne.style.height=246+'px';
       divOne.style.display="block";
       divTwo.style.display="block";
       divTwo.style.opacity='0.6';
    }

 }

 screen=()=>{

  var divThree=document.getElementById('divThree')
  var divTwo=document.getElementById('divTwo')
    if(divThree.style.height==='418px'){
      divThree.style.height=0+'px';
      divThree.style.display="none";
      divTwo.style.display="none";
       divTwo.style.opacity='0';
    }else{
      divThree.style.height=418+'px';
      divThree.style.display="block";
      divTwo.style.display="block";
       divTwo.style.opacity='0.6';
    }

 }




  

}

