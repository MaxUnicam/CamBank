import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CamBankService } from 'app/services/iCamBankService';

import { IBankTransaction } from 'app/shared/models/bankTransaction';

import { BaseDataComponent } from 'app/base-data.component';


@Component({
  selector: 'transactions-page',
  styleUrls: ['./transactions-page.component.css'],
  templateUrl: './transactions-page.component.html'
})

export class TransactionsPageComponent extends BaseDataComponent {

  constructor(camBankService: CamBankService, router: Router) {
    super(camBankService, router);
  }

  getStatusReport() {
    this.camBankService.statusReport().then(report => {
      const fileURL = URL.createObjectURL(report);
      window.open(fileURL);
    },
    reason => this.HandlerError(reason));
  }

  openTransactionCreationForm() {
    this.router.navigateByUrl('/transactions/add');
  }

}
