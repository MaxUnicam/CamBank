import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CamBankService } from 'app/services/iCamBankService';
import { BaseDataComponent } from '../base-data.component';

import { ICurrencyQuote } from 'app/shared/currencyQuote';


@Component({
  selector: 'currencies',
  templateUrl: './currencies.component.html'
})

export class CurrenciesComponent extends BaseDataComponent implements OnInit {

  private isMarketOpen: Boolean = false;
  private quotes: ICurrencyQuote[];

  constructor(camBankService: CamBankService, router: Router) {
    super(camBankService, router);
  }


  ngOnInit() {
    this.isBusy = true;
    this.camBankService.isMarketOpen().then(isOpen => {
      this.isMarketOpen = isOpen;
    },
    reason => this.HandlerError(reason));

    this.camBankService.currenciesQuote().then(quotes => {
      this.quotes = quotes;
      this.isBusy = false;
    },
    reason => {
      this.HandlerError(reason);
      this.isBusy = false;
    });
  }

}
