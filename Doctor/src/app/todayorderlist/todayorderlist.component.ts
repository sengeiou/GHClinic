import { Component, OnInit, TemplateRef } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { DoctorApi } from 'src/providers/doctor.api';
import { BsModalService } from 'ngx-bootstrap/modal';
import { OperatorApi } from 'src/providers/operator.api';
import { AppUtil } from '../app.util';

@Component({
  selector: 'app-todayorderlist',
  templateUrl: './todayorderlist.component.html',
  styleUrls: ['./todayorderlist.component.scss'],
  providers: [InstApi, DoctorApi, BsModalService,OperatorApi]
})
export class TodayorderlistComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public doctorApi: DoctorApi,
    public modalService: BsModalService,
    public operatorApi:OperatorApi
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
      },10*60*1000);
    }
  }

  loadClock(){
    // console.log("reloading t1",(new Date()));
    this.clock=AppUtil.FormatDateTime(new Date());
  }
  loadOrder(){
    // console.log("reloading t2",(new Date()));
    var that=this;
    
    that.operatorApi.todayorderlist({}).then((list:[any])=>{
      console.log(list,'list')
      var orderA=[];
      var orderB=[];
      var orderC=[];
      var orderD=[];
      var orderE=[];
      var orderF=[];
      for(var item of list){
      this.orders.push(item)
        item.ordertime_timespan=parseInt(item.ordertime_timespan)*1000;
        if(that.isA(item)){
          orderA.push(item);
        }else if(that.isB(item)){
          orderB.push(item);
        }else if(that.isC(item)){
          orderC.push(item);
        }else if(that.isD(item)){
          orderD.push(item);
        }else if(that.isE(item)){
          orderE.push(item);
        }
        else{
          orderF.push(item);
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
    if(item.status=="A"
      &&item.ordertime_timespan-nowtime>15*60*1000){
      return true;
    }
    return false;
  }

  isB(item){
    var nowtime=(new Date()).getTime();
    if(item.status=="A"
      &&item.ordertime_timespan-nowtime<15*60*1000
      &&item.ordertime_timespan-nowtime>0
      ){
      return true;
    }
    return false;
  }
  isC(item){
    var nowtime=(new Date()).getTime();
    if(item.status=="B"){
      return true;
    }
    return false;
  }
  isD(item){
    var nowtime=(new Date()).getTime();
    if(item.status=="C"){
      return true;
    }
    return false;
  }
  isE(item){
    var nowtime=(new Date()).getTime();
    if(item.status=="A"
      &&item.ordertime_timespan-nowtime<0
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
    }
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

  all(e){
    var current = e.target
    current.classList.add('btn-active')
    var others = e.target.parentElement.childNodes
    for(let i=0;i<others.length;i++){
      if(current!=others[i]){
        others[i].classList.remove('btn-active')
      }
    }
  }

}
