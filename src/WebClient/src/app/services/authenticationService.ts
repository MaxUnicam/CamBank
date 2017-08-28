import { AuthService } from './iAuthService';
import { CamBankServiceApi } from './camBankService.api';

import { Injectable } from '@angular/core';


@Injectable()
export class AuthServiceApi implements AuthService {

  loggedUserIban: string;


  constructor(private apiService: CamBankServiceApi) { }

  currentUserIban(): Promise<string> {
    if (this.loggedUserIban) {
      return Promise.resolve(this.loggedUserIban);
    }

    return this.apiService.loggedUserIban();
  }

}
