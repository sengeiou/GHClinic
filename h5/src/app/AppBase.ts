import { ApiConfig } from "./api.config";
import { AppUtil } from "./app.util";
import { NavController, ModalController, ToastController, NavParams, AlertController }
    from "@ionic/angular";
import { InstApi } from "../providers/inst.api";
import { DindanApi } from '../providers/dindan.api';
import { MemberApi } from "../providers/member.api";
import { XitongApi } from '../providers/xitong.api';
import { WechatApi } from "../providers/wechat.api";
import { AppComponent } from "./app.component";
import { ReturnStatement } from "@angular/compiler";
import { ViewController } from '@ionic/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { OnInit } from '@angular/core';
import { TabsPage } from './tabs/tabs.page';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { ActivityApi } from '../providers/activity.api';
import { OrderApi } from '../providers/order.api';
import { TijianApi } from '../providers/tijian.api';




declare let wx: any;

export class AppBase implements OnInit {
    public needlogin = true;

    public static TABName = "";
    public static LASTTAB = null;
    public static CurrentRoute: Router = null;
    public static CurrentNav: NavController = null;

    public static myapp: AppComponent = null;
    public static instapi: InstApi = null;
    public static dindanapi: DindanApi = null;
    public static xitongApi: XitongApi =null;
    public static activityApi:ActivityApi=null;
    public static memberapi: MemberApi = null;
    public static orderApi:OrderApi=null;
    public static tijanApi:TijianApi=null;
    public static wechatApi: WechatApi = null;
    public static UNICODE = "gh";
    public static IsLogin = false;
    public statusBarStyle = "X";//{DARK}
    public uploadpath: string = ApiConfig.getUploadPath();
    public util = AppUtil;
    public static Resources = null;
    public res = null;
     
   

    public static InstInfo = null;
    public static MemberInfo = null;
    public InstInfo = {
        orderlimit: 2, h5sharelogo: "", h5sharetitle: "", h5sharedesc: "", tel: "",
        h5appid: "", kf: "", openning: "", successtips: "", orderneedknow: "", name: "", logo: "",
        memberlogo: "", undershipping: 0, shippingfee: 0, about1: "", about2: "", about3: "", about4: "", about5: "",version:"",copyright: "",
        count1:0,count2:0,count:0,count5:0,count33:0,count44:0,count3:0,count4:0,count6:0
    };
    public openid="";
    public MemberInfo = { avatarUrl: "", nickName: "", h5openid: "", unionid: "", name: '',mobile:"",id:"",photo:'',issales_value:'' };
    public static MYBABY = [];
    public mybaby = [];
    public options = null;
    public params: Params = null;

    public keyt = "memberinfo99";
    public stat = "stat9";

    public firseonshow = true;
    public scrolltop = 0;
    public headerscroptshow = 0;

    static Current = null;
    currentpage = "";

    static STATICRAND = "";


    public constructor(
        public router: Router,
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public activeRoute: ActivatedRoute) {

        this.activeRoute.queryParams.subscribe((params: Params) => {
            console.log(params);
            this.params = params;
        });
        this.res = [];
        this.openid=window.localStorage.getItem("openid");
    }
    setStatusBar() {
        //  this.statusBar.styleLightContent();
    }
    ngOnInit() {

        ApiConfig.SetUnicode(AppBase.UNICODE);
        this.getResources();
        this.getInstInfo();
        this.onMyLoad();
        this.setStatusBar();
    }


    store(name, value = null) {
        if (value == null) {
            return window.localStorage.getItem(name);
        } else {
            window.localStorage.setItem(name, value);
            return "";
        }
    }


