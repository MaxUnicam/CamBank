import { Component, OnInit } from '@angular/core';

import { CamBankService } from 'app/services/iCamBankService';

import { IBankTransaction } from 'app/shared/models/bankTransaction';


@Component({
  selector: 'transactions-list',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})

export class TransactionsListComponent implements OnInit {

  transactions: IBankTransaction[];

  constructor(private camBankService: CamBankService) { }

  ngOnInit() {
    this.camBankService.transactions().then(transactions => {
      this.transactions = transactions;
    },
    reason => {
      console.log(reason);
    });
  }

}
