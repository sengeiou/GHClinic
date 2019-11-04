import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyAppointment0Page } from './my-appointment0.page';

const routes: Routes = [
  {
    path: '',
    component: MyAppointment0Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyAppointment0Page]
})
export class MyAppointment0PageModule {}
