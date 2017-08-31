/**
 * Servizio per l'interazione con le api
 * del backend
 */

import 'rxjs/Rx';

import { CamBankService } from './iCamBankService';

import { IAuthResponse } from '../shared/authResponse';
import { IContact } from '../shared/models/contact';
import { IUser } from '../shared/models/user';
import { IBankTransaction } from '../shared/models/bankTransaction';

import {
  Http,
  RequestOptions,
  Headers,
  ResponseContentType
} from '@angular/http';

import { Injectable } from '@angular/core';


// TODO: quando ci sono errori di autenticazione bisogna mostrare il componente
// apposito

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

  loggedUserIban(): Promise<string> {
    return this.http.get(this.baseUrl + 'utils/userIban', { headers: this.header })
            .map(res => res.json() as string)
            .toPromise();
  }


  /*
   * Metodi per la gestione dei movimenti bancari
   */

  transactions(): Promise<IBankTransaction[]> {
    return this.http.get(this.baseUrl + 'transactions/', { headers: this.header })
            .map(res => res.json() as IBankTransaction[])
            .toPromise();
  }

  transaction(transactionId): Promise<IBankTransaction> {
    return this.http.get(this.baseUrl + 'transactions/' + transactionId, { headers: this.header })
            .map(res => res.json() as IBankTransaction)
            .toPromise();
  }

  updateTransactionNotes(transactionId, notes): Promise<IBankTransaction> {
    const body = { notes: notes };
    return this.http.put(this.baseUrl + 'transactions/update/' + transactionId, body, { headers: this.header })
            .map(res => res.json() as IBankTransaction)
            .toPromise();
  }

  addTransfer(transfer): Promise<IBankTransaction> {
    const body = this.bodyFromBankTransaction(transfer);
    return this.http.post(this.baseUrl + 'transactions/add/transfer', body, { headers: this.header } )
            .map(res => res.json() as IBankTransaction)
            .toPromise();
  }

  addPhoneCharging(phoneCharging): Promise<IBankTransaction> {
    const body = this.bodyFromBankTransaction(phoneCharging);
    return this.http.post(this.baseUrl + 'transactions/add/phoneCharging', body, { headers: this.header } )
            .map(res => res.json() as IBankTransaction)
            .toPromise();
  }

  addMav(mav): Promise<IBankTransaction> {
    const body = this.bodyFromBankTransaction(mav);
    return this.http.post(this.baseUrl + 'transactions/add/mav', body, { headers: this.header } )
            .map(res => res.json() as IBankTransaction)
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

  contact(iban): Promise<IContact> {
    return this.http.get(this.baseUrl + 'contacts/' + iban, { headers: this.header })
            .map(res => res.json() as IContact)
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
    return this.http.delete(this.baseUrl + 'contacts/delete/' + iban, { headers: this.header } )
            .map(res => res.json() as IContact)
            .toPromise();
  }


  /*
   * Metodi di recupero dei report
   */

  statusReport(): Promise<Blob> {
    let pdfHeader = this.header;
    pdfHeader.append('Accept', 'application/pdf');
    return this.http.get(this.baseUrl + 'reports/status', { headers: pdfHeader, responseType: ResponseContentType.Blob })
            .map(res => new Blob([res.blob()], { type: 'application/pdf' }) )
            .toPromise();
  }


  /*
   * Metodi di utilità sul server
   */

  operators(): Promise<IUser[]> {
    return this.http.get(this.baseUrl + 'utils/operators', { headers: this.header })
            .map(res => res.json() as IUser[])
            .toPromise();
  }


  /*
   * Metodi di utilità in locale
   */

   bodyFromBankTransaction(transaction): object {
     const body = {
       emitterIban: transaction.emitterIban,
       receiverIban: transaction.receiverIban,
       notes: transaction.notes,
       amount: transaction.amount,
       date: transaction.date,
       phoneNumber: transaction.phoneNumber,
       mavId: transaction.mavId
     };
     return body;
   }

}
