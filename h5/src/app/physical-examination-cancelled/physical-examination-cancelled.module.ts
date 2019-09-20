import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PhysicalExaminationCancelledPage } from './physical-examination-cancelled.page';

const routes: Routes = [
  {
    path: '',
    component: PhysicalExaminationCancelledPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PhysicalExaminationCancelledPage]
})
export class PhysicalExaminationCancelledPageModule {}
