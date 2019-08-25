import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HomeComponent } from './home.component';
import { BlankComponent } from '../blank/blank.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { ConferenceComponent } from '../conference/conference.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "blank", component: BlankComponent },
      { path: "calendar", component: CalendarComponent },
      { path: "conference", component: ConferenceComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
