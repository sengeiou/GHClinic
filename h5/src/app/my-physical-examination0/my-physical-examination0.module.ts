import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyPhysicalExamination0Page } from './my-physical-examination0.page';

const routes: Routes = [
  {
    path: '',
    component: MyPhysicalExamination0Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyPhysicalExamination0Page]
})
export class MyPhysicalExamination0PageModule {}
