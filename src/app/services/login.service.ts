import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

// import jwt service
import { JwtService } from './jwt/jwt-service.service';

// import common service
import { ApiService } from './common-service/common.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private _JwtService: JwtService,
    private _ApiService: ApiService
  ) { }

  /**
   * login to the system
   * @param requestBody login credentials
   */
  loginUser(requestBody) {
    return this._ApiService.put('users', requestBody).pipe(
      map(data => {
        if (data.data && data.data['token']) {
          // Set the logged in user to local storage
          this._JwtService.saveToken(data.data['token']);
          return data.data;
        }
      }),
      catchError(res => {
        throw res;
      })
    );
  }

/**
 * get logged in user details from local storage
 */
  getLoggedInUser() {
    // get token from the local storage
    const localToken = this._JwtService.getToken();

    if (!localToken) {
      return null;
    }
    
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localToken);
    const expirationDate = helper.getTokenExpirationDate(localToken);
    const isExpired = helper.isTokenExpired(localToken);
    const loggedInUser = decodedToken['user'];
    return loggedInUser;
  }
}
