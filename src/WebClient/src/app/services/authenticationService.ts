import { Injectable } from '@angular/core';

import { AuthService } from './iAuthService';
import { CamBankService } from './iCamBankService';

import { IAuthResponse } from '../shared/authResponse';


@Injectable()
export class AuthServiceApi implements AuthService {

  private loggedUserIban: string;
  private authenticated = false;


  constructor(private apiService: CamBankService) {
    this.loggedUserIban = localStorage.getItem('loggedUserIban');
    this.authenticated = localStorage.getItem('token') != null && localStorage.getItem('token') !== 'null';
    this.updateLoggedUserIban();
  }

  currentUserIban(): string {
    return this.loggedUserIban;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  authenticate(username, password): Promise<IAuthResponse> {
    return this.apiService.authorize(username, password).then(response => {
      localStorage.setItem('token', response.token);
      this.apiService.updateAccessToken(response.token);
      this.authenticated = true;
      this.updateLoggedUserIban();
      return response;
    },
    reason => {
      this.authenticated = false;
      return reason;
    });
  }

  logout() {
    localStorage.setItem('token', null);
    localStorage.setItem('loggedUserIban', null);
    this.loggedUserIban = null;
    this.authenticated = false;
    this.apiService.updateAccessToken(null);
  }


  /**
   * Utility methods
   */

  updateLoggedUserIban() {
    this.apiService.loggedUserIban().then(iban => {
      this.loggedUserIban = iban;
      localStorage.setItem('loggedUserIban', iban);
    },
    reason => {
      console.log(reason);
    });
  }

}
