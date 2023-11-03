import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpPublicService {
  private baseUrl: string = environment.apiStudentBaseUrl;

  constructor(private http: HttpClient) {}

  setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getToken(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.token || '';
  }

  get(endpoint: string): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${this.baseUrl}/${endpoint}`, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleErrorResponse(error);
        return throwError(error);
      })
    );
  }

  post(endpoint: string, data: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${this.baseUrl}/${endpoint}`, data, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleErrorResponse(error);
        return throwError(error);
      }),
    );
  }

  put(endpoint: string, data: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.put(`${this.baseUrl}/${endpoint}`, data, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleErrorResponse(error);
        return throwError(error);
      })
    );
  }

  delete(endpoint: string): Observable<any> {
    const headers = this.createHeaders();
    return this.http.delete(`${this.baseUrl}/${endpoint}`, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleErrorResponse(error);
        return throwError(error);
      })
    );
  }

  private createHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json',
    });
  }

  handleErrorResponse(error: HttpErrorResponse) {
    console.error('HTTP Error:', error);
  }
}
