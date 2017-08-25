import { Component } from '@angular/core';

import { IBankTransaction } from 'app/shared/models/bankTransaction';


@Component({
  selector: 'transactions-page',
  templateUrl: './transactions-page.component.html'
})

export class TransactionsPageComponent {

  selectedTransaction: IBankTransaction;

  onSelectedTransaction(transaction) {
    this.selectedTransaction = transaction;
  }

}
