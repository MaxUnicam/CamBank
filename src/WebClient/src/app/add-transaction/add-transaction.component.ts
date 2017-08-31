import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

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


  constructor(private location: Location, private camBankService: CamBankService, private router: Router) {
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
    reason => {
      console.log(reason);
    });
  }

  create() {
    this.transaction.date = new Date();
    if (this.transaction.cause === 'bon') {
      this.camBankService.addTransfer(this.transaction).then(
        trans => this.transactionAdded(trans),
        reason => this.handleError(reason)
      );
    } else if (this.transaction.cause === 'ric') {
      this.camBankService.addPhoneCharging(this.transaction).then(
        trans => this.transactionAdded(trans),
        reason => this.handleError(reason)
      );
    } else if (this.transaction.cause === 'mav') {
      this.camBankService.addMav(this.transaction).then(
        trans => this.transactionAdded(trans),
        reason => this.handleError(reason)
      );
    }
  }

  goBack() {
    this.location.back();
  }

  transactionAdded(trans) {
    // this.router.navigateByUrl('/transactions/');
    this.goBack();
  }

  handleError(error) {
    console.log(error);
  }

}
