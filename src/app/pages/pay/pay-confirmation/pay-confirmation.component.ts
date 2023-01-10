import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { BillerService } from "src/app/core/services/biller.service";
import { NotificationService } from "src/app/core/services/notification.service";

@Component({
  selector: "app-pay-confirmation",
  templateUrl: "./pay-confirmation.component.html",
  styleUrls: ["./pay-confirmation.component.scss"],
})
export class PayConfirmationComponent implements OnInit {
  isLoading = true;
  transactionId: string;
  transaction;
  paramsObject;
  constructor(
    private billerService: BillerService,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const transactionId = this.route.snapshot.paramMap.get("transactionId");

    this.route.queryParams.subscribe((params) => {
      if (params) {
        this.paramsObject = params.transfer;
        this.paramsObject = JSON.parse(this.paramsObject); // fiction
      }
    });
    this.transactionId = transactionId;
    this.getTransaction(transactionId);
  }

  getTransaction(transactionId) {
    this, (this.isLoading = true);
    this.billerService.getTransactionStatus(transactionId).subscribe(
      (response) => {
        this.isLoading = false;
        if (response.responseCode === "00") {
          this.transaction = response.data;
        }
      },

      (error) => {
        this.isLoading = false;
        this.notificationService.showError(
          error.responseMessage,
          "Transaction"
        );
      }
    );
  }
}
