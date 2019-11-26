import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppBase } from './AppBase';
import { InstApi } from 'src/providers/inst.api';
import { WechatApi } from 'src/providers/wechat.api';
import { MemberApi } from 'src/providers/member.api';
import { DindanApi } from 'src/providers/dindan.api';
import { XitongApi } from 'src/providers/xitong.api';
import { ActivityApi } from 'src/providers/activity.api';
import { OrderApi } from 'src/providers/order.api';
import { TijianApi } from 'src/providers/tijian.api';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers:[InstApi,MemberApi,WechatApi,DindanApi,XitongApi,ActivityApi,OrderApi,TijianApi]
})

export class AppComponent {
  static Instance: AppComponent = null;
    currentpage: string;
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    public instApi:InstApi,
    public memberApi:MemberApi,
    public dindanApi:DindanApi,
    public xitongApi:XitongApi,
    public orderApi:OrderApi,
    public tijanApi:TijianApi,
    public activityApi:ActivityApi,
    public wechatApi:WechatApi
  )
  
  {
    
    this.initializeApp();
    AppBase.instapi = this.instApi;
    AppBase.memberapi=this.memberApi;
    AppBase.xitongApi=this.xitongApi;
    AppBase.dindanapi=this.dindanApi;
    AppBase.orderApi=this.orderApi;
    AppBase.tijanApi=this.tijanApi;
    AppBase.activityApi=this.activityApi;
    AppBase.wechatApi=this.wechatApi
  }
 
  backButtonPressedOnceToExit = false;
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();

      var _self = this;
      window.addEventListener("popstate", () => {
        if (this.currentpage == "tab1"
        || this.currentpage == "tab2"
        || this.currentpage == "tab3"
          || this.currentpage == "tab4"
          || this.currentpage == "tab5"
        ) {
          //当前为Tab状态, 判断是否为首页
          // if (app.getActiveNav().getActive().name != 'HomePage') { //能用, 但编辑器提示未定义
          // if (_self.backButtonPressedOnceToExit == true) {
          //   navigator["app"].exitApp();
          // }
          // _self.backButtonPressedOnceToExit = true;
          // //_self.presentToast("再按一次就退出程序");
          // //setTimeout(function () {
          //   _self.backButtonPressedOnceToExit = false;
          // }, 2000);

        }
        else {
          //app.goBack();
          if (AppBase.Current.isModal) {
            AppBase.Current.close();
          } else {
            //history.pushState(null, null, document.URL);
            if(AppBase.Current.isbacking!=true){
              window.location.href=window.location.href;
            }
            //AppBase.Current.back();
          }
        }
      });
    });
  }
}