    onMyLoad() {
    }
    getInstInfo() {
        console.log(454444);
        if (AppBase.InstInfo == null) {
            AppBase.instapi.info({}, false).then((InstInfo) => {
                AppBase.InstInfo = InstInfo;
                this.InstInfo = InstInfo;
                this.InitWechat();
                if (this.params.code != undefined ) {
                    
                } else {
                    var isred=window.sessionStorage.getItem("isred");
                    if(isred=="Y"){

                    }else{
                        window.sessionStorage.setItem("isred","Y");
                        var url = window.location.href;
                        var redirecturl = encodeURIComponent(url);
                        var redurl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + this.InstInfo.h5appid + "&redirect_uri=" + redirecturl + "&response_type=code&scope=snsapi_userinfo&state=" + AppBase.STATICRAND + "#wechat_redirect";    
                        window.location.href=redurl;
                    }
                }
            });
        } else {
            this.InstInfo = AppBase.InstInfo;
            //this.setWechatShare();
            this.InitWechat();
        }

        if (this.params.code != undefined ) {
            AppBase.memberapi.getuserinfo({  code: this.params.code, grant_type: "authorization_code" }).then((MemberInfo) => {
                if(MemberInfo.errcode==undefined){
                    this.openid=MemberInfo.openid;
                    console.log("userinfo",MemberInfo);
                    window.localStorage.setItem("openid",this.openid);
                }
            });
        }
    }
    getMemberInfo() {

        AppBase.memberapi.info({}).then((memberinfo) => {
            if (memberinfo == null || memberinfo.mobile == undefined || memberinfo.mobile == "") {
                memberinfo = null;
            }
            this.MemberInfo = memberinfo;

        });
    }
    shouye() {
        this.navigate("/tabs/tab1");
    }
    getResources() {
        if (AppBase.Resources == null) {
            AppBase.instapi.resources({}, false).then((res) => {
                console.log(res);
                AppBase.Resources = res;
                this.res = res;
            });
        } else {
            this.res = AppBase.Resources;
        }
    }
    order1=[];
    order2=[];
    ionViewDidEnter() {
        //AppBase.devicename=AppComponent.Instance.devicename;
        //AppBase.devicename="AppComponent.Instance.devicename";
         
        if (TabsPage.Instance != null) {
            TabsPage.Instance.currentpage = this.currentpage;
            console.log("哈哈哈哈");
            console.log(TabsPage.Instance.currentpage);
        }

        AppBase.CurrentRoute = this.router;
        AppBase.CurrentNav = this.navCtrl;
        AppBase.Current = this;



        var token = window.localStorage.getItem("UserToken");
        console.log(this.MemberInfo);

        console.log("这是token");
        console.log(token);







        if (token == null) {
            if (this.needlogin == true) {
                 
                this.navigate("login");

            } else {
                this.onMyShow();
            }
        } else {
            console.log(11111);
            console.log(token);
            ApiConfig.SetToken(token);
            AppBase.memberapi.info({}).then((memberinfo) => {
                console.log("进来了熬哈哈");
                AppBase.MemberInfo = memberinfo;
             
                
                if (memberinfo == null || memberinfo.mobile == undefined || memberinfo.mobile == "") {

                    memberinfo = null;
                    if (this.needlogin == true) {
                        this.navigate("login");
                        return;
                    }
                }
                AppBase.IsLogin = memberinfo == null ? false : true;
                this.MemberInfo = memberinfo;

                


                this.onMyShow();
            });
        }
      
        this.firseonshow = false;
       
           
          
    
    AppBase.activityApi.huoquactivityinfo({}).then((activityinfo)=>{
    var ainfo=[];
    var ainfo1=[];
    var count3=0;
    var count33=0;
      for(let ai of activityinfo){
        var aT=new Date(ai.activity_activitytime).getTime();
        console.log(ai.activty_activityTime)
        var nT=new Date().getTime();
        if(nT-aT<=0){
          if(ai.zhuangtai=='A'){
            if(ai.read_status=='B'){
            ainfo.push(ai)
            }
            if(ai.read_status1=='B'){
              ainfo1.push(ai)
            }
          }
        }
      }
      count3=ainfo.length;
      AppBase.InstInfo.count3=count3; 
      count33=ainfo1.length;
      AppBase.InstInfo.count33=count33;  
      console.log('abcdefg'+AppBase.InstInfo.count3);   
      console.log('abcdef'+AppBase.InstInfo.count33); 
      AppBase.orderApi.wodeyuyue({}).then((wodeyuyue)=>{
        var yuyue=[];
        var yuyue1=[];
        var count4=0;
        var count44=0;
          for(let yy of wodeyuyue){
            if(yy.orderstatus=='A'){
              if(yy.read_status=='B'){
              yuyue.push(yy);
              }
              if(yy.read_status1=='B'){
                yuyue1.push(yy);
                }
            }
          }
          count4=yuyue.length;
          AppBase.InstInfo.count4=count4;
          console.log(AppBase.InstInfo.count4)
          count44=yuyue1.length;
          AppBase.InstInfo.count44=count44;
          console.log('abcde'+AppBase.InstInfo.count4);
          console.log('abcd'+AppBase.InstInfo.count44);
          AppBase.tijanApi.wodetijian({}).then((tijian)=>{
            var tjj=[];
            for(let tj of tijian){
              if(tj.orderstatus=='B'){
                  if(tj.read_status=='B'){
                      tjj.push(tj);
                  }
              }
            }
            AppBase.InstInfo.count6=tjj.length;
          AppBase.xitongApi.xitongnews({}).then((xitongnews)=>{
            var x=[];
            for(let xtn of xitongnews){
              if(xtn.read_status=='B'){
                x.push(xtn);
                
              }
            }
         
            AppBase.InstInfo.count5= AppBase.InstInfo.count33+ AppBase.InstInfo.count44+AppBase.InstInfo.count6+x.length;
            console.log('a1'+AppBase.InstInfo.count5);
          })
        })
        })
    })

    
   

       
        console.log(AppBase.instapi);
        console.log( AppBase.dindanapi);



        AppBase.dindanapi.myorder({}).then((orders)=>{
            this.order1=[];
            this.order2=[];
          var count1=0;
          var count2=0;
          for(let o of orders){
            if(o.status=='B'){
            
              this.order1.push(o);
           
            }
            if(o.status=='C'){
           
              this.order2.push(o);
         
            }
          }
          console.log("撒大声地");
          count1=this.order1.length;
          count2=this.order2.length;
          AppBase.InstInfo.count1=count1;
          AppBase.InstInfo.count2=count2;
          console.log('abc'+AppBase.InstInfo.count1);
          console.log('ab'+AppBase.InstInfo.count2);
        })


            
            AppBase.dindanapi.getgouwuche({}).then((gouwuche)=>{
            var gwcc=[];
            var count=0;
              for(let gwc of gouwuche){
               
                    gwcc.push(gwc);
                    count=gwcc.length;
           
              }
              AppBase.InstInfo.count=count;
              console.log('aaaaaa1'+AppBase.InstInfo.count)


            })


    
  


          
    }
    
