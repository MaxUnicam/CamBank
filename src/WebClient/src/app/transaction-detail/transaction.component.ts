import 'rxjs/add/operator/switchMap';

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { CamBankService } from 'app/services/iCamBankService';
import { IBankTransaction } from 'app/shared/models/bankTransaction';


@Component({
  selector: 'transaction-detail',
  styleUrls: ['./transaction.component.css'],
  templateUrl: './transaction.component.html'
})

export class TransactionDetailComponent implements OnInit {

  id: string;
  transaction: IBankTransaction;

  constructor(
    private cambankService: CamBankService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (!this.id) {
      return;
    }

    this.cambankService.transaction(this.id).then(t => {
      this.transaction = t;
    },
    reason => {
      console.log(reason);
    });

    return this.id;
  }

  goBack(): void {
    this.location.back();
  }

  updateNotes() {
    this.cambankService.updateTransactionNotes(this.transaction._id, this.transaction.notes).then(transaction => {
      console.log(transaction);
    },
    reason => {
      console.log(reason);
    });
  }

}
