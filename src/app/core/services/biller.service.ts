import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env, environment } from "../../../environments/environment";
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BillerService {

  
  readonly baseUrl = env.baseUrl;
  readonly accountBaseApi = env.accountBaseApi;
  
  constructor(private http: HttpClient, private apiService: ApiService) {}

  getBillerCategory() {
    return this.apiService
      .get(`${this.baseUrl}/biller-app/category-list`)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  getBillerCategoryCode(categoryCode) {
    return this.apiService
      .get(`${this.baseUrl}/biller-app/service-list-by-category/${categoryCode}`)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  getBillerForm(categoryCode, serviceType) {
    return this.apiService
      .get(`${this.baseUrl}/biller-app/biller-form-field/${environment.merchantId}/${categoryCode}/${serviceType}`)
      .pipe(map(this.extractData), catchError(this.handleError));
  }


  getTransactionStatus(transactionId) {
    return this.apiService
      .get(`${this.accountBaseApi}/account-app/biller-trans/transaction-status/${transactionId}`)
      .pipe(map(this.extractData), catchError(this.handleError));
  }


  getTransactions(data) {
    return this.apiService
      .post(`${this.accountBaseApi}/account-app/biller-trans/transaction-list`, data)
      .pipe(map(this.extractData), catchError(this.handleError));
  }


  doLookUp(url) {
    return this.apiService
      .get(`${url}`)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  doWalletTransaction(data) {
    return this.apiService
      .post(`${this.accountBaseApi}/account-app/biller-trans/pay-bills`, data)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  getCharges(merchantId, category, amount, serviceType) {
    return this.apiService
      .get(`${this.accountBaseApi}/account-app/biller-trans/biller-charge/${merchantId}/${category}/${serviceType}/${amount}`)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  private handleError(error: Response | any) {
    return throwError(error);
  }
  private extractData(res: Response | any) {
    return res || [];
  }
}
