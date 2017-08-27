import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { CamBankService } from 'app/services/iCamBankService';

import { IBankTransaction } from 'app/shared/models/bankTransaction';


@Component({
  selector: 'transactions-list',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})

export class TransactionsListComponent implements OnInit {

  transactions: IBankTransaction[];

  @Output()
  transactionSelected = new EventEmitter<IBankTransaction>();
  selectedTransaction: IBankTransaction;


  constructor(private camBankService: CamBankService) { }

  ngOnInit() {
    console.log("On init called");
    this.camBankService.transactions().then(transactions => {
      this.transactions = transactions;
    },
    reason => {
      console.log(reason);
    });
  }

  transactionClicked(transaction) {
    console.log(transaction.cause);
    this.selectedTransaction = transaction;
    this.transactionSelected.emit(transaction);
  }

}
