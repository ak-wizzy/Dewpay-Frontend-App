import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantRoutingModule } from './merchant-routing.module';
import { MerchantLoginComponent } from './merchant-login/merchant-login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ngx-toastr';
import { AuthRoutingModule } from '../account/auth/auth-routing';
import { SharedComponentModule } from '../shared/component/shared-component.module';
import { UIModule } from '../shared/ui/ui.module';
import { MerchantRegisterComponent } from './merchant-register/merchant-register.component';


@NgModule({
  declarations: [
    MerchantLoginComponent,
    MerchantRegisterComponent,
  ],
  imports: [
    CommonModule,
    MerchantRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbAlertModule,
    UIModule,
    CarouselModule,
    ToastrModule,
    SharedComponentModule
  ]
})
export class MerchantModule { }
