import { IAuthResponse } from '../shared/authResponse';
import { IContact } from '../shared/models/contact';
import { IBankTransaction } from '../shared/models/bankTransaction';
import { IUser } from 'app/shared/models/user';


export interface ICamBankService {
  // Metodi di autenticazione
  authorize(username, password): Promise<IAuthResponse>;
  register(email, password, name): Promise<IUser>;
  loggedUserIban(): Promise<string>;

  // Metodi per gestire le transazioni dell'utente corrente
  transactions(): Promise<IBankTransaction[]>;
  transaction(transactionId): Promise<IBankTransaction>;
  updateTransactionNotes(transactionId, notes): Promise<IBankTransaction>;

  addTransfer(transfer): Promise<IBankTransaction>;
  addPhoneCharging(phoneCharging): Promise<IBankTransaction>;
  addMav(mav): Promise<IBankTransaction>;

  balance(): Promise<String>;

  // Metodi per gestire la rubrica dell'utente loggato
  contacts(): Promise<IContact[]>;
  contact(iban): Promise<IContact>;
  addContact(contact): Promise<IContact>;
  updateContact(iban, contact): Promise<IContact>;
  deleteContact(iban): Promise<IContact>;

  // Metodi di utilità
  operators(): Promise<IUser[]>;

  outgoings(): Promise<any>;

  // Metodi per il download dei report in pdf
  statusReport(): Promise<Blob>;
  transactionReport(id): Promise<Blob>;

  // Metodo per aggiornare gli header delle richieste
  updateAccessToken(token: string);
}


export abstract class CamBankService implements ICamBankService {
  abstract authorize(username, password): Promise<IAuthResponse>;
  abstract register(email, password, name): Promise<IUser>;
  abstract loggedUserIban(): Promise<string>;

  abstract transactions(): Promise<IBankTransaction[]>;
  abstract transaction(transactionId): Promise<IBankTransaction>;
  abstract updateTransactionNotes(transactionId, notes): Promise<IBankTransaction>;

  abstract addTransfer(transfer): Promise<IBankTransaction>;
  abstract addPhoneCharging(phoneCharging): Promise<IBankTransaction>;
  abstract addMav(mav): Promise<IBankTransaction>;

  abstract balance(): Promise<String>;

  abstract contacts(): Promise<IContact[]>;
  abstract contact(iban): Promise<IContact>;
  abstract addContact(contact): Promise<IContact>;
  abstract updateContact(iban, contact): Promise<IContact>;
  abstract deleteContact(iban): Promise<IContact>;

  abstract operators(): Promise<IUser[]>;

  abstract outgoings(): Promise<any>;

  abstract statusReport(): Promise<Blob>;
  abstract transactionReport(id): Promise<Blob>;

  abstract updateAccessToken(token: string);
}
