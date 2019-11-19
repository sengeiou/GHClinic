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
  { path: 'commodity-details', loadChildren: './commodity-details/commodity-details.module#CommodityDetailsPageModule' },
  { path: 'order', loadChildren: './order/order.module#OrderPageModule' },
  { path: 'successful-trade', loadChildren: './successful-trade/successful-trade.module#SuccessfulTradePageModule' },
  { path: 'carts', loadChildren: './carts/carts.module#CartsPageModule' },
  { path: 'search-drugs', loadChildren: './search-drugs/search-drugs.module#SearchDrugsPageModule' },
  { path: 'address', loadChildren: './address/address.module#AddressPageModule' },
  { path: 'my-address', loadChildren: './my-address/my-address.module#MyAddressPageModule' },
  { path: 'preserved-address', loadChildren: './preserved-address/preserved-address.module#PreservedAddressPageModule' },
  { path: 'evaluate', loadChildren: './evaluate/evaluate.module#EvaluatePageModule' },
  { path: 'my-order', loadChildren: './my-order/my-order.module#MyOrderPageModule' },
  { path: 'order-payment', loadChildren: './order-payment/order-payment.module#OrderPaymentPageModule' },

  { path: 'order-cancelled', loadChildren: './order-cancelled/order-cancelled.module#OrderCancelledPageModule' },
  { path: 'order-complete', loadChildren: './order-complete/order-complete.module#OrderCompletePageModule' },
  { path: 'order-sign', loadChildren: './order-sign/order-sign.module#OrderSignPageModule' },

  { path: 'my-appointment', loadChildren: './my-appointment/my-appointment.module#MyAppointmentPageModule' },
  { path: 'appointment-payment', loadChildren: './appointment-payment/appointment-payment.module#AppointmentPaymentPageModule' },
  { path: 'appointment-complete', loadChildren: './appointment-complete/appointment-complete.module#AppointmentCompletePageModule' },
  { path: 'appointment-cancelled', loadChildren: './appointment-cancelled/appointment-cancelled.module#AppointmentCancelledPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'password', loadChildren: './password/password.module#PasswordPageModule' },
  { path: 'reset-password', loadChildren: './reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'successful-registration', loadChildren: './successful-registration/successful-registration.module#SuccessfulRegistrationPageModule' },
  { path: 'my-news', loadChildren: './my-news/my-news.module#MyNewsPageModule' },
  { path: 'my-physical-examination', loadChildren: './my-physical-examination/my-physical-examination.module#MyPhysicalExaminationPageModule' },
  { path: 'my-activity', loadChildren: './my-activity/my-activity.module#MyActivityPageModule' },
  { path: 'my-customer', loadChildren: './my-customer/my-customer.module#MyCustomerPageModule' },
  { path: 'physical-examination-payment', loadChildren: './physical-examination-payment/physical-examination-payment.module#PhysicalExaminationPaymentPageModule' },
  
  { path: 'application-details', loadChildren: './application-details/application-details.module#ApplicationDetailsPageModule' },
  { path: 'activity-information', loadChildren: './activity-information/activity-information.module#ActivityInformationPageModule' },
  { path: 'wen-zhan-tui-son', loadChildren: './wen-zhan-tui-son/wen-zhan-tui-son.module#WenZhanTuiSonPageModule' },  { path: 'aboutus', loadChildren: './aboutus/aboutus.module#AboutusPageModule' },
  { path: 'feedback', loadChildren: './feedback/feedback.module#FeedbackPageModule' },
  { path: 'wen-zhan-detail', loadChildren: './wen-zhan-detail/wen-zhan-detail.module#WenZhanDetailPageModule' },
  { path: 'memberinfo', loadChildren: './memberinfo/memberinfo.module#MemberinfoPageModule' },  { path: 'userpermission', loadChildren: './userpermission/userpermission.module#UserpermissionPageModule' },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
