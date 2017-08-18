import { IAuthResponse } from '../shared/authResponse';

export interface ICamBankService {
  authorize(): Promise<IAuthResponse>;
}


export abstract class CamBankService implements ICamBankService {
  abstract authorize(): Promise<IAuthResponse>;
}
