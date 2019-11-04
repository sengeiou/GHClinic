import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CommodityDetailsPage } from './commodity-details.page';

const routes: Routes = [
  {
    path: '',
    component: CommodityDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CommodityDetailsPage]
})
export class CommodityDetailsPageModule {}
