import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionRoutingModule } from './transaction-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentModule } from 'src/app/shared/component/shared-component.module';



@NgModule({
  declarations: [
    TransactionComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    SharedComponentModule,
    ReactiveFormsModule,
  ]
})
export class TransactionModule { }
