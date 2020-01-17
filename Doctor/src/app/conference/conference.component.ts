import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import WebRTCAPI from 'trtc-sdk/WebRTCAPI.min.js';
import { TestApi } from 'src/providers/test.api';
import { NullTemplateVisitor } from '@angular/compiler';
import { OrderApi } from 'src/providers/order.api';
import { DoctorApi } from 'src/providers/doctor.api';
import { OperatorApi } from 'src/providers/operator.api';

//var RTC = require("trtc-sdk")
//4543a2e4772190ba03d4786ba16a3e2fa4dace9ee514c7d348280ec8de1e1705
//1400249695

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.scss'],
  providers: [InstApi, TestApi, OrderApi, DoctorApi, OperatorApi]
})
export class ConferenceComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public testApi: TestApi,
    public orderApi: OrderApi,
    public doctorApi: DoctorApi,
    public operatorApi: OperatorApi
  ) {
    super(router, activeRoute, instApi);
    this.doctorinfo = {};
    this.orderinfo = {};
  }


  showtype = 1;//1病人信息，2聊天记录，3.设置

  setting = 1;

  mic: MediaDeviceInfo;
  speaker: MediaDeviceInfo;
  camera: MediaDeviceInfo;

  mystream = null;
  remotestream = null;
  rtc = null;

  initedrtc = false;
  volume = 0;

  cameraopen = true;
  micopen = true;

  inmeeting = false;

  onMyLoad() {

  }

  startmeeting() {

    this.inmeeting = true;
    this.startlive();
  }
  times = 0;
  time1 = null;
  jishi() {
    this.time1 = setInterval(() => {
      this.times++
    }, 1000);
  }

  tizhi() {
    clearInterval(this.time1);
  }

  orderinfo = null;
  doctorinfo = null;
  continues = 'N'
  onMyShow() {
    if (this.params.orderstatus == "B") {
      this.continues = 'Y'
    }

    this.orderApi.info({ id: this.params.order_id }).then((orderinfo: any) => {
      console.log(orderinfo, 'ppp')
      this.orderinfo = orderinfo;
      this.doctorApi.info({ id: orderinfo.doctor_id }).then((doctorinfo: any) => {
        this.doctorinfo = doctorinfo;
        this.refreshDevices();
      });
    });

  }

  play = false;

  timeinterval = null;
  startlive() {
    var that = this;
    that.rtc.startRTC({ role: "user", stream: that.mystream }, () => {
      that.play = true;
    });
    if (this.timeinterval != null) {
      clearInterval(this.timeinterval);
      this.timeinterval = null;
    }
    this.timeinterval = setInterval(() => {
      this.operatorApi.doctorcurrent({ doctor_id: this.orderinfo.doctor_id }).then((ret: any) => {
        console.log("ccj", ret);
        var remotevideo: HTMLVideoElement = document.querySelector("#remotevideo");
        if (ret.currentorder != this.orderinfo.id) {
          remotevideo.srcObject = null;
        } else {
          if (remotevideo.srcObject == null || remotevideo.srcObject != that.remotestream) {
            remotevideo.srcObject = that.remotestream;
          }
        }
      });
    }, 5000);
    this.orderApi.start({ order_id: this.params.order_id }).then(() => {
    })
  }
  onUnload() {
    if (this.timeinterval != null) {
      clearInterval(this.timeinterval);
      this.timeinterval = null;
    }
  }
  back() {
    this.navigate("/todayorderlist");
  }
  stoplive() {
    var that = this;
    that.rtc.stopRTC({}, () => {
      that.play = false;
    });
  }

  refreshDevices() {
    WebRTCAPI.detectRTC({

    }, function (info) {
      if (!info.support) {
        //alert('当前浏览器不支持网页会议技术')
      }
    });


    var that = this;

    var localvideo: HTMLVideoElement = document.querySelector("#localvideo");
    var remotevideo: HTMLVideoElement = document.querySelector("#remotevideo");
    this.initedrtc = false;

    if (that.rtc != null) {
      that.rtc.quit();
    }


    this.testApi.generatertc({ userid: that.orderinfo.id }).then((sig: any) => {
      //userId要和generatertc接口中的值一样才不会报错
      var rtc = new WebRTCAPI({
        userId: that.orderinfo.id,
        userSig: sig,
        sdkAppId: that.InstInfo.rtcappid,
        accountType: "1",
        "debug": {
          "log": true, //是否在控制台打印调试日志 ,默认为false
          "vconsole": true, //是否展示 vconsole （方便在移动端查看日志）
          "uploadLog": true //是否上报日志
        }
      }, () => {





        rtc.getLocalStream({
          video: true,
          audio: true,
          attributes: {
            width: 640,
            height: 480,
            frameRate: 20
          }
        }, (info) => {
          // info { stream }
          // var stream = info.stream;
          //  localvideo.srcObject = stream;
          //  localvideo.onloadedmetadata = function (e) {
          //    localvideo.play();
          //  };
          that.mystream = info.stream;

          var meter = WebRTCAPI.SoundMeter({
            stream: info.stream,
            onprocess: function (data) {
              that.volume = data.volume;
            }
          })
          //roomid: that.doctorinfo.id
          //alert(that.orderinfo.id);
          rtc.enterRoom({ roomid: this.doctorinfo.id, appScene: "VideoCall", role: "anchor" }, () => {
            this.initedrtc = true;


            rtc.on('onLocalStreamAdd', function (data) {
              //alert(data);
              if (data && data.stream) {
                var stream = data.stream;
                localvideo.srcObject = stream;
                localvideo.muted = true;
                localvideo.autoplay = true;

                localvideo.onloadedmetadata = function (e) {

                  localvideo.play();
                };
              }
            })


            //alert("?" );
            rtc.on('onRemoteStreamUpdate', function (data) {
              console.log("kk5", data);
              //alert(data.userId+"="+that.orderinfo.id+"_d" );
              if (data && data.stream && data.userId == that.orderinfo.id + "_d") {
                //  alert(data.userId+"="+that.orderinfo.id+"_d2" );

                var stream = data.stream;
                that.remotestream = stream;
                console.debug(data.userId + 'enter this room with unique videoId ' + data.videoId, data)
                remotevideo.srcObject = that.remotestream;
                //this.jishi();
                try {
                  remotevideo.onloadedmetadata = function (e) {
                    remotevideo.play();
                  };
                } catch (e) {
                  alert(e);
                }

              } else {
                //alert("kk7");
                console.debug('somebody enter this room without stream')
              }
            })


            rtc.on('onRemoteStreamRemove', function (data) {
              //alert("对方断开链接");
              this.tizhi();
            })


          }, (err) => {
            console.error(err);
            //alert("错误，无法进入会诊:"+err);
          });

          that.loadDevice();

        }, function (error) {
          alert("错误，无法获取摄像头");
        });

      });
      that.rtc = rtc;

    })
  }

  determine() {
    console.log(this.timeinterval, 'timeinterval')
    console.log(this.params.order_id, 'ppp')
    this.orderApi.end({ order_id: this.params.order_id }).then((ret) => {
      if (ret) {
        this.stoplive();
        this.orderApi.timeupdate({ order_id: this.params.order_id, time: this.times }).then((ret) => {
          console.log(ret);
        })
        this.times = 0;
        // this.orderApi.timeupdate({order_id:this.params.order_id}).then(()=>{

        // })
        this.navigate("/todayorderlist");
      }
    });

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

  toggleCamera() {
    if (this.cameraopen == true) {

      this.rtc.closeVideo();
      this.cameraopen = false;
    } else {

      this.rtc.openVideo();
      this.cameraopen = true;
    }
  }
  toggleMic() {
    if (this.micopen == true) {

      this.rtc.closeAudio();
      this.micopen = false;
    } else {

      this.rtc.openAudio();
      this.micopen = true;
    }
  }
  imgs = []
  changbig(item) {
    this.imgs = []
    console.log(item)
    this.imgs.push(item)
    console.log(this.imgs)
  }

  zhenresult = ""
  saveresult() {
    console.log(this.zhenresult)
    this.orderApi.addresult({ order_id: this.params.order_id, result: this.zhenresult }).then((ret) => {
      console.log(ret)
    })
  }

  zhanting() {
    this.stoplive();
    this.tizhi();
    console.log(this.times);
    this.inmeeting = false;
    this.continues = "Y";
  }
}
