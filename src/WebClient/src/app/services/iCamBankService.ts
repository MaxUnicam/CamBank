import { IAuthResponse } from '../shared/authResponse';
import { IContact } from '../shared/models/contact';
import { IBankTransaction } from '../shared/models/bankTransaction';


export interface ICamBankService {
  // Metodi di autenticazione
  authorize(username, password): Promise<IAuthResponse>;

  // Metodi per gestire le transazioni dell'utente corrente
  transactions(): Promise<IBankTransaction[]>;
  transaction(transactionId): Promise<IBankTransaction>;

  addTransfer(transfer): Promise<IBankTransaction>;
  addPhoneCharging(phoneCharging): Promise<IBankTransaction>;
  addMav(mav): Promise<IBankTransaction>;

  // Metodi per gestire la rubrica dell'utente loggato
  contacts(): Promise<IContact[]>;
  addContact(contact): Promise<IContact>;
  updateContact(iban, contact): Promise<IContact>;
  deleteContact(iban): Promise<IContact>;
}


export abstract class CamBankService implements ICamBankService {
  abstract authorize(username, password): Promise<IAuthResponse>;

  abstract transactions(): Promise<IBankTransaction[]>;
  abstract transaction(transactionId): Promise<IBankTransaction>;

  abstract addTransfer(transfer): Promise<IBankTransaction>;
  abstract addPhoneCharging(phoneCharging): Promise<IBankTransaction>;
  abstract addMav(mav): Promise<IBankTransaction>;

  abstract contacts(): Promise<IContact[]>;
  abstract addContact(contact): Promise<IContact>;
  abstract updateContact(iban, contact): Promise<IContact>;
  abstract deleteContact(iban): Promise<IContact>;
}
