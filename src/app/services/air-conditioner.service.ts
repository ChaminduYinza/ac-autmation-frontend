import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { ApiService } from './common-service/common.service';

@Injectable({
  providedIn: 'root'
})
export class AirConditionerService {

  constructor(private _ApiService: ApiService) { }

  /**
   * get all air conditioners
   */
  getAirConditioners() {
    return this._ApiService.get('api/ac').pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        throw error;
      })
    );
  }


  /**
   * get air conditioner by did
   */
  getAirConditionerByDid(body) {
    return this._ApiService.post('api/ac/find-one',body).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        throw error;
      })
    );
  }

  /**
   * update conditioner
   */
  updateAirConditioner(body) {
    return this._ApiService.post('api/ac', body).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        throw error;
      })
    );
  }

}
