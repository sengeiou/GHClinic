import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HttpClientModule }    from '@angular/common/http';
import { InstApi } from 'src/providers/inst.api';
import { BlankComponent } from './blank/blank.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { HomeComponent } from './home/home.component';

import {FormsModule} from '@angular/forms';


import { AlertModule } from 'ngx-bootstrap/alert';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ConferenceComponent } from './conference/conference.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidemenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    PopoverModule.forRoot()
  ],
  providers: [InstApi],
  bootstrap: [AppComponent]
})
export class AppModule { }
