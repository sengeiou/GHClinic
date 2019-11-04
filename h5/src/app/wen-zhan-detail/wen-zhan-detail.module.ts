import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WenZhanDetailPage } from './wen-zhan-detail.page';

const routes: Routes = [
  {
    path: '',
    component: WenZhanDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WenZhanDetailPage]
})
export class WenZhanDetailPageModule {}
