import { Component } from '@angular/core';
import { AppBase } from '../AppBase';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  static Instance:TabsPage=null;
  currentpage="";
  constructor() {}
  ionViewDidEnter() {
    TabsPage.Instance=this;
    console.log("asdasdasd");
    console.log("asdasdasd",AppBase.LASTTAB);
    if (AppBase.LASTTAB != null) {
      
      AppBase.LASTTAB.ionViewDidEnter();
     
    }


  }
}
