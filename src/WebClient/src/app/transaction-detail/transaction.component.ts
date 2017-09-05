import 'rxjs/add/operator/switchMap';

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { CamBankService } from 'app/services/iCamBankService';
import { IBankTransaction } from 'app/shared/models/bankTransaction';

import { BaseLocationDataComponent } from 'app/base-location-data.component';


@Component({
  selector: 'transaction-detail',
  styleUrls: ['./transaction.component.css'],
  templateUrl: './transaction.component.html'
})

export class TransactionDetailComponent extends BaseLocationDataComponent implements OnInit {

  id: string;
  transaction: IBankTransaction;

  constructor(cambankService: CamBankService, private route: ActivatedRoute,
    location: Location, router: Router) {
    super(cambankService, location, router);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (!this.id) {
      return;
    }

    this.camBankService.transaction(this.id).then(t => {
      this.transaction = t;
    },
    reason => this.HandlerError(reason));

    return this.id;
  }

  updateNotes() {
    this.camBankService.updateTransactionNotes(this.transaction._id, this.transaction.notes).then(transaction => {
      console.log(transaction);
    },
    reason => this.HandlerError(reason));
  }

}
