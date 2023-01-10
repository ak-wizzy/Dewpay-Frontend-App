import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantLoginComponent } from './merchant-login/merchant-login.component';
import { MerchantRegisterComponent } from './merchant-register/merchant-register.component';

const routes: Routes = [
  {
      path: 'login',
      component: MerchantLoginComponent
  },
  {
    path: 'signup',
    component: MerchantRegisterComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantRoutingModule { }
