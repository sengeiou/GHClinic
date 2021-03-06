import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HomeComponent } from './home.component';
import { BlankComponent } from '../blank/blank.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { ConferenceComponent } from '../conference/conference.component';
import { ProfileComponent } from '../profile/profile.component';
import { SettingComponent } from '../setting/setting.component';
import { ActivitylogComponent } from '../activitylog/activitylog.component';
import { TodayorderlistComponent } from '../todayorderlist/todayorderlist.component';
import { PatientManagementComponent } from '../patient-management/patient-management.component';
import { PatientdetailComponent } from '../patientdetail/patientdetail.component';
import { DoctorscheduleComponent } from '../doctorschedule/doctorschedule.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "blank", component: BlankComponent },
      { path: "calendar", component: CalendarComponent },
      { path: "conference", component: ConferenceComponent },
      { path: "profile", component: ProfileComponent },
      { path: "setting", component: SettingComponent },
      { path: "activitylog", component: ActivitylogComponent },
      { path: "todayorderlist", component: TodayorderlistComponent },
      { path: "patient-management", component: PatientManagementComponent },
      { path: "patientdetail", component: PatientdetailComponent },
      { path: "doctorschedule", component: DoctorscheduleComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
