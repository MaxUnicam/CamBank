/**
 * Servizio per l'interazione con le api
 * del backend
 */

import 'rxjs/Rx';

import { CamBankService } from './iCamBankService';
import { IAuthResponse } from '../shared/authResponse';
import { IContact } from '../shared/models/contact';

import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class CamBankServiceApi implements CamBankService {

  private header = new Headers();
  private baseUrl = 'http://localhost:8080/';


  constructor(private http: Http) {
    const token = localStorage.getItem('token');
    this.header.append('x-access-token', token);
  }

  /*
   * Metodi per l'autenticazione
   */

  authorize(username, password): Promise<IAuthResponse> {
    const body = {name: username, password: password};
    return this.http.post(this.baseUrl + 'auth', body)
            .map(res => res.json() as IAuthResponse)
            .toPromise();
  }

  /*
   * Metodi per la gestione della rubrica dell'utente loggato
   */

  contacts(): Promise<IContact[]> {
    return this.http.get(this.baseUrl + 'contacts/', { headers: this.header })
            .map(res => res.json() as IContact[])
            .toPromise();
  }

  addContact(contact): Promise<IContact> {
    const body = { iban: contact.iban, name: contact.name };
    return this.http.post(this.baseUrl + 'contacts/add', body, { headers: this.header })
            .map(res => res.json() as IContact)
            .toPromise();
  }

  updateContact(iban, contact): Promise<IContact> {
    const body = { newIban: contact.iban, name: contact.name };
    return this.http.put(this.baseUrl + 'contacts/update/' + iban, body, { headers: this.header })
            .map(res => res.json() as IContact)
            .toPromise();
  }

  deleteContact(iban): Promise<IContact> {
    return this.http.delete(this.baseUrl + 'contacts/delete/' + iban, { headers: this.header} )
            .map(res => res.json() as IContact)
            .toPromise();
  }

}
