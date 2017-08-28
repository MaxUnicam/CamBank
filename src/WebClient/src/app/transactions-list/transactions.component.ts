import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { CamBankService } from 'app/services/iCamBankService';

import { IBankTransaction } from 'app/shared/models/bankTransaction';


@Component({
  selector: 'transactions-list',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})

export class TransactionsListComponent implements OnInit {

  transactions: IBankTransaction[];


  constructor(private camBankService: CamBankService, private router: Router) { }

  ngOnInit() {
    this.camBankService.transactions().then(transactions => {
      this.transactions = transactions;
    },
    reason => {
      console.log(reason);
    });
  }

  transactionClicked(transaction) {
    this.router.navigateByUrl('/transactions/' + transaction._id);
  }

}
