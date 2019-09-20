import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PhysicalExaminationPaymentPage } from './physical-examination-payment.page';

const routes: Routes = [
  {
    path: '',
    component: PhysicalExaminationPaymentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PhysicalExaminationPaymentPage]
})
export class PhysicalExaminationPaymentPageModule {}