    onMyShow() {

    }
    onPullRefresh(ref) {
        this.onMyShow();
        ref.complete();
    }
    doRefresh(ref) {
        this.onPullRefresh(ref);
        // setTimeout(() => {
        //     ref.complete();
        // }, 1000);
    }
    onLoadMoreRefresh(ref) {
        ref.complete();
    }
    doInfinite(infiniteScroll) {
        this.onLoadMoreRefresh(infiniteScroll);
        // setTimeout(() => {
        //   infiniteScroll.complete();
        // }, 1000);
    }
    isbacking = false;
    back() {
        if (this.isbacking == true) {
            return;
        }
        this.isbacking = true;
        //alert(this.Params.fromtab);
        if (history.length < 2) {
            this.navCtrl.navigateBack('tabs/tab1');
            return;
        }
        if (this.params.fromtab != undefined) {
            this.navCtrl.navigateBack('tabs/' + this.params.fromtab);
        } else {
            this.navCtrl.back();
        }
    }
    backToUrl(url) {
        this.navCtrl.navigateBack(url);
    }
    close(data) {
        this.modalCtrl.dismiss(data);
    }
    returnData(data) {
        this.modalCtrl.dismiss(data);
    }
    windowslocation(url) {
        window.location.href = url;
    }
    navigate(pagename, param = {}, checkLogin = false) {
        if (checkLogin == true) {
            if (this.MemberInfo == null) {
                this.navigate("mobilelogin");
                return;
            }
        }
        this.router.navigate([pagename], { queryParams: param });

    }
    async showModal(pageobj, param = {}, callback = null) {
        var modal = await this.modalCtrl.create({
            component: pageobj,
            componentProps: param
        });
        await modal.onDidDismiss().then((data) => {
            if (callback != null) {
                callback(data);
            }
        });
        await modal.present();
    }

    showContent(title, key) {
        this.navigate("content", { title, key });
        //this.showModal("ContentPage", { title, key });
    }

    decode(val) {
        return AppUtil.HtmlDecode(val);
    }
    contentToLine(str) {
        if (str == null) {
            return "";
        }
        return str.split("\n");
    }

