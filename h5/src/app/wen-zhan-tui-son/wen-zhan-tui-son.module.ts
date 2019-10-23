import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WenZhanTuiSonPage } from './wen-zhan-tui-son.page';

const routes: Routes = [
  {
    path: '',
    component: WenZhanTuiSonPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WenZhanTuiSonPage]
})
export class WenZhanTuiSonPageModule {}
