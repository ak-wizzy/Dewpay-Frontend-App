import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayRoutingModule } from './pay-routing.module';
import { PayComponent } from './pay/pay.component';
import { SharedComponentModule } from 'src/app/shared/component/shared-component.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PayConfirmationComponent } from './pay-confirmation/pay-confirmation.component';
import { DigitOnlyModule } from '@uiowa/digit-only';

@NgModule({
  declarations: [
    PayComponent,
    PayConfirmationComponent
  ],
  imports: [
    CommonModule,
    PayRoutingModule,
    SharedComponentModule,
    ReactiveFormsModule,
    DigitOnlyModule
    
  ]
})
export class PayModule { }
