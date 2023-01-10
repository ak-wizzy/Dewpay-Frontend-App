import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiResponse } from "src/app/core/models/api.models";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { BillerService } from "src/app/core/services/biller.service";
import { NotificationService } from "src/app/core/services/notification.service";

@Component({
  selector: "app-pay",
  templateUrl: "./pay.component.html",
  styleUrls: ["./pay.component.scss"],
})
export class PayComponent implements OnInit {
  isLoading = true;
  formFields: any[];
  form = new FormGroup({});
  dataProps = [];
  dataOptions = [];
  showPinField = false;
  showForm = true;

  paymentMethods = [
    // { name: "Wallet", value: "1" },
    { name: "Card", value: "2" },
    { name: "Bank Transafer", value: "3" },
  ];
  categoryCode = "";
  serviceType = "";
  walletDetail: any;
  charges: any;
  formClone: any;
  paymentMethod;

  amountField = false;
  selectedBundle: any;
  billerForm: any;
  billerEnquiryResponse: any;
  customerNameField = false;
  discount 

  constructor(
    private billerService: BillerService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const categoryCode = this.route.snapshot.paramMap.get("categoryCode");
    this.categoryCode = categoryCode;
    const serviceType = this.route.snapshot.paramMap.get("serviceType");
    this.walletDetail = JSON.parse(this.authService.getWalletDetails());
    this.serviceType = serviceType;
    this.getBillerList(categoryCode, serviceType);
    this.form = this.fb.group({
      paymentMethod: new FormControl("", Validators.required),
      pin: new FormControl(""),
      // beneficiaryEmail: new FormControl("", [
      //   Validators.required,
      //   Validators.email,
      // ]),
      // beneficiaryPhone: new FormControl("", [Validators.required]),
    });
  }

  getCharges(merchantId, category, amount, serviceType) {
    this.billerService
      .getCharges(merchantId, category, amount, serviceType)
      .subscribe((response) => {
        if (response.status === "00") {
          this.charges = response;
          this.discount = parseFloat(response?.initialAmount) - parseFloat(response?.finalAmount)
        }
      });
  }

  getBillerList(categoryCode, serviceType) {
    this.billerService.getBillerForm(categoryCode, serviceType).subscribe(
      (response) => {
        this.isLoading = false;
        if (response.responseCode === "00") {
          this.billerForm = response.data;
          for (const prop of Object.keys(response.data)) {
            this.form.addControl(
              response.data[prop].fieldName,
              new FormControl("", this.getValidator(response.data[prop]))
            );
            if (response.data[prop].fieldType === "TEXT") {
              this.dataProps.push({
                key: prop,
                label: response.data[prop].fieldLabel,
                fieldName: response.data[prop].fieldName,
                type: this.getFieldType(response.data[prop].fieldType),
                required: response.data[prop].required,
              });
            }
            if (response.data[prop].fieldType === "LIST") {
              this.dataProps.push({
                key: prop,
                label: response.data[prop].fieldLabel,
                fieldName: response.data[prop].fieldName,
                type: this.getFieldType(response.data[prop].fieldType),
                required: response.data[prop].required,
                option: response?.[`${response?.data[prop]?.listDataSource}`],
              });

              this.dataOptions =
                response?.[`${response?.data[prop]?.listDataSource}`];
            }
            console.log("personProps", this.dataProps);
            console.log("dataOptions", this.dataOptions);
          }
        }
      },
      (error) => (this.isLoading = false)
    );
  }
  onChangeDataCode(value) {
    const data = this.dataOptions.filter((data) => data.name === value)[0];
    this.form.addControl("amount", new FormControl(""));
    this.amountField = true;
    this.form.patchValue({
      amount: data?.amount,
    });

    this.selectedBundle = {
      code: data?.value,
      name: data?.name,
    };
  }

