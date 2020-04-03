import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OperatorApi } from 'src/providers/operator.api';
import { OrderApi } from 'src/providers/order.api';

@Component({
  selector: 'app-patient-management',
  templateUrl: './patient-management.component.html',
  styleUrls: ['./patient-management.component.scss'],
  providers:[OperatorApi,OrderApi]
})
export class PatientManagementComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public operatorApi:OperatorApi,
    public orderApi:OrderApi,
  ) { 
    super(router,activeRoute,instApi);
  }
  orderlist=null
  name=""
  date=""
  mobile=""
  templist=null
  onMyShow(){

    this.getorder()
   
  }

  getorder(){
    this.orderApi.orderlist({doctor_id:this.params.doctor_id}).then((orderlist:any)=>{
      console.log(orderlist,'orderlist')
      this.orderlist = orderlist
      this.templist=orderlist
    })
  }

  search(){

    if(this.name!=""){
      if(this.date!=""){
        if(this.mobile!=""){
          this.orderlist = this.templist.filter(item=>{
            console.log(item)
            if(this.yanname(item,this.name) && this.yanmobile(item,this.mobile)&&this.yandate(item,this.date)){
              return item
            }
          })
        }else {
          this.orderlist = this.templist.filter(item=>{
            console.log(item)
            if(this.yanname(item,this.name)&&this.yandate(item,this.date)){
              return item
            }
          })
        }
      }else {
        if(this.mobile!=""){
          this.orderlist = this.templist.filter(item=>{
            console.log(item)
            if(this.yanname(item,this.name) && this.yanmobile(item,this.mobile)){
              return item
            }
          })
        }else {
          this.orderlist = this.templist.filter(item=>{
            console.log(item)
            if(this.yanname(item,this.name)){
              return item
            }
          })
        }
      }
    }else {
      if(this.date!=""){
        if(this.mobile!=""){
          this.orderlist = this.templist.filter(item=>{
            console.log(item)
            if( this.yanmobile(item,this.mobile)&&this.yandate(item,this.date)){
              return item
            }
          })
        }else {
          this.orderlist = this.templist.filter(item=>{
            console.log(item)
            if(this.yandate(item,this.date)){
              return item
            }
          })
        }
      }else {
        if(this.mobile!=""){
          this.orderlist = this.templist.filter(item=>{
            console.log(item)
            if( this.yanmobile(item,this.mobile)){
              return item
            }
          })
        }else {
          this.onMyShow()
        }
      }
    }
    
  }
  reset(){
    this.name = "";
    this.mobile = "";
    this.date = "";
    this.onMyShow();
  }
  yanname(item,str){
    if(item.patientname==str){
      return true
    }else {
      return false
    }
  } 

  yandate(item,str){
    if(item.ordertime_dateformat==str){
      return true
    }else {
      return false
    }
  } 

  yanmobile(item,str){
    if(item.patientmobile==str){
      return true
    }else {
      return false
    }
  } 
  jieshuhuizhen(item){
    console.log(item)
    this.orderApi.end({order_id:item.id}).then((end:any)=>{
      console.log(end)
      if(end.code=='0'){
        this.onMyShow();
      }
    })
  }
}
