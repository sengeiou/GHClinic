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

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.scss'],
  providers: [InstApi, DoctorApi, BsModalService,OperatorApi]
})
export class ConferenceComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public doctorApi: DoctorApi,
    private modalService: BsModalService,
    private operatorApi:OperatorApi
  ) {
    super(router, activeRoute, instApi);
    
  }

  onMyLoad(){

  }

  onMyShow(){

  }

}
