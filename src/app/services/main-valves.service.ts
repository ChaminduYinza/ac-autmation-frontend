import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

// import common service
import { ApiService } from './common-service/common.service';

@Injectable({
  providedIn: 'root'
})
export class MainValvesService {
  constructor(private _ApiService: ApiService) { }

  /**
   * Get registered main valves
   */
  getRegisteredMainValves() {
    return this._ApiService.get('main-valve/get/registered').pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        throw error;
      })
    );
  }

  /**
   * get all values
   */
  getAllMainValves() {
    return this._ApiService.post('valves/query', {}).pipe(
      map(response => {
        return response;
      })
    );
  }

  /**
   * find a valve by its did
   * @param requestBody valve did
   */
  getValveByDid(requestBody): Observable<any> {
    return this._ApiService.post('valves/query', requestBody).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        throw error;
      })
    );
  }


  /**
   * update existing valve
   * @param requestBody updated body
   */
  updateMainValve(requestBody): Observable<any> {
    return this._ApiService.post('valves', requestBody).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        throw error;
      })
    );
  }

  /**
   * toggle valve power
   * @param requestBody status and the id of the valve
   */
  toggleValvePower(requestBody): Observable<any> {
    return this._ApiService.put('valves', requestBody).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        throw error;
      })
    );
  }


  /**
   * delete valve from the system
   * @param requestBody valve id
   */
  deleteMainValve(requestBody): Observable<any> {
    return this._ApiService.delete('valves', requestBody).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        throw error;
      })
    );
  }
}
