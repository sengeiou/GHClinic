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
    HttpClientModule
  ],
  providers: [InstApi],
  bootstrap: [AppComponent]
})
export class AppModule { }
