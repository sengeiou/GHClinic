import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { DoctorApi } from 'src/providers/doctor.api';
import { ApiConfig } from '../api.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[DoctorApi]
})
export class LoginComponent   extends AppBase  {

  loginname='';
  password='';
  isremember=false;

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public doctorApi:DoctorApi
  ) { 
    super(router,activeRoute,instApi);
    this.isLoginPage=true;
  }
  onMyShow(){
    this.loginname=window.localStorage.getItem("lastloginname");
    if(this.loginname==null){
      this.loginname="";
    }
    this.password=window.localStorage.getItem("lastpassword");
    if(this.password==null){
      this.password="";
    }
  }
  trylogin(){
    if(this.loginname==''||this.password==''){
      return;
    }
    this.doctorApi.login({loginname:this.loginname,password:ApiConfig.MD5(this.password)}).then((res:any)=>{
      if(res.code=="0"){
        this.navigate("/home");
      }else{
        
      }
    });
  }

}