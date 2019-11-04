import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PhysicalExaminationAppointmentPage } from './physical-examination-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: PhysicalExaminationAppointmentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PhysicalExaminationAppointmentPage]
})
export class PhysicalExaminationAppointmentPageModule {}
