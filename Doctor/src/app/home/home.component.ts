import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[InstApi]
})
export class HomeComponent  extends AppBase  {

  toggle=false;
  instinfo=null;

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi
  ) { 
    super(router,activeRoute,instApi);

    this.instinfo={};
    this.instApi.info({unicode:"gh"}).then((instinfo)=>{
      this.instinfo=instinfo;
    });
  }
  onMyShow(){
    
  }

  toggleSidebar(){
    this.toggle=!this.toggle;
  }
}
