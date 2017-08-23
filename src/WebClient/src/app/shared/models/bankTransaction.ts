// TODO : sostituire il tipo dato della proprietà amount da
// number ad un numero con precisione decimale

export interface IBankTransaction {
  emitterIban: string;
  receiverIban: string;
  cause: string;
  notes: string;
  amount: any;
  date: Date;
}
