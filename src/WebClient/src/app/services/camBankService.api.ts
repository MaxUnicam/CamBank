/**
 * Servizio per l'interazione con le api
 * del backend
 */

import 'rxjs/Rx';

import { CamBankService } from './iCamBankService';
import { IAuthResponse } from '../shared/authResponse';

import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CamBankServiceApi implements CamBankService {

  private baseUrl = 'http://localhost:8080/';


  constructor(private http: Http) { }

  authorize(): Promise<IAuthResponse> {
    const body = {name: 'max', password: 'pwd'};
    return this.http.post(this.baseUrl + 'auth', body)
            .map(res => res.json() as IAuthResponse)
            .toPromise();
  }

}
