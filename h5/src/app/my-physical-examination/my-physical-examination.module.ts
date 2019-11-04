import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyPhysicalExaminationPage } from './my-physical-examination.page';

const routes: Routes = [
  {
    path: '',
    component: MyPhysicalExaminationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyPhysicalExaminationPage]
})
export class MyPhysicalExaminationPageModule {}
