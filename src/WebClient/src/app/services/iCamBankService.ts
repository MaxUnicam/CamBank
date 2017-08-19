import { IAuthResponse } from '../shared/authResponse';
import { IContact } from '../shared/models/contact';


export interface ICamBankService {
  // Metodi di autenticazione
  authorize(username, password): Promise<IAuthResponse>;

  // Metodi per gestire la rubrica dell'utente loggato
  contacts(): Promise<IContact[]>;
  addContact(contact): Promise<IContact>;
  updateContact(iban, contact): Promise<IContact>;
  deleteContact(iban): Promise<IContact>;
}


export abstract class CamBankService implements ICamBankService {
  abstract authorize(username, password): Promise<IAuthResponse>;

  abstract contacts(): Promise<IContact[]>;
  abstract addContact(contact): Promise<IContact>;
  abstract updateContact(iban, contact): Promise<IContact>;
  abstract deleteContact(iban): Promise<IContact>;
}
