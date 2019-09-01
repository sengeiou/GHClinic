import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OperatorApi } from 'src/providers/operator.api';
import { DoctorApi } from 'src/providers/doctor.api';
import { ApiConfig } from '../api.config';
import { AppUtil } from '../app.util';


@Component({
  selector: 'app-doctorschedule',
  templateUrl: './doctorschedule.component.html',
  styleUrls: ['./doctorschedule.component.scss'],
  providers:[InstApi,OperatorApi,DoctorApi]
})
export class DoctorscheduleComponent  extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public doctorApi:DoctorApi,
    public operatorApi:OperatorApi
  ) { 
    super(router,activeRoute,instApi);
  }

  static RangeDate=28;
  doctorlist=[];
  onMyShow(){
    var sdate=AppUtil.FormatDate(new Date());
    var edate=AppUtil.FormatDate( new Date( (new Date()).getTime()+DoctorscheduleComponent.RangeDate*24*3600*1000));
    this.operatorApi.doctorlist({needarrange:"Y",sdate,edate}).then((doctorlist:[])=>{
      
      this.doctorlist=doctorlist;

    });
  }

}
