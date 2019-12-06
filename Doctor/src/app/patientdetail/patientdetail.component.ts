import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OrderApi } from 'src/providers/order.api';

@Component({
  selector: 'app-patientdetail',
  templateUrl: './patientdetail.component.html',
  styleUrls: ['./patientdetail.component.scss'],
  providers:[InstApi,OrderApi]
})
export class PatientdetailComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public orderApi:OrderApi,
  ) { 
    super(router,activeRoute,instApi);
  }
  orderlist=null
 

  onMyShow(){
    this.imgs = []
    this.orderApi.orderlist({patientmobile: this.params.patientmobile}).then((orderlist:any)=>{
      console.log(orderlist)
      this.orderlist = orderlist.sort(this.compare("id"))
     for(let i=0;i<this.orderlist.length;i++){
       this.orderlist[i].minute = (this.orderlist[i].meetingduration/60).toFixed(0);
       this.orderlist[i].second =  this.orderlist[i].meetingduration%60
      this.zhenresult = this.orderlist[0].result
      this.doctor_id = this.orderlist[0].id
     }
      
      console.log(this.imgs,'img')

    })
  }
  compare(pro){
    return function(a,b){
      return a[pro]-b[pro]
    }
  }
  memId=0
  zhenresult=""
  doctor_id=""
  change(item,i){
    console.log(item)
    this.zhenresult = item.result
    this.doctor_id = item.doctor_id
    this.memId=i
  }

  big=0
  imgs = null
  show=false
  changbig(item,j){
    this.show=true
    console.log(item)
    this.imgs=item.photolist
    this.big = j
    // console.log(this.imgs)
  }

  prev(i){
    console.log(i,'iiii')

    if(i=="a"){
      this.big = this.big-1
      if(this.big<0){
        this.big = this.imgs.length-1
      }else if(this.big>this.imgs.length-1){
        this.big = 0
      }else {
        this.big = this.big
      }
    }else if(i=="b"){
      this.big = this.big + 1
      if(this.big<0){
        this.big = this.imgs.length-1
      }else if(this.big>this.imgs.length-1){
        this.big = 0
      }else {
        this.big = this.big
      }
    }
    
    console.log(this.big,'llll')
   
  }
 
  saveresult(){
    console.log(this.zhenresult)
    this.orderApi.addresult({order_id: this.doctor_id,result:this.zhenresult}).then((ret)=>{
      console.log(ret)
      if(ret){
       alert("保存成功！")
        this.onMyShow()
      }
    })
  }

}