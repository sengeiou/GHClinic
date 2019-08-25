import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { BlankComponent } from '../blank/blank.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { ConferenceComponent } from '../conference/conference.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    BlankComponent,
    CalendarComponent,
    ConferenceComponent,
    DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
