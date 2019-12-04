import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { DoctorApi } from 'src/providers/doctor.api';
import { OperatorApi } from 'src/providers/operator.api';

@Component({
  selector: 'app-doctorlist',
  templateUrl: './doctorlist.component.html',
  styleUrls: ['./doctorlist.component.scss'],
  providers:[InstApi,OperatorApi]
})
export class DoctorlistComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public operatorApi:OperatorApi
  ) { 
    super(router,activeRoute,instApi);
  }

  doctorlist=[];
  onMyShow(){
    
    this.operatorApi.doctorlist({}).then((doctorlist:[])=>{
      this.doctorlist=doctorlist;
    })

  
  }

  gotoDoctor(doctor){
    this.navigate("/doctor",{id:doctor.id});
  }

}
