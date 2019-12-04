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
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss'],
  providers: [InstApi, DoctorApi, BsModalService,OperatorApi]
})
export class DoctorComponent extends AppBase {

  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public doctorApi: DoctorApi,
    private modalService: BsModalService,
    private operatorApi:OperatorApi
  ) {
    super(router, activeRoute, instApi);
    this.doctor = {};


    this.options = { concurrency: 1, maxUploads: 3 };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  doctor = null;

  onMyShow() {

    this.doctorApi.info({ id: this.params.id }).then((doctor: any) => {
      var str = ""
     doctor.departmentlist.filter(item=>{
     
        if(str.length>0){
          str += "、"+item.name ;
        }else {
          str +=item.name ;
        }
      })
      doctor.depart = str;
      this.doctor = doctor;
      
      console.log(doctor)
      
    })

  }
  save(template: TemplateRef<any>) {
    //this.modalService.show(template,{});
    //return;
    // if(this.doctor.name.trim()==""){
    //   this.modalService.show(str,{});
    //   
    // }
    var json = {
      primary_id: this.doctor.id,
      name:this.doctor.name,
      title:this.doctor.title,
      photo:this.doctor.photo,
      description:this.doctor.description,
      departmentlist:this.doctor.departmentlist
    };
    console.log(this.doctor.depart,'llll');
    var arr = [];
    arr = this.doctor.depart.split("、");
    for(let i=0;i<arr.length;i++){
      if(this.checkdep(arr[i],this.doctor.departmentlist)){
        console.log(arr[i]);
      }
    }
    console.log(arr)
    console.log(this.doctor.departmentlist,'2222');
    // this.operatorApi.doctorupdate(json).then(()=>{
    //   this.modalService.show(template,{});
    // });
  }
checkdep(item,arr){
  for(let nn of arr){
    if(item==nn.name){
      return false
    }
  }
  return true
}
  onUploadOutput(output: UploadOutput): void {
    switch (output.type) {
      case 'allAddedToQueue':
        break;
      case 'addedToQueue':
        if (typeof output.file !== 'undefined') {
          this.files.push(output.file);
        }
        break;
      case 'uploading':
        if (typeof output.file !== 'undefined') {
          // update current data in files array for uploading file
          const index = this.files.findIndex((file) => typeof output.file !== 'undefined' && file.id === output.file.id);
          this.files[index] = output.file;
        }
        break;
      case 'removed':
        // remove file from array when removed
        this.files = this.files.filter((file: UploadFile) => file !== output.file);
        break;
      case 'done':
        // The file is downloaded
        console.log(output);
        var res = output.file.response.split("|");
        //success|~~|6c1ba761b75d631fb9c8507df5a9dfda_19082919048_1578887646.jpg
        if (res[0] == "success") {
          this.doctor.photo = res[2];
        }
        break;
    }
  }

  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: ApiConfig.getFileUploadAPI(),
      method: 'POST',
      data: { field: 'file', module: "doctor" }
    };

    this.uploadInput.emit(event);
  }

  back(){
    this.navigate("doctorlist");
  }
}
