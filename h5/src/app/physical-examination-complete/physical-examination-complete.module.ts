import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PhysicalExaminationCompletePage } from './physical-examination-complete.page';

const routes: Routes = [
  {
    path: '',
    component: PhysicalExaminationCompletePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PhysicalExaminationCompletePage]
})
export class PhysicalExaminationCompletePageModule {}
