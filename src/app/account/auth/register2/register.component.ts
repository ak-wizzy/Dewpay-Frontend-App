import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../../core/services/auth.service";
import { NotificationService } from "src/app/core/services/notification.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class Register2Component implements OnInit {
  signupForm: FormGroup;
  submitted = false;
  error = "";
  successmsg = false;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private notificationService: NotificationService
  ) {}
  // set the currenr year
  year: number = new Date().getFullYear();

  ngOnInit(): void {
    document.body.classList.add("auth-body-bg");
      this.signupForm = this.formBuilder.group({
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        phoneNumber: ["", Validators.required],
        channel: ["2", Validators.required],
        gender: ["", Validators.required],
        dob: ["", Validators.required],
        transactionPin: ["", Validators.required],
        password: ["", Validators.required],
        bvn: ["", Validators.required],
      });
    // }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.signupForm.controls;
  }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;
    this.isLoading = true;
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      this.isLoading = false;
      this.submitted = false;
      return;
    } else {
      this.authService.register(this.signupForm.value).subscribe(
        (response) => {
          this.isLoading = false;
          this.submitted = false;
          if(response.responseCode =="00"){
            this.router.navigate(['/account/login']);
            this.notificationService.showSuccess(response.responseMessage, "Registration")
            }else {
              this.notificationService.showSuccess(response.responseMessage, "Registration")
            }
        },
        (error) => {
          this.isLoading = false;
          this.submitted = false;
          this.notificationService.showWarning(error.responseMessage, "Registration")
        }
      );
    }
  }
}
