import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import WebRTCAPI from 'trtc-sdk/WebRTCAPI.min.js';
import { TestApi } from 'src/providers/test.api';
import { NullTemplateVisitor } from '@angular/compiler';

//var RTC = require("trtc-sdk")
//4543a2e4772190ba03d4786ba16a3e2fa4dace9ee514c7d348280ec8de1e1705
//1400249695

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.scss'],
  providers: [InstApi, TestApi]
})
export class ConferenceComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public testApi: TestApi
  ) {
    super(router, activeRoute, instApi);
  }

  setting = 1;

  mic: MediaDeviceInfo;
  speaker: MediaDeviceInfo;
  camera: MediaDeviceInfo;


  mystream = null;
  rtc = null;

  initedrtc=false;

  onMyLoad() {

    this.refreshDevices();
  }

  onMyShow() {

  }

  startlive() {
    var that = this;


    that.rtc.startRTC({ role: "user", stream: that.mystream }, () => {

    });



  }

  refreshDevices() {
    var that = this;

    var localvideo = document.querySelector("#localvideo");
    this.initedrtc=false;

    if(that.rtc!=null){
      that.rtc.quit();
    }

    this.testApi.generatertc({}).then((sig: any) => {

      var rtc = new WebRTCAPI({
        userId: this.doctorinfo.loginname,
        userSig: sig,
        sdkAppId: "1400249695",
        accountType: "1",
        "debug": {
          "log": true, //是否在控制台打印调试日志 ,默认为false
          "vconsole": true, //是否展示 vconsole （方便在移动端查看日志）
          "uploadLog": true //是否上报日志
        }
      });

      rtc.on( 'onRemoteStreamUpdate' , function( data ){
        console.log("kk5",data);
        if( data && data.stream){
            var stream = data.stream
            console.debug( data.userId + 'enter this room with unique videoId '+ data.videoId  )
            document.querySelector("#remotevideo").srcObject = stream
        }else{
            console.debug( 'somebody enter this room without stream' )
        }
      })


      rtc.getLocalStream({
        video: true,
        audio: true,
        attributes: {
          width: 640,
          height: 480,
          frameRate: 20
        }},(info)=>{
        // info { stream }
        var stream = info.stream;
        localvideo.srcObject = stream;
        localvideo.onloadedmetadata = function (e) {
          localvideo.play();
        };

        rtc.enterRoom({ roomid: that.doctorinfo.id, appScene: "VideoCall" }, () => {
          this.initedrtc=true;
        },(err)=>{
          console.error(err);
          //alert("错误，无法进入会诊:"+err);
        });

        that.loadDevice();

      }, function (error) {
        alert("错误，无法获取摄像头");
      });

      that.rtc = rtc;

    })




  }

  loadDevice() {
    navigator.mediaDevices.enumerateDevices()
      .then((devices) => {
        console.log("kkv", devices);
        for (let device of devices) {
          if (device.kind == "audioinput" && device.deviceId == "default") {
            this.mic = device;
          }
          if (device.kind == "audiooutput" && device.deviceId == "default") {
            this.speaker = device;
          }
          if (device.kind == "videoinput") {
            this.camera = device;
          }
        }
      })
      .catch(function (err) {

        console.log(err.name + ": " + err.message);
      });



  }
}
