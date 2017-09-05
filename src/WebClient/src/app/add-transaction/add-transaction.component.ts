import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { CamBankService } from 'app/services/iCamBankService';

import { IBankTransaction } from 'app/shared/models/bankTransaction';
import { IUser } from 'app/shared/models/user';

import { BaseLocationDataComponent } from 'app/base-location-data.component';


@Component({
  selector: 'add-transaction',
  templateUrl: './add-transaction.component.html'
})

export class AddTransactionComponent extends BaseLocationDataComponent implements OnInit {

  transaction: IBankTransaction;
  operators: IUser[];


  constructor(location: Location, cambankService: CamBankService, router: Router) {
    super(cambankService, location, router);
    this.transaction = {
      _id: '',
      cause: '',
      emitterIban: '',
      receiverIban: '',
      amount: null,
      date: null,
      phoneNumber: null,
      mavId: null,
      notes: ''
    };
  }

  ngOnInit() {
    this.camBankService.operators().then(operators => {
      this.operators = operators;
    },
    reason => this.HandlerError(reason));
  }

  create() {
    this.transaction.date = new Date();
    if (this.transaction.cause === 'bon') {
      this.camBankService.addTransfer(this.transaction).then(
        trans => this.transactionAdded(trans),
        reason => this.HandlerError(reason)
      );
    } else if (this.transaction.cause === 'ric') {
      this.camBankService.addPhoneCharging(this.transaction).then(
        trans => this.transactionAdded(trans),
        reason => this.HandlerError(reason)
      );
    } else if (this.transaction.cause === 'mav') {
      this.camBankService.addMav(this.transaction).then(
        trans => this.transactionAdded(trans),
        reason => this.HandlerError(reason)
      );
    }
  }

  transactionAdded(trans) {
    this.goBack();
  }

}
