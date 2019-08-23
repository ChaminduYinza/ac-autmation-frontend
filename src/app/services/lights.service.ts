import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { ApiService } from './common-service/common.service';

@Injectable({
  providedIn: 'root'
})
export class LightsService {


  constructor(private _ApiService: ApiService) { }

  /**
   * get all lights
   */
  getLights() {
    return this._ApiService.get('api/light').pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        throw error;
      })
    );
  }


  /**
   * get light by did
   */
  getLightByDid(body) {
    return this._ApiService.post('api/light/find-one', body).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        throw error;
      })
    );
  }

  /**
   * update light
   */
  updateLight(body) {
    return this._ApiService.post('api/light', body).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        throw error;
      })
    );
  }
}
