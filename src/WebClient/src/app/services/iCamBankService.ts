import { IAuthResponse } from '../shared/authResponse';
import { IContact } from '../shared/models/contact';


export interface ICamBankService {
  authorize(): Promise<IAuthResponse>;

  contacts(): Promise<IContact[]>;
}


export abstract class CamBankService implements ICamBankService {
  abstract authorize(): Promise<IAuthResponse>;

  abstract contacts(): Promise<IContact[]>;
}
