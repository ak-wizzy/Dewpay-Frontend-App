import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import {
  environment as env,
  environment,
} from "../../../environments/environment";
import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class WalletService {
  readonly baseUrl = env.accountBaseApi;
  constructor(private http: HttpClient, private apiService: ApiService) {}

  getWalletDetails(merchantId, phoneNumber) {
    return this.apiService
      .get(`${this.baseUrl}/account-app/payout-wallet/get-wallet/${merchantId}/${phoneNumber}`)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  private handleError(error: Response | any) {
    return throwError(error);
  }
  private extractData(res: Response | any) {
    return res || [];
  }
}
