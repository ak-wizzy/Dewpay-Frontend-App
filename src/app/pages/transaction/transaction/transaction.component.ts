import { AfterViewInit, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { BillerService } from "src/app/core/services/biller.service";
import { NotificationService } from "src/app/core/services/notification.service";

@Component({
  selector: "app-transaction",
  templateUrl: "./transaction.component.html",
  styleUrls: ["./transaction.component.scss"],
})
export class TransactionComponent implements OnInit, AfterViewInit {
  isLoading = true;
  walletDetail: any;
  transactions = [];
  searchForm: FormGroup;
  submitted= false;
  constructor(
    private billerService: BillerService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private notificationService: NotificationService
  ) {}
  ngAfterViewInit(): void {
    this.getTransactions(this.walletDetail?.walletId)
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
    });
    this.walletDetail = JSON.parse(this.authService.getWalletDetails())
  }

  get f() {
    return this.searchForm.controls;
  }


  getTransactions(walletId) {
    var today = new Date();

    var endDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const payload = {
      walletId: walletId,
      startDate: "2022-01-01",
      endDate: endDate,
      pageNumber: "1",
      pageSize: "100",
    };

    this.fetechTransaction(payload)

  }

  onSearch() {
    this.submitted = true
    if (this.searchForm.invalid) {
      return;
    }
    this.submitted = false
    this.isLoading = false;
    const payload = {
      walletId: this.walletDetail?.walletId,
      startDate: this.searchForm.value.startDate,
      endDate: this.searchForm.value.endDate,
      pageNumber: "1",
      pageSize: "100",
    };

    this.fetechTransaction(payload)
  }

  

  fetechTransaction(payload) {
    this.billerService.getTransactions(payload).subscribe(
      (response) => {
        this.isLoading = false;
        if (response?.responseCode === "00") {
          this.transactions = response?.data;
          this.getHeaders();
        } else {
          this.notificationService.showError(
            response.responseMessage,
            "Transaction"
          );
        }
      },
      (error) => {
        this.isLoading = false;
        this.notificationService.showError(error.responseMessage, "Transaction");
      }
    );
  }

  getHeaders() {
    let headers: string[] = [];
    if(this.transactions) {
      this.transactions.forEach((value) => {
        Object.keys(value.otherInfo).forEach((key) => {
          if(!headers.find((header) => header == key)){
            headers.push(key)
          }
        })
      })
    }
    // console.log(headers)
    return headers;
  }
  
}
