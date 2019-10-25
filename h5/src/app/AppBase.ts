import { ApiConfig } from "./api.config";
import { AppUtil } from "./app.util";
import { NavController, ModalController, ToastController, NavParams, AlertController }
    from "@ionic/angular";
import { InstApi } from "../providers/inst.api";
import { MemberApi } from "../providers/member.api";
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


declare let wx: any;

export class AppBase implements OnInit {
    public needlogin = true;

    public static TABName = "";
    public static LASTTAB = null;
    public static CurrentRoute: Router = null;
    public static CurrentNav: NavController = null;

    public static myapp: AppComponent = null;
    public static instapi: InstApi = null;
    public static memberapi: MemberApi = null;
    public static wechatApi: WechatApi = null;
    public static UNICODE = "gh";
    public static IsLogin = false;
    public statusBarStyle = "X";//{DARK}
    public uploadpath: string = ApiConfig.getUploadPath();
    public util = AppUtil;
    public static Resources = null;
    public res = null;
    public static InstInfo = null;
    public static MemberInfo=null;
    public InstInfo = {h5sharelogo:"",h5sharetitle:"",h5sharedesc:"",tel:"", h5appid: "", kf: "", openning: "", successtips: "", orderneedknow: "", name: "", logo: "", memberlogo: "", undershipping: 0, shippingfee: 0, about1: "", about2: "", about3: "", about4: "", about5: "" };
    public MemberInfo = { avatarUrl: "", nickName: "",h5openid:"",unionid:"",name:''};
    public static MYBABY = [];
    public mybaby = [];
    public options = null;
    public params: Params = null;

    public keyt="memberinfo99";
    public stat="stat9";

    public firseonshow = true;
    public scrolltop = 0;
    public headerscroptshow = 0;

    static Current = null;
    currentpage = "";

    static STATICRAND="";


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
        var stat=window.sessionStorage.getItem(this.stat);
        if(stat==null){
            stat=parseInt((Math.random()*99999.9).toString()).toString();
            window.sessionStorage.setItem(this.stat,stat);
        }
        AppBase.STATICRAND=stat;

        var memberinfo=window.localStorage.getItem(this.keyt);
        
        if(memberinfo!=null){
            AppBase.MemberInfo=JSON.parse(memberinfo);
        }
        console.log("啊哈哈哈哈哈");
        console.log("rdw",AppBase.MemberInfo);
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
        if (AppBase.InstInfo == null) {
            AppBase.instapi.info({}, false).then((instinfo) => {
                AppBase.InstInfo = instinfo;
                this.InstInfo = instinfo;
                console.log(instinfo);
                console.log("aaabbbccc",AppBase.STATICRAND);
               
            });
        } else {
            this.InstInfo = AppBase.InstInfo;
        }
    }
    getMemberInfo() {

        AppBase.memberapi.info({}).then((memberinfo) => {
            if (memberinfo == null || memberinfo.mobile == undefined || memberinfo.mobile == "") {
                //alert("?");
                memberinfo = null;
            }
            this.MemberInfo = memberinfo;

        });
    }
    shouye(){
        
  

 
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
    ionViewDidEnter() {
       

        //AppBase.devicename=AppComponent.Instance.devicename;
        //AppBase.devicename="AppComponent.Instance.devicename";

        if (TabsPage.Instance != null) {
            TabsPage.Instance.currentpage = this.currentpage;
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
            ApiConfig.SetToken(token);
            AppBase.memberapi.info({}).then((memberinfo) => {
        console.log("进来了熬哈哈");
      AppBase.MemberInfo=memberinfo;
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
        if(history.length<2){
            this.navCtrl.navigateBack('tabs/tab1' );
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
                text: "好的",
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
        filepath=filepath.split("?")[0];
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
    async uploadBase64(http:Http, base64: string, module: string) {
        
        //alert(filepath);
        var url=ApiConfig.getFileUploadAPI();
        var data={base64:base64,module};
        var headers = ApiConfig.GetHeader(url, data);
        let options = new RequestOptions({ headers: headers });
        let body = ApiConfig.ParamUrlencoded(data);

        return http.post(url,body,options).toPromise().then((data:any) => {
            // success
            //alert(data.response);
            console.log("uploadBase64",data);
            return data._body.toString().split("|~~|")[1];
        });
    }
}