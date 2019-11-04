import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
  providers:[MemberApi]
})
export class FeedbackPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
  }
  content=""
  user_id=""
  onMyShow(){
    console.log(this.MemberInfo)
    this.user_id = this.MemberInfo.id
  }
  send(){
    let date = new Date()
    let feedbacktime = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
    console.log(feedbacktime)
    if(this.content!=""){
      this.memberApi.addfeedback({user_id: this.user_id,content: this.content,feedback_time:feedbacktime,status:'A'}).then((ret)=>{
        console.log(ret)
          if(ret.code=="0"){
            this.toast("发送成功！")
            this.content = ""
          }
      })
    }
  }
}
