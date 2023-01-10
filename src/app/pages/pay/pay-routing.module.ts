import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PayConfirmationComponent } from "./pay-confirmation/pay-confirmation.component";
import { PayComponent } from "./pay/pay.component";

const routes: Routes = [
  {
    path: "confirm/status/:transactionId",
    component: PayConfirmationComponent,
  },
  {
    path: ":categoryCode/:serviceType",
    component: PayComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayRoutingModule {}
