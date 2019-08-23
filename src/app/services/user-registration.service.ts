import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

// import common service
import { ApiService } from './common-service/common.service';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  constructor(private _ApiService: ApiService) {}

  registerUser(requestBody): Observable<any> {
    return this._ApiService.post('user/new', requestBody).pipe(
      map(response => {
        return response;
      }),
      catchError(res => {
        throw res;
      })
    );
  }
}
