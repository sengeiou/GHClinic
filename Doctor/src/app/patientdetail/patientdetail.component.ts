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
    this.orderApi.orderlist({member_id: this.params.member_id}).then((orderlist:any)=>{
      console.log(orderlist)
      this.orderlist = orderlist.sort(this.compare("id"))

    })
  }
  compare(pro){
    return function(a,b){
      return a[pro]-b[pro]
    }
  }
  memId=0
  change(item){
    console.log(item)
    this.memId=item
  }
}