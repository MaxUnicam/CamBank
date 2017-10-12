/**
 * Servizio per l'interazione con le api
 * del backend
 */

import 'rxjs/Rx';

import { isDevMode } from '@angular/core';

import { CamBankService } from './iCamBankService';

import { IAuthResponse } from '../shared/authResponse';
import { IContact } from '../shared/models/contact';
import { IUser } from '../shared/models/user';
import { IBankTransaction } from '../shared/models/bankTransaction';
import { IOutgoings } from 'app/shared/outgoings';
import { ICurrencyQuote } from 'app/shared/currencyQuote';

import {
  Http,
  RequestOptions,
  Headers,
  ResponseContentType
} from '@angular/http';

import { Injectable } from '@angular/core';


@Injectable()
export class CamBankServiceApi implements CamBankService {

  private header = new Headers();
  private baseUrl = '/api/';

  private baseForgeUrl = 'https://forex.1forge.com/1.0.2/';
  private forgePrivateKey = 'DpwTPsb4fZczl78Qpmzhadp9IWq1Qwmj';


  constructor(private http: Http) {
    if (isDevMode()) {
      this.baseUrl = 'http://localhost:8080/api/';
    }

    const token = localStorage.getItem('token');
    if (token != null && token != 'null') {
      this.header.append('x-access-token', token);
    }
    this.header.append('Access-Control-Allow-Origin', '*');
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

  register(email, password, name): Promise<IUser> {
    const body = { email: email, password: password, name: name };
    return this.http.post(this.baseUrl + 'auth/register', body)
            .map(res => res.json() as IUser)
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

  balance(): Promise<String> {
    return this.http.get(this.baseUrl + 'transactions/status/balance', { headers: this.header } )
            .map(res => res.json() as String)
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


  transactionReport(id): Promise<Blob> {
    let pdfHeader = this.header;
    pdfHeader.append('Accept', 'application/pdf');
    return this.http.get(this.baseUrl + 'reports/' + id, { headers: pdfHeader, responseType: ResponseContentType.Blob })
            .map(res => new Blob([res.blob()], { type: 'application/pdf' }) )
            .toPromise();
  }


  updateAccessToken(token: string) {
    if (token == null || token == 'null') {
      this.header = new Headers();
      this.header.delete('x-access-token');
    } else {
      this.header.set('x-access-token', token);
    }
  }


  /**
   * Metodi per il download dei dati dei mercati da 1Forge
   */

  isMarketOpen(): Promise<Boolean> {
    return this.http.get(this.baseForgeUrl + 'market_status?api_key=' + this.forgePrivateKey)
            .map(res => res.json().market_is_open)
            .toPromise();
  }


  currenciesQuote(): Promise<ICurrencyQuote[]> {
    const changes = 'EURGBP,EURCHF,EURUSD,EURCAD,EURJPY';
    return this.http.get(this.baseForgeUrl + 'quotes?pairs=' + changes + '&api_key=' + this.forgePrivateKey)
            .map(res => res.json() as ICurrencyQuote[])
            .toPromise();
    // https://forex.1forge.com/1.0.2/quotes?pairs=EURUSD,GBPJPY,AUDUSD&api_key=DpwTPsb4fZczl78Qpmzhadp9IWq1Qwmj
  }


  /*
   * Metodi di utilità sul server
   */

  operators(): Promise<IUser[]> {
    return this.http.get(this.baseUrl + 'utils/operators', { headers: this.header })
            .map(res => res.json() as IUser[])
            .toPromise();
  }


  outgoings(): Promise<IOutgoings> {
    return this.http.get(this.baseUrl + 'statistics/outgoings', { headers: this.header })
            .map(res => res.json() as IOutgoings)
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
