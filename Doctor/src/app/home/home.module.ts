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
    HomeRoutingModule,
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot()
  ]
})
export class HomeModule { }
