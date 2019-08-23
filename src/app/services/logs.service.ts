import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// import common service
import { ApiService } from './common-service/common.service';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  constructor(private _ApiService: ApiService) {}

  getOperationLogs(body): Observable<any> {
    return this._ApiService.post('logs/operation', body).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        throw error;
      })
    );
  }

  getmainValveLogs(body): Observable<any> {
    return this._ApiService.post('logs/mainValve', body).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        throw error;
      })
    );
  }
  getRackValveLogs(body): Observable<any> {
    return this._ApiService.post('logs/rackValve', body).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        throw error;
      })
    );
  }
  getPumpLogs(body): Observable<any> {
    return this._ApiService.post('logs/pump', body).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        throw error;
      })
    );
  }

  getCo2Logs(body): Observable<any> {
    return this._ApiService.post('logs/co2', body).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        throw error;
      })
    );
  }

  getLightLogs(body): Observable<any> {
    return this._ApiService.post('logs/light', body).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        throw error;
      })
    );
  }
}
