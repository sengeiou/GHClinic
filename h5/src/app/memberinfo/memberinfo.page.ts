import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { Http } from '@angular/http';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

@Component({
  selector: 'app-memberinfo',
  templateUrl: './memberinfo.page.html',
  styleUrls: ['./memberinfo.page.scss'],
  providers:[MemberApi,Camera,FileTransfer]
})
export class MemberinfoPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public actionSheetController: ActionSheetController,
    public camera: Camera,
    public http: Http,
    public transfer: FileTransfer,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
  }
photo=""
mobile =""
name=""
oldname=""
  onMyShow(){
    console.log(this.MemberInfo)
    this.mobile = this.MemberInfo.mobile
    this.name = this.MemberInfo.name
    this.oldname = this.MemberInfo.name
    this.photo=this.MemberInfo.photo
  }

  savename(){
    if(this.name!="" && this.name!=this.oldname){
      this.memberApi.updatemember({name: this.name}).then((updatemember)=>{
        console.log(updatemember)
        if(updatemember){
          location.replace('tabs/tab4')
        }
      })
    }
  }
  upload(ec) {
    var that = this;
    var file = ec.target.files[0];
    console.log("file",file);
    if(file.type=='image/jpeg'||file.type=='image/png'){
      
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        var data = e.target.result;
        console.log(data);
        that.uploadBase64(that.http, data, "member").then((filename) => {
          //alert(filename);
          this.memberApi.updatemember({ touxian: filename }, false).then(data => {
            if (data.code == "0") {
              this.photo = String(filename);
              AppBase.MemberInfo.photo=String(filename);
            }
          });
        });
      }
    }else{
      this.toast("请上传图片文件");
    }

  }

  async selectPhoto() {
    const actionSheet = await this.actionSheetController.create({
      header: "选择头像",
      buttons: [
        {
          text: "立即自拍",
          handler: () => {
            let options: CameraOptions = {
              quality: 75,
              targetWidth: 200,
              targetHeight: 200,
              allowEdit: true,
              destinationType: this.camera.DestinationType.FILE_URI,
              sourceType: this.camera.PictureSourceType.CAMERA,
              encodingType: this.camera.EncodingType.JPEG
            };
            this.camera.getPicture(options).then((imagepath) => {
              this.uploadFile(this.transfer, imagepath, "member").then(photo => {
  
                this.memberApi.updatemember({ touxian: photo }, false).then(data => {
                  if (data.code == "0") {
                    this.photo = String(photo);
                  }
                });
  
              });
            }, (err) => {
              // Handle error
            });
          }
        }, 
        {
          text: "从相册选择",
          handler: () => {
            let options: CameraOptions = {
              quality: 75,
              targetWidth: 200,
              targetHeight: 200,
              allowEdit: true,
              destinationType: this.camera.DestinationType.FILE_URI,
              sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
              encodingType: this.camera.EncodingType.JPEG,
              mediaType: this.camera.MediaType.PICTURE
            };
  
            this.camera.getPicture(options).then((imagepath) => {
              this.uploadFile(this.transfer, imagepath, "member").then(photo => {
                //alert(photo);
                this.memberApi.updatemember({ touxian: photo }, false).then(data => {
                  if (data.code == "0") {
                    this.photo = String(photo);
                  }
                });
              });
            }, (err) => {
              // Handle error
            });
          }
        }
      ]
    });
    await actionSheet.present();
  }

}
