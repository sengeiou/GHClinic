import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'information', loadChildren: './information/information.module#InformationPageModule' },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'clinic', loadChildren: './clinic/clinic.module#ClinicPageModule' },
  { path: 'doctor', loadChildren: './doctor/doctor.module#DoctorPageModule' },
  { path: 'appointment', loadChildren: './appointment/appointment.module#AppointmentPageModule' },
  { path: 'successful-reservation', loadChildren: './successful-reservation/successful-reservation.module#SuccessfulReservationPageModule' },
  { path: 'physical-examination', loadChildren: './physical-examination/physical-examination.module#PhysicalExaminationPageModule' },
  { path: 'detail', loadChildren: './detail/detail.module#DetailPageModule' },
  { path: 'physical-examination-appointment', loadChildren: './physical-examination-appointment/physical-examination-appointment.module#PhysicalExaminationAppointmentPageModule' },
  { path: 'no-duty', loadChildren: './no-duty/no-duty.module#NoDutyPageModule' },
  { path: 'activity-details', loadChildren: './activity-details/activity-details.module#ActivityDetailsPageModule' },
  { path: 'application', loadChildren: './application/application.module#ApplicationPageModule' },
  { path: 'list', loadChildren: './list/list.module#ListPageModule' },
  { path: 'commodity-details', loadChildren: './commodity-details/commodity-details.module#CommodityDetailsPageModule' },
  { path: 'order', loadChildren: './order/order.module#OrderPageModule' },
  { path: 'successful-trade', loadChildren: './successful-trade/successful-trade.module#SuccessfulTradePageModule' },
  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule' },
  { path: 'carts', loadChildren: './carts/carts.module#CartsPageModule' },
  { path: 'search-drugs', loadChildren: './search-drugs/search-drugs.module#SearchDrugsPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
