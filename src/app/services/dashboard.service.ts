import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from './common-service/common.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _ApiService: ApiService) { }

  /**
   * get dashboard data
   */
  getDashboardData(requestBodyy) {
    return this._ApiService.post('dashboard', requestBodyy).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        throw error;
      })
    );
  }


}
