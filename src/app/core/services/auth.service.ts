import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment as env } from "../../../environments/environment";

import { getFirebaseBackend } from "../../authUtils";
import {
  decrypt,
  decryptionAES,
  encrypt,
  encryptionAES,
} from "../helpers/util";
import { AppConstants } from "../models/app.constant";
import { ApiService } from "./api.service";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  user: any;
  private readonly baseUrl = env.baseUrl;
  private readonly accountBaseUrl = env.accountBaseApi;
  private currentUserSubject: BehaviorSubject<any>;
  public currentLoggedInUser: Observable<any>;

  constructor(private apiService: ApiService, private router: Router) {}

  public get currentUserValue() {
    return localStorage.getItem(AppConstants.tokeKey);
  }

  /**
   * Performs the auth
   * @param email email of user
   * @param password password of user
   */
  login(payload: any) {
    return this.apiService
      .post(
        `${this.accountBaseUrl}/account-app/payout-wallet/login-account-profile`,
        payload
      )
      .pipe(map((user) => user));
  }

  merchantlogin(payload: any) {
    return this.apiService
      .post(
        `${this.accountBaseUrl}/merchant-app/login`,
        payload
      )
      .pipe(map((user) => user));
  }


  register(payload: any) {
    return this.apiService
      .post(
        `${this.accountBaseUrl}/account-app/payout-wallet/create-account-profile`,
        payload
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  merchantRegister(payload: any) {
    return this.apiService
      .post(
        `${this.accountBaseUrl}/merchant-app/create-merchant`,
        payload
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  forgotPassword(payload) {
    return this.apiService
      .put(`${this.accountBaseUrl}/user/forgetpassword`, payload)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  changePassword(payload) {
    return this.apiService
      .put(`${this.accountBaseUrl}/user/passwordactivation`, payload)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  verifyAccount(payload) {
    return this.apiService
      .put(`${this.accountBaseUrl}/user/activateUser`, payload)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  /**
   * Logout the user
   */
  logout() {
    localStorage.removeItem(AppConstants.sessionKey);
    localStorage.removeItem(AppConstants.tokeKey);
    localStorage.clear();
    this.router.navigate(["/account/login"]);
    location.reload();
  }

  setCredentials(data) {
    localStorage.setItem(
      AppConstants.sessionKey,
      encryptionAES(JSON.stringify(data))
    );
  }

  getCredential() {
    const data = localStorage.getItem(AppConstants.sessionKey);
    if (data) return JSON.parse(decryptionAES(data));
  }

  setWalletDetails(data) {
    localStorage.setItem(
      AppConstants.walletKey,
      encryptionAES(JSON.stringify(data))
    );
  }

  getWalletDetails() {
    const data = localStorage.getItem(AppConstants.walletKey);
    if (data) {
      const decryptedData = decryptionAES(data);
      return JSON.parse(decryptedData);
    }
  }

  setToken(data) {
    localStorage.setItem(AppConstants.tokeKey, data);
  }

  isAuthenticated(): boolean {
    const login = localStorage.getItem(AppConstants.tokeKey);
    if (login !== null && login !== undefined && login !== "") {
      return true;
    }
    return false;
  }

  private handleError(error: Response | any) {
    return throwError(error);
  }
  private extractData(res: Response | any) {
    return res || [];
  }
}
