import { IAuthResponse } from '../shared/authResponse';


export interface IAuthService {
  authenticate(username, password): Promise<IAuthResponse>;
  logout();

  currentUserIban(): string;
  isAuthenticated(): boolean;
}


export abstract class AuthService implements IAuthService {
  abstract authenticate(username, password): Promise<IAuthResponse>;
  abstract logout();

  abstract currentUserIban(): string;
  abstract isAuthenticated(): boolean;
}
