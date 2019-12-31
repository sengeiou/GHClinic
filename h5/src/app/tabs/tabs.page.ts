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

 
     
          
          this.getisread();
          console.log('好几个')
    
  
    

  }
  a=null;
  flag = 'tab1';
  change(event)

  { 
    this.flag=event.detail.tab;
 
  }
  actread = 'Y';
  getisread() {

    if (AppBase.MemberInfo.id != '') {
        console.log(AppBase.MemberInfo.id,'ididid')
        AppBase.memberapi.actvityisread({ member_id: AppBase.MemberInfo.id }).then((ret: any) => {
                console.log(ret,'retret')
            if (ret.code=='0') {
                this.actread = 'Y'
            } else {
                this.actread = 'N'
            }
        })

    }

}
}
