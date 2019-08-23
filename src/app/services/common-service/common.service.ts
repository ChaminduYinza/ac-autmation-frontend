import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { JwtService } from '../jwt/jwt-service.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient, private jwtService: JwtService) { }

  // Setting Headers for API Request
  private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };

    if (this.jwtService.getToken()) {
      headersConfig['Authorization'] = this.jwtService.getToken();
    }
    return new HttpHeaders(headersConfig);
  }

  // Perform a GET Request
  get(path: string): Observable<any> {
    return this.http
      .get(`${environment.api_url}${path}`, { headers: this.setHeaders() })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }
  // Perform a GET Request
  getParams(
    path: string,
    params
  ): Observable<any> {
    return this.http
      .get(`${environment.api_url}${path}`, {
        headers: this.setHeaders()
      })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  // Perform a PUT Request
  put(path: string, body): Observable<any> {
    return this.http
      .put(`${environment.api_url}${path}`, JSON.stringify(body), {
        headers: this.setHeaders()
      })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  // Perform POST Request
  post(path, body): Observable<any> {
    return this.http
      .post(`${environment.api_url}${path}`, JSON.stringify(body), {
        headers: this.setHeaders()
      })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  // Perform Delete Request
  delete(path, body): Observable<any> {
    return this.http
      .request('delete', `${environment.api_url}${path}`,
        { headers: this.setHeaders(), body: body })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }
}
