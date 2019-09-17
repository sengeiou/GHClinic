import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import WebRTCAPI from 'trtc-sdk/WebRTCAPI.min.js';
import { TestApi } from 'src/providers/test.api';
import { NullTemplateVisitor } from '@angular/compiler';
import { OrderApi } from 'src/providers/order.api';
import { TabHeadingDirective } from 'ngx-bootstrap/tabs/public_api';
import { AppUtil } from '../app.util';

//var RTC = require("trtc-sdk")
//4543a2e4772190ba03d4786ba16a3e2fa4dace9ee514c7d348280ec8de1e1705
//1400249695

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.scss'],
  providers: [InstApi, TestApi, OrderApi]
})
export class ConferenceComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public testApi: TestApi,
    public orderApi: OrderApi
  ) {
    super(router, activeRoute, instApi);
  }

  showtype = 1;//1聊天记录，2病人信息，3.设置

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


  onMyLoad() {
  }

  onMyShow() {
    this.refreshDevices();
    // for(var i=67;i<=73;i++){
    //   var data={userId:i};
    //   this.LoadOrder(data);
    // }
  }

  play = false;

  startlive() {
    var that = this;
    that.rtc.startRTC({ role: "user", stream: that.mystream }, () => {
      that.play = true;
    });
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


    this.testApi.generatertc({}).then((sig: any) => {
      //alert(that.InstInfo.rtcappid);
      var rtc = new WebRTCAPI({
        userId: this.doctorinfo.loginname,
        userSig: sig,
        sdkAppId: that.InstInfo.rtcappid,
        accountType: "1",
        "debug": {
          "log": true, //是否在控制台打印调试日志 ,默认为false
          "vconsole": true, //是否展示 vconsole （方便在移动端查看日志）
          "uploadLog": true //是否上报日志
        },
        attributes:{
            width:640,
            height:480,
            frameRate:50
        }
      });




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
        var stream = info.stream;
        // localvideo.srcObject = stream;
        // localvideo.onloadedmetadata = function (e) {
        //   localvideo.play();
        // };

        var meter = WebRTCAPI.SoundMeter({
          stream: info.stream,
          onprocess: function (data) {
            that.volume = data.volume;
          }
        })

        rtc.enterRoom({ roomid: that.doctorinfo.id,appScene:"VideoCall",role:"anchor" }, () => {
          this.initedrtc = true;

          rtc.on('onLocalStreamAdd', function (data) {
            if (data && data.stream) {
              var stream = data.stream;
              localvideo.srcObject = stream;

              localvideo.onloadedmetadata = function (e) {
                localvideo.play();
              };
            }
          })
          rtc.on('onRemoteStreamUpdate', function (data) {
            console.log("kk5", data);
            if (data && data.stream) {
              var stream = data.stream;
              //that.remotestream = stream;
              console.debug(data.userId + 'enter this room with unique videoId ' + data.videoId, data);
              //alert(data.userId);
              console.log("ccbcc0",that.currentorder);
              if(that.currentorder==null){
                console.log("ccbcc1",that.currentorder);
                that.LoadOrder(data);
              }else{
                console.log("ccbcc2",that.currentorder);
                if(that.currentorder.id!=data.userId){
                  console.log("ccbcc3",that.currentorder);
                  that.LoadOrder(data);
                }else{
                  console.log("ccbcc4",that.currentorder);
                  that.currentorder.streamdata=data;
                  remotevideo.srcObject = that.currentorder.streamdata.stream;
                }
              }
              // remotevideo.srcObject = that.remotestream;
              // try {
              //   remotevideo.onloadedmetadata = function (e) {
              //     remotevideo.play();
              //   };
              // } catch (e) {
              //   alert(e);
              // }
            } else {
              //alert("kk7");
              //console.debug('somebody enter this room without stream')
            }
          })


          rtc.on('onRemoteStreamRemove', function (data) {
            if(that.currentorder!=null&&that.currentorder.id==data.userId){
              alert("对方断开链接，等待重新接入，请勿刷新页面");
            }
          })


        }, (err) => {
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

  orderlist = [];
  currentorder = null;
  currentinterval=null;

  endmeeting(order){

    if(confirm("确定结束会诊？")){

      this.stoplive();
      order.orderstatus="C";
      order.orderstatus_name="完成会诊";
      this.orderApi.end({order_id:order.id}).then((ret:any)=>{
        order.meetingend_formatting=ret.return;
      });;
      if(this.currentinterval!=null){
        clearInterval(this.currentinterval);
        this.currentinterval=null;
      }
      this.currentorder=null;
    }

    

  }

  startmeeting(order) {
    this.startlive();
    var remotevideo: HTMLVideoElement = document.querySelector("#remotevideo");
    this.currentorder = order;
    if(this.currentorder.orderstatus=="A"){
      this.currentorder.meetingduration=0;
      this.currentorder.orderstatus="B";
      this.currentorder.orderstatus_name="会诊中";
      this.orderApi.start({order_id:this.currentorder.id}).then((ret:any)=>{
        this.currentorder.meetingstart_formatting=ret.return;
      });
    }
    if(this.currentinterval!=null){
      clearInterval(this.currentinterval);
      this.currentinterval=null;
    }
    
    this.currentinterval=setInterval(()=>{
      this.currentorder.meetingduration++;
      //alert(this.currentorder.meetingduration);
      this.orderApi.timeupdate({order_id:this.currentorder.id,time:this.currentorder.meetingduration});
      this.currentorder.timestr=AppUtil.TimeFormatting(this.currentorder.meetingduration);
      console.log("time update"+this.currentorder.timestr);
    },1000);
    console.log("vvk",order);
    remotevideo.srcObject = order.streamdata.stream;
    try {
      remotevideo.onloadedmetadata = function (e) {
        remotevideo.play();
      };
    } catch (e) {
      alert(e);
    }
  }

  LoadOrder(streamdata) {
    var order_id = streamdata.userId;
    //alert(order_id);
    this.orderApi.info({ id: order_id }).then((orderinfo: any) => {
      if (orderinfo == null) {
        //var order={unknow:"Y",streamdata:streamdata};
        //this.orderlist.push(order);
      } else {
        for (let order of this.orderlist) {
          if (order.id == order_id) {
            return;
          }
        }
        orderinfo.streamdata = streamdata;
        this.orderlist.push(orderinfo);

        this.orderlist.sort((a, b) => {
          var oct=Number(a.ordertime_timespan) -Number(b.ordertime_timespan) ;
          console.log("kkt",oct,a,b);
          return oct;
        })
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
  onUnload(){
    if(this.currentinterval!=null){
      clearInterval(this.currentinterval);
    }
    if(this.rtc!=null){
      this.stoplive();
      this.rtc.quit();
    }
  }
}
