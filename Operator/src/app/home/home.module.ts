import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { BlankComponent } from '../blank/blank.component';
import { FormsModule } from '@angular/forms';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ProfileComponent } from '../profile/profile.component';
import { SettingComponent } from '../setting/setting.component';
import { ActivitylogComponent } from '../activitylog/activitylog.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DoctorlistComponent } from '../doctorlist/doctorlist.component';
import { DoctorComponent } from '../doctor/doctor.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxUploaderModule } from 'ngx-uploader';
import { DoctorscheduleComponent } from '../doctorschedule/doctorschedule.component';

@NgModule({
  declarations: [
    HomeComponent,
    BlankComponent,
    ProfileComponent,
    SettingComponent,
    DoctorlistComponent,
    ActivitylogComponent,
    DoctorComponent,
    DoctorscheduleComponent,
    DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    NgxUploaderModule,
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot()
  ]
})
export class HomeModule { }
