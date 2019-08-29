import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HomeComponent } from './home.component';
import { BlankComponent } from '../blank/blank.component';
import { ProfileComponent } from '../profile/profile.component';
import { SettingComponent } from '../setting/setting.component';
import { ActivitylogComponent } from '../activitylog/activitylog.component';
import { DoctorlistComponent } from '../doctorlist/doctorlist.component';
import { DoctorComponent } from '../doctor/doctor.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "blank", component: BlankComponent },
      { path: "profile", component: ProfileComponent },
      { path: "doctorlist", component: DoctorlistComponent },
      { path: "doctor", component: DoctorComponent },
      { path: "setting", component: SettingComponent },
      { path: "activitylog", component: ActivitylogComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
