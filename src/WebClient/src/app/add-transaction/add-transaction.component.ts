import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { CamBankService } from 'app/services/iCamBankService';

import { IBankTransaction } from 'app/shared/models/bankTransaction';
import { IUser } from 'app/shared/models/user';


@Component({
  selector: 'add-transaction',
  templateUrl: './add-transaction.component.html'
})

export class AddTransactionComponent implements OnInit {

  transaction: IBankTransaction;
  operators: IUser[];


  constructor(private location: Location, private camBankService: CamBankService) {
    this.transaction = {
      _id: '',
      cause: '',
      emitterIban: '',
      receiverIban: '',
      amount: null,
      date: null,
      notes: ''
    };
  }

  ngOnInit() {
    this.camBankService.operators().then(operators => {
      this.operators = operators;
    },
    reason => {
      console.log(reason);
    });
  }

  create() {
    const dateAsString = this.transaction.date;
    this.transaction.date = new Date(dateAsString);
  }

  goBack() {
    this.location.back();
  }

}