    tel(tel) {
        window.location.href = "tel:" + tel;
    }
    async toast(msg) {
        if (msg == "") {
            return;
        }
        console.log(((msg.length / 3) + 1) * 1000);
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: ((msg.length / 3) + 1) * 500
        });
        toast.present();
    }
    async showAlert(msg) {

        const alert = await this.alertCtrl.create({
            header: "提示",
            subHeader: msg,
            buttons: ["知道了"]
        });
        alert.present();
    }
    async showConfirm(msg, confirmcallback) {

        const alert = await this.alertCtrl.create({
            header: "提示",
            subHeader: msg,
            buttons: [{
                text: "取消",
                handler: () => {
                    console.log('Disagree clicked');

                    confirmcallback(false);
                }
            }, {
                text: "确认",
                handler: () => {
                    confirmcallback(true);
                }
            }]
        });
        alert.present();
    }


    async showdialage(confirmcallback) {

        const alert = await this.alertCtrl.create({
            header: "取消报名",
            buttons: [{
                text: "我点错了",
                handler: () => {
                    console.log('Disagree clicked');

                    confirmcallback(false);
                }
            }, {
                text: "确定取消",
                handler: () => {
                    confirmcallback(true);
                }
            }]
        });
        alert.present();
    }

    async checkLogin(callback) {

    }

    async showActionSheet(actionSheetController, header, buttons) {
        const actionSheet = await actionSheetController.create({
            header: header,
            buttons: buttons
        });
        await actionSheet.present();
    }
    async uploadFile(transfer: FileTransfer, filepath: string, module: string) {
        filepath = filepath.split("?")[0];
        let options: FileUploadOptions = {
            fileKey: 'img',
            fileName: filepath
        }
        //alert(filepath);

        var fileTransfer: FileTransferObject = await transfer.create();
        return fileTransfer.upload(filepath, ApiConfig.getFileUploadAPI() + "?field=img&module=" + module, options)
            .then((data) => {
                // success
                //alert(data.response);
                return data.response.toString().split("|~~|")[1];
            }, (err) => {
                this.showModal("上传失败，请联系管理员");
                // error
            })
    }
    async uploadBase64(http: Http, base64: string, module: string) {

        //alert(filepath);
        var url = ApiConfig.getFileUploadAPI();
        var data = { base64: base64, module };
        var headers = ApiConfig.GetHeader(url, data);
        let options = new RequestOptions({ headers: headers });
        let body = ApiConfig.ParamUrlencoded(data);

        return http.post(url, body, options).toPromise().then((data: any) => {
            // success
            //alert(data.response);
            console.log("uploadBase64", data);
            return data._body.toString().split("|~~|")[1];
        });
    }

    openGallary(imagearr){
        this.navigate("gallary",{list:imagearr});
    }

    InitWechat(){
        AppBase.instapi.gensign({ url: window.location.href }).then((config) => {
            var json = {
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: this.InstInfo.h5appid, // 必填，公众号的唯一标识
                timestamp: config.timestamp, // 必填，生成签名的时间戳
                nonceStr: config.nonceStr, // 必填，生成签名的随机串
                signature: config.signature,// 必填，签名，见附录1
                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage","getLocation",'openLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            };
            console.log("intwechat",json);
            wx.config(json);

            wx.ready(()=>{
                wx.onMenuShareAppMessage({
                    title: this.InstInfo.h5sharetitle,
                    desc: this.InstInfo.h5sharedesc,
                    link: window.location.href,
                    imgUrl: this.uploadpath + "inst/" + this.InstInfo.h5sharelogo,
                    trigger: function (res) {
                        // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                        //alert('用户点击发送给朋友');
                    },
                    success: function (res) {
                        //alert('已分享');
                    },
                    cancel: function (res) {
                        //alert('已取消');
                    },
                    fail: function (res) {
                        //alert("onMenuShareAppMessage" + JSON.stringify(res));
                    }
                });

                wx.onMenuShareTimeline({
                    title: this.InstInfo.h5sharetitle,
                    link: window.location.href,
                    imgUrl: this.uploadpath + "inst/" + this.InstInfo.h5sharelogo,
                    trigger: function (res) {
                        // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                        //alert('用户点击分享到朋友圈');
                    },
                    success: function (res) {
                        //alert('已分享');
                    },
                    cancel: function (res) {
                        //alert('已取消');
                    },
                    fail: function (res) {
                        // alert("onMenuShareTimeline" + JSON.stringify(res));
                    }
                });
            });

        });
    }

    openLocation(lat,lng,name,address){
        wx.openLocation({
            latitude: lat,//目的地latitude
            longitude: lng,//目的地longitude
            name: name,
            address: address,
            scale: 15//地图缩放大小，可根据情况具体调整
        });
    }


}