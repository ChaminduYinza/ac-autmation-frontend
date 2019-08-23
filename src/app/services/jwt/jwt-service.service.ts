import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {
  constructor() {}

  getToken() {
    return window.localStorage['token'];
  }

  saveToken(token: string) {
    window.localStorage['token'] = token;
  }

  destroyToken() {
    window.localStorage.clear();
  }
}
