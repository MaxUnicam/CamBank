export interface IUser {
  iban: string;
  name: string;
  password: string;
  email: string;
  registrationDate: Date;
  isOperator: boolean;
}
