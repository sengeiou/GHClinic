import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { AddressApi } from 'src/providers/address.api';

@Component({
  selector: 'app-my-address',
  templateUrl: 'my-address.page.html',
  styleUrls: ['my-address.page.scss'],
  providers:[AddressApi]
})
export class MyAddressPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public addressApi: AddressApi,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }
  people="";
  phone="";
  member=[];
  dizhi="";
  people1="";
  phone1="";
  dizhi1="";
  menpaihao1='';
  id='';
  show=false;
  menpaihao='';
  addressinfo=[];
  onMyLoad(){
    //参数
    this.params;
  }
  onMyShow(){
    this.member.push(this.MemberInfo);
    console.log(this.member)
    for(let m of this.member){
      this.id=m.id;
    }
    this.getaddress();

    console.log(this.params.id)
    
    

  }
  
  close() {
    this.modalCtrl.dismiss({});
  }

 id1=0;

  shanchu() {
    console.log("12313");
    this.showConfirm("是否删除此地址", (ret) => {
      if (ret == true) {
        this.addressApi.shanchuaddress({ id: this.id1 }).then((res) => {
          if(res.code==0){
            this.toast("删除成功");
            this.close();
          }
         

        })
      }
    });
  }

  
  getaddress(){
    var api=this.addressApi;
    api.getaddress({id:this.params.id}).then((addressinfo)=>{
      for(let ai of addressinfo){
        if(ai.id==this.params.id){
          this.id1=ai.id;
          this.addressinfo=addressinfo;
          console.log(ai.id)
          this.people1=ai.people;
          this.phone1=ai.phone;
          this.dizhi1=ai.dizhi;
          this.menpaihao1=ai.menpaihao;
          this.show=true;
        }
        else{
          this.show=false;
        }
        
      }      
    })
  }
  
 



  address(){
    var id=this.id;
    var people=this.people;
    if(people==''){
      return;
    }
    var phone=this.phone;
    if(phone==''){
      return;
    }
    var dizhi=this.dizhi;
    if(dizhi==''){
      return;
    }
    var menpaihao=this.menpaihao;
    if(menpaihao==''){
      return;
    }
   

   
      var api=this.addressApi;
      api.tianjiaaddress({status:'M',people:people,phone:phone,dizhi:dizhi,menpaihao:menpaihao,member_id:id}).then((res)=>{
        console.log(res)
        if(res.code == 0){
          this.navigate("address",{
            people:people,phone:phone,dizhi:dizhi,menpaihao:menpaihao

          })
        }
        
      })

    

    
  }

}
