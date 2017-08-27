import { Component } from '@angular/core';

import { IBankTransaction } from 'app/shared/models/bankTransaction';


@Component({
  selector: 'add-transaction',
  templateUrl: './add-transaction.component.html'
})

export class AddTransactionComponent {

  transaction: IBankTransaction;

  constructor() {
    this.transaction = {
      cause: '',
      emitterIban: '',
      receiverIban: '',
      amount: null,
      date: null,
      notes: ''
    };
  }

  create() {
    const dateAsString = this.transaction.date;
    this.transaction.date = new Date(dateAsString);
    console.log(this.transaction);
  }

}
