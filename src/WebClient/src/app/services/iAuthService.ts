export interface IAuthService {

  currentUserIban(): Promise<string>;

}


export abstract class AuthService implements IAuthService {

  abstract currentUserIban(): Promise<string>;

}