  doLookUp(value, fieldName) {
    this.customerNameField = false;
    this.isLoading = true;
    const data = this.billerForm.filter(
      (data) => data.fieldName === fieldName
    )[0];
    const lookUpUrl = data?.lookupUrl.replace("{customerId}", value);

    this.billerService.doLookUp(lookUpUrl).subscribe(
      (response) => {
        this.isLoading = false;
        if (response?.responseCode == "00") {
          this.billerEnquiryResponse = response?.data;
          this.customerNameField = true;
          this.form.addControl("customerName", new FormControl(""));
          this.form.patchValue({
            customerName: response?.data?.customerName,
          });
        }
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
        this.notificationService.showError(
          error.responseMessage,
          "Biller Enquiry"
        );
      }
    );
    // var str = stringInject("My username is {username} on {platform}", { username: "tjcafferkey", platform: "GitHub" });
  }
  onChange(value) {
    if (value === "1") {
      this.showPinField = true;
      this.form.patchValue({
        pin: "",
      });
    }else {
      this.showPinField = false;
    }
  }

  onContinue(): void {
    console.log("this.form.valid", this.form.valid)
    // if (!this.form.valid) {
    //   return;
    // }
    if (this.form.value.paymentMethod === "1") {
      this.paymentMethod = "Wallet";
    }
    if (this.form.value.paymentMethod === "2") {
      this.paymentMethod = "Card";
    }
    if (this.form.value.paymentMethod === "3") {
      this.paymentMethod = "Bank Transfer";
    }
    this.showForm = false;
    this.getCharges(
      this.walletDetail?.merchantId,
      this.categoryCode,
      this.form.value.amount,
      this.serviceType
    );
    this.formClone = Object.assign({}, this.form.value);
  }

  onSubmit() {
    this.doPayWithWallet(this.form.value);
  }

  doPayWithWallet(form) {
    let payload;
    const ref = Math.random().toString().replace("0.", "");

    const dataPayload = {
      merchantRef: ref,
      amount: form.amount,
      paymentMethod: form.paymentMethod,
      beneficiaryEmail: form?.x_email,
      beneficiaryPhone: form?.phone,
      walletId: this.walletDetail?.walletId,
      pin: form.paymentMethod === "1" ? form?.pin : null,
      category: this.categoryCode,
      serviceType: this.serviceType,
    };

    if (this.categoryCode === "databundle") {
      payload = {
        ...dataPayload,
        databundle: {
          phone: form?.phone,
          dataCode: this.selectedBundle?.code,
          dataName: this.selectedBundle?.name,
        },
      };
    } else if (this.categoryCode === "airtime") {
      this.isLoading = true;
      payload = {
        ...dataPayload,
        airtime: {
          phone: form?.phone,
          plan: form?.plan,
        },
      };
    } else if (this.categoryCode === "cabletv") {
      this.isLoading = true;
      payload = {
        ...dataPayload,
        cabletv: {
          enquiryRef: this.billerEnquiryResponse?.accountEnquiryRef,
          productCode: this.selectedBundle?.code,
          productName: this.selectedBundle?.name,
        },
      };
    } else if (this.categoryCode === "electricity") {
      this.isLoading = true;
      payload = {
        ...dataPayload,
        electricity: {
          enquiryRef: this.billerEnquiryResponse?.accountEnquiryRef,
        },
      };
    }

    this.billerService.doWalletTransaction(payload).subscribe(
      (response) => {
        this.isLoading = false;
        if (response.responseCode === "00") {
          if(form.paymentMethod == "3") {
          this.router.navigateByUrl(
            `/pay/confirm/status/${payload?.merchantRef}?transfer=${JSON.stringify(response.transfer)}`
          );
          } else {
            this.router.navigateByUrl(
              `/pay/confirm/status/${payload?.merchantRef}`
            );
          }
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

  get f() {
    return this.form.controls;
  }

  getFieldType(value) {
    switch (value) {
      case "LIST":
        return "select";
      case "email":
        return "email";
      default:
        return "text";
    }
  }

  private getValidator(formField: any): ValidatorFn {
    switch (formField.required) {
      case true:
        return Validators.required;
      default:
        return null;
    }
  }

  back() {
    this.showForm = true;
  }
}
