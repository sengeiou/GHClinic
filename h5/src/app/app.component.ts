import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppBase } from './AppBase';
import { InstApi } from 'src/providers/inst.api';
import { WechatApi } from 'src/providers/wechat.api';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers:[InstApi,MemberApi,WechatApi]
})

export class AppComponent {
  static Instance: AppComponent = null;
    currentpage: string;
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    public instApi:InstApi,
    public memberApi:MemberApi,
    public wechatApi:WechatApi
  )
  
  {
    
    this.initializeApp();
    AppBase.instapi = this.instApi;
    AppBase.memberapi=this.memberApi;
    AppBase.wechatApi=this.wechatApi
  }
 
  backButtonPressedOnceToExit = false;
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();

      var _self = this;
      document.addEventListener("backbutton", () => {

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
            AppBase.Current.back();
          }
        }
      });
    });
  }
}
