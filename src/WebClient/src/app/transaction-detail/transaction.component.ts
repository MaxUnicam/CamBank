import { Component, Input } from '@angular/core';

import { IBankTransaction } from 'app/shared/models/bankTransaction';


@Component({
  selector: 'transaction-detail',
  templateUrl: './transaction.component.html'
})

export class TransactionDetailComponent {

  @Input()
  transaction: IBankTransaction;

}
