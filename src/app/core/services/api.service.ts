import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api.models";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}
  // public headers: any = {};
  reqHeader = new HttpHeaders({
    "Content-Type": "application/json",
    "client-code": environment.clientKey,
    // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  });

  /**
   * setHeaders
   * @description this is use to set request header if it a json request
   */
  public setHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");
    headers = headers.set("client-code", environment.clientKey);

    // const headers = new HttpHeaders();
    // headers['Content-Type'] = 'application/json';
    // headers['client-code'] = 'CHKMOBILEI2207247472';
    return headers;
  }

  public post(url: string, data?: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(url, data || {}, {
      headers: this.setHeaders(),
    });
  }

  // public upload(url: string, data?: any): Observable<ApiResponse> {
  //   // const headers = new HttpHeaders();
  //   // headers['Content-Type'] = 'application/json';
  //   return this.http.post<ApiResponse>(url, data || {},);
  // }

  public put(url: string, data?: any): Observable<any> {
    return this.http.put(url, data || {}, { headers: this.reqHeader });
  }

  fileUpload(url: string, data?: any): Observable<any> {
    return this.http.post(url, data || {});
  }
  /**
   *
   * @param {string} path
   * @returns {Observable<any>}
   */
  public get(url: string): Observable<any> {
    return this.http.get(url, { headers: this.reqHeader });
  }
}
