import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';

var RTC = require("trtc-sdk")

//4543a2e4772190ba03d4786ba16a3e2fa4dace9ee514c7d348280ec8de1e1705
//1400249695

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.scss'],
  providers: [InstApi]
})
export class ConferenceComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi
  ) {
    super(router, activeRoute, instApi);
  }

  setting = 1;

  mic: MediaDeviceInfo;
  speaker: MediaDeviceInfo;
  camera: MediaDeviceInfo;


  mysteam = "";

  onMyShow() {

    this.refreshDevices();
  }

  refreshDevices() {


    var localPeerConnection = new RTCPeerConnection();

    let ms = new MediaStream();
    console.log("kk", ms);
    var video = document.querySelector("video");
    var media = navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream: MediaStream) => {

      console.log("kk2", stream);
      video.srcObject = stream;
      video.onloadedmetadata = function (e) {
        video.play();
      };


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


      console.log("kk3", media);

    }, (err) => {
      alert(err);
    });
  }

}
