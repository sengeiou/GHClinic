import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { BlankComponent } from '../blank/blank.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { ConferenceComponent } from '../conference/conference.component';
import { FormsModule } from '@angular/forms';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ProfileComponent } from '../profile/profile.component';
import { SettingComponent } from '../setting/setting.component';
import { ActivitylogComponent } from '../activitylog/activitylog.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TodayorderlistComponent } from '../todayorderlist/todayorderlist.component';

@NgModule({
  declarations: [
    HomeComponent,
    BlankComponent,
    CalendarComponent,
    ConferenceComponent,
    ProfileComponent,
    SettingComponent,
    ActivitylogComponent,
    TodayorderlistComponent,
    DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    TabsModule.forRoot()
  ]
})
export class HomeModule { }
