import { Component, OnInit, TemplateRef } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { DoctorApi } from 'src/providers/doctor.api';
import { BsModalService } from 'ngx-bootstrap/modal';
import { EventEmitter } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { ApiConfig } from '../api.config';
import { OperatorApi } from 'src/providers/operator.api';
import { AppUtil } from '../app.util';
import { isNgTemplate } from '@angular/compiler';
import { OrderApi } from 'src/providers/order.api';
@Component({
  selector: 'app-todayorderlist',
  templateUrl: './todayorderlist.component.html',
  styleUrls: ['./todayorderlist.component.scss'],
  providers: [InstApi, DoctorApi, BsModalService,OperatorApi,OrderApi]
})
export class TodayorderlistComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public doctorApi: DoctorApi,
    public modalService: BsModalService,
    public operatorApi:OperatorApi,
    public orderApi:OrderApi,
  ) {
    super(router, activeRoute, instApi);
  }

  orderA=[];
  orderB=[];
  orderC=[];
  orderD=[];
  orderE=[];
  orderF=[];

  clock="";

  order;

   timer1=null;
   timer2;

  onUnload(){
    if(this.timer1!=null){
      clearInterval(this.timer1);
    }
    if(this.timer2!=null){
      clearInterval(this.timer2);
    }
  }

  onMyLoad(){
    this.loadOrder();
    this.loadClock();
    if(this.timer1==undefined){
      this.timer1=setInterval(()=>{
        this.loadClock();
      },1000);
    }
    if(this.timer2==undefined){
      this.timer2=setInterval(()=>{
        this.loadOrder();
      },10*1000);
    }
  }

  loadClock(){
    // console.log("reloading t1",(new Date()));
    this.clock=AppUtil.FormatDateTime(new Date());
  }
  allorders=[];
  ALen=0;
  BLen=0;
  CLen=0;
  DLen=0;
  ELen=0;
  FLen=0;
  ALLLen=0;
  loadOrder(){
    // console.log("reloading t2",(new Date()));
    var that=this;
    
    that.operatorApi.todayorderlist({}).then((list:[any])=>{
      this.allorders = list;
      this.ALLLen =  this.allorders.length;
      var orderA=[];
      var orderB=[];
      var orderC=[];
      var orderD=[];
      var orderE=[];
      var orderF=[];
      for(var item of list){
        
        item.ordertime_timespan=parseInt(item.ordertime_timespan)*1000;
        if(that.isA(item)){
          orderA.push(item);
          this.ALen = orderA.length;
        }else if(that.isB(item)){
          orderB.push(item);
          this.BLen = orderB.length;
        }else if(that.isC(item)){
          orderC.push(item);
          this.CLen = orderC.length;
        }else if(that.isD(item)){
          orderD.push(item);
          this.DLen = orderD.length;
        }else if(that.isE(item)){
          orderE.push(item);
          this.ELen = orderE.length;
        }
        else{
          orderF.push(item);
          this.FLen = orderF.length;
        }
        that.orderA=orderA;
        that.orderB=orderB;
        that.orderC=orderC;
        that.orderD=orderD;
        that.orderE=orderE;
        that.orderF=orderF;
        that.orders = that.orderA
       console.log(that.orderA,'oooooo')
       console.log(this.isA(item),'ppp')
      }
    
    });
  
  }

  isA(item){
    var nowtime=(new Date()).getTime();
    if(item.orderstatus=="A"
      &&item.ordertime_timespan-nowtime>=0){
      return true;
    }else if(item.orderstatus=="A"
    &&item.ordertime_timespan-nowtime<0){
      this.orderApi.guohao({order_id:item.id}).then((guohao)=>{
        console.log(guohao)
      })
    }
    return false;
  }

  isB(item){
    var nowtime=(new Date()).getTime();
    if(item.orderstatus=="B"){
      return true;
    }
    return false;
  }
  isC(item){
    var nowtime=(new Date()).getTime();
    if(item.orderstatus=="C"){
      return true;
    }
    return false;
  }
  isD(item){
    var nowtime=(new Date()).getTime();
    if(item.orderstatus=="D"){
      return true;
    }
    return false;
  }
  // isE(item){
  //   var nowtime=(new Date()).getTime();
  //   if(item.orderstatus=="E"
  //     &&item.ordertime_timespan-nowtime<0
  //     ){
  //     return true;
  //   }
  //   return false;
  // }

  isE(item){
    var nowtime=(new Date()).getTime();
    if(item.orderstatus=="E"

      ){
      return true;
    }
    return false;
  }

  onMyShow(){

  }

  gotoConference(order){
    console.log(order)
    if(order.orderstatus=='A'){
      this.navigate("/conference",{order_id:order.id});
    }else if(order.orderstatus=='B'){
      this.navigate("/conference",{order_id:order.id,orderstatus:'B'});
    }else if(order.orderstatus=='D'){
      this.navigate("/conference",{order_id:order.id});
    }
  }

  changconference(item){
    if(item.orderstatus=="B"){
      this.orderApi.end({order_id: item.id}).then((ret)=>{
        if(ret){
         this.onMyLoad()
        }
      })
    }else if(item.orderstatus=="D"){
        this.orderApi.guohao({order_id: item.id}).then((ret)=>{
          if(ret){
            this.onMyLoad()
          }
        })
    }
    
  }

  cancelconference(item){
    this.orderApi.quxiao({order_id: item.id}).then((ret)=>{
      if(ret){
        this.onMyLoad()
      }
    })
  }

  orders=[]
  waiting(e){
    console.log(e,'e')
    var current = e.target
    current.classList.add('btn-active')
    var others = e.target.parentElement.childNodes
    for(let i=0;i<others.length;i++){
      if(current!=others[i]){
        others[i].classList.remove('btn-active')
      }
    }
    this.orders = this.orderA

  }

  progress(e){
    var current = e.target
    current.classList.add('btn-active')
    var others = e.target.parentElement.childNodes
    for(let i=0;i<others.length;i++){
      if(current!=others[i]){
        others[i].classList.remove('btn-active')
      }
    }
    this.orders = this.orderB
  }

  over(e){
    var current = e.target
    current.classList.add('btn-active')
    var others = e.target.parentElement.childNodes
    for(let i=0;i<others.length;i++){
      if(current!=others[i]){
        others[i].classList.remove('btn-active')
      }
    }
    this.orders = this.orderC
  }

  pass(e){
    var current = e.target
    current.classList.add('btn-active')
    var others = e.target.parentElement.childNodes
    for(let i=0;i<others.length;i++){
      if(current!=others[i]){
        others[i].classList.remove('btn-active')
      }
    }
    this.orders = this.orderD
  }

  cancel(e){
    var current = e.target
    current.classList.add('btn-active')
    var others = e.target.parentElement.childNodes
    for(let i=0;i<others.length;i++){
      if(current!=others[i]){
        others[i].classList.remove('btn-active')
      }
    }
    this.orders = this.orderE
  }

  all(e){
    var current = e.target
    current.classList.add('btn-active')
    var others = e.target.parentElement.childNodes
    for(let i=0;i<others.length;i++){
      if(current!=others[i]){
        others[i].classList.remove('btn-active')
      }
    }
    this.orders = this.allorders
    console.log(this.orders,'orders')
  }

}
