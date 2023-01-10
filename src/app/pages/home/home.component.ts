import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiResponse } from "src/app/core/models/api.models";
import { BillerService } from "src/app/core/services/biller.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  billerCategories: any;
  billerList: any;
  isLoading = true;
  constructor(private billerService: BillerService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getBillerList();
  }

  getBillerList() {
    this.billerService
      .getBillerCategory()
      .subscribe((response: ApiResponse) => {
        this.isLoading = false;
        if (response.responseCode === "00") {
          this.billerCategories = response.data;
          this.getBillerCategoryCode(response?.data[0]?.code);
        }
      },error => this.isLoading = false);
  }

  getBillerCategoryCode(categoryCode) {
    this.isLoading = true;
    this.billerService
      .getBillerCategoryCode(categoryCode)
      .subscribe((response: ApiResponse) => {
        this.isLoading = false;
        if (response.responseCode == "00") {
          this.billerList = response.data[0];
        }
      },error => this.isLoading = false);
  }

  gotoPay(biller, billerList) {
    this.router.navigateByUrl(`/pay/${billerList?.categoryName}/${biller?.serviceType}`)
  }
}
