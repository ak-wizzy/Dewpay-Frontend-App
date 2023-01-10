import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { WalletService } from "src/app/core/services/wallet.service";

@Component({
  selector: 'app-merchant-login',
  templateUrl: './merchant-login.component.html',
  styleUrls: ['./merchant-login.component.scss']
})
export class MerchantLoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private walletService: WalletService
  ) {}
  loginForm: FormGroup;
  submitted = false;
  error = "";
  returnUrl: string;
  isLoading = false;
  // set the currenr year
  year: number = new Date().getFullYear();

  ngOnInit(): void {
    document.body.classList.add("auth-body-bg");
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  get f() {
    return this.loginForm.controls;
  }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;
    this.isLoading = true;
    if (this.loginForm.invalid) {
      this.isLoading = false;
      return;
    } else {
      this.isLoading = true;
      this.authService.merchantlogin(this.loginForm.value).subscribe(
        (response) => {
          this.submitted = false;
          console.log(response);
          this.submitted = false;
          if (response.responseCode === "00") {
            let data = response?.data;
            data = {
              ...data,
              // merchantId: environment.clientKey,
            };
            this.authService.setCredentials(data);
            this.authService.setToken(response?.otherInfo);

            this.notificationService.showSuccess(
              response.responseDescription,
              "Authentication"
            );
            setTimeout(() => {
              this.doGetWalletDetails(data?.merchantId, data?.phoneNumber);
            }, 1000);
          } else {
            this.notificationService.showError(
              response.responseDescription,
              "Authentication"
            );
          }
        },
        (error) => {
          this.isLoading = false;
          this.submitted = false;
          this.notificationService.showError(
            error.responseMessage,
            "Authentication"
          );
        }
      );
    }
  }

  doGetWalletDetails(merchantId, phoneNumber) {
    this.walletService.getWalletDetails(merchantId, phoneNumber).subscribe(
      (response) => {
        this.isLoading = false;
        if (response.responseCode === "00") {
          this.authService.setWalletDetails(response?.data);
          this.router.navigate(["/home"]);
        }
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }
}
