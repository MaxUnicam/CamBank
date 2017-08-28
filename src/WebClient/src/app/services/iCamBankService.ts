import { IAuthResponse } from '../shared/authResponse';
import { IContact } from '../shared/models/contact';
import { IBankTransaction } from '../shared/models/bankTransaction';
import { IUser } from 'app/shared/models/user';


export interface ICamBankService {
  // Metodi di autenticazione
  authorize(username, password): Promise<IAuthResponse>;
  loggedUserIban(): Promise<string>;

  // Metodi per gestire le transazioni dell'utente corrente
  transactions(): Promise<IBankTransaction[]>;
  transaction(transactionId): Promise<IBankTransaction>;
  updateTransactionNotes(transactionId, notes): Promise<IBankTransaction>;

  addTransfer(transfer): Promise<IBankTransaction>;
  addPhoneCharging(phoneCharging): Promise<IBankTransaction>;
  addMav(mav): Promise<IBankTransaction>;

  // Metodi per gestire la rubrica dell'utente loggato
  contacts(): Promise<IContact[]>;
  addContact(contact): Promise<IContact>;
  updateContact(iban, contact): Promise<IContact>;
  deleteContact(iban): Promise<IContact>;

  // Metodi di utilità
  operators(): Promise<IUser[]>;

  // Metodi per il download dei report in pdf
  statusReport(): Promise<Blob>;
}


export abstract class CamBankService implements ICamBankService {
  abstract authorize(username, password): Promise<IAuthResponse>;
  abstract loggedUserIban(): Promise<string>;

  abstract transactions(): Promise<IBankTransaction[]>;
  abstract transaction(transactionId): Promise<IBankTransaction>;
  abstract updateTransactionNotes(transactionId, notes): Promise<IBankTransaction>;

  abstract addTransfer(transfer): Promise<IBankTransaction>;
  abstract addPhoneCharging(phoneCharging): Promise<IBankTransaction>;
  abstract addMav(mav): Promise<IBankTransaction>;

  abstract contacts(): Promise<IContact[]>;
  abstract addContact(contact): Promise<IContact>;
  abstract updateContact(iban, contact): Promise<IContact>;
  abstract deleteContact(iban): Promise<IContact>;

  abstract operators(): Promise<IUser[]>;

  abstract statusReport(): Promise<Blob>;
}
