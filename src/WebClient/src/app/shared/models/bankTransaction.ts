export interface IBankTransaction {
  _id: string;
  emitterIban: string;
  receiverIban: string;
  cause: string;
  notes: string;
  amount: any;
  date: Date;
}
