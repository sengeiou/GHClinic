import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { nextTick } from 'q';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page extends AppBase {

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
  xz=0;
  


  ddate: Date = new Date();
  ionViewDidEnter() {

    AppBase.TABName = "tab1";
    AppBase.LASTTAB = this;
  
   super.ionViewDidEnter();
  }
  onMyLoad() {
    this.params;
  }

  onMyShow() {
   
     console.log("jinlaile");

    this.getkeshi();
    
    
  }
  department = [];
  getkeshi() {
    var api = this.memberApi;
    api.getdepartment({}).then((department) => {
      
      this.department = department;

      console.log(department);
    
      this.xz=department[0].id;
      this.hospital(department[0]);

    })
  }
  hostlist = [];
  fuwuleibie=null;
  item=null;
  hospital(item) {
    this.item=item;
    this.xz=item.id;
    nextTick(()=>{
      //.scrollIntoView();
      var ele=document.querySelector("#hostlist");
      ele.scrollIntoView();
    });
    var name =item.name;
    var api = this.memberApi;
   if(name=="体检")
   {
    api.gethospital({ }).then((hostlist) => {
      console.log(hostlist);
      this.hostlist = hostlist;
    this.fuwuleibie=name;
    })
   return
   }


    
    api.departmenthost({ department_id: item.id }).then((hostlist) => {
      console.log(hostlist);
      this.hostlist = hostlist;
      this.fuwuleibie=name;

    })


  }
  xzrq=null;
  xzy=null;
  riqi=null;
  
  


  search() {
    this.navigate("search")
  }
  information(id) {
    this.navigate("information",{fuwuleibie:this.fuwuleibie,yiyuanid:id})
  }
  tijian(id)
  {
    var yue=this.xzy;
    var ri=this.xzrq;
      console.log(id.id);

    this.navigate("physical-examination",{riqi:this.riqi,fuwuleibie:this.fuwuleibie,yiyuanid:id.id})

  }
  physicalExamination() {
    this.navigate("physical-examination")
  }
  noDuty() {
    this.navigate("no-duty")
  }
}
