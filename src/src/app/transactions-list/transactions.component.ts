import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { CamBankService } from 'app/services/iCamBankService';

import { IBankTransaction } from 'app/shared/models/bankTransaction';

import { BaseDataComponent } from 'app/base-data.component';


@Component({
  selector: 'transactions-list',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})

export class TransactionsListComponent extends BaseDataComponent implements OnInit {

  transactions: IBankTransaction[];
  balance: String;

  constructor(camBankService: CamBankService, router: Router) {
    super(camBankService, router);
  }

  ngOnInit() {
    this.isBusy = true;
    this.camBankService.transactions().then(transactions => {
      this.isBusy = false;
      this.transactions = transactions;
      this.camBankService.balance().then(balance => {
        this.balance = balance;
      });
    },
    reason => {
      this.isBusy = false;
      this.HandlerError(reason)
    });
  }

  transactionClicked(transaction) {
    this.router.navigateByUrl('/transactions/' + transaction._id);
  }

  downloadReport(id) {
    this.camBankService.transactionReport(id).then(report => {
      const fileURL = URL.createObjectURL(report);
      window.open(fileURL);
    },
    reason => this.HandlerError(reason));
  }

}
