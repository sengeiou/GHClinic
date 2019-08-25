import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.scss'],
  providers:[InstApi]
})
export class ConferenceComponent  extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi
  ) { 
    super(router,activeRoute,instApi);
  }

  setting=1;

  mic="";
  speaker="";
  camera="";

  audioinput=[];
  audiooutput=[];

  videoinput=[];
  videooutput=[];

  onMyShow(){
    
    this.refreshDevices();
  }

  refreshDevices(){
    
    navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {

      devices.forEach(function(device) {

        console.log(device);
      });
    })
    .catch(function(err) {
      alert(2);
      console.log(err.name + ": " + err.message);
    });
  }

}
