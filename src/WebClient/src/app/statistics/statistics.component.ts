import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { CamBankService } from 'app/services/iCamBankService';
import { AuthService } from 'app/services/iAuthService';

import { BaseDataComponent } from '../base-data.component';

import * as Decimal from 'decimal.js/decimal.js';


@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html',
  providers: [DatePipe]
})

export class StatisticsComponent extends BaseDataComponent implements OnInit {
  public thereAreData: boolean;
  public lineChartType = 'line';

  public pieChartLabels: string[] = ['Ricariche telefoniche', 'Pagamenti mav', 'Bonifici'];
  public pieChartData: number[];
  public pieChartType = 'pie';

  public saldit: string[] = [];
  public saldi: number[] = [];

  public balance = new Decimal(0);

  constructor(
    camBankService: CamBankService,
    router: Router,
    private authService: AuthService,
    private datePipe: DatePipe) {
      super(camBankService, router);
    }


  ngOnInit() {
    this.camBankService.outgoings().then(outgoings => {
      this.pieChartData = [ outgoings.charge.$numberDecimal, outgoings.mav.$numberDecimal, outgoings.transaction.$numberDecimal ];
    },
    reason => this.HandlerError(reason));

    this.camBankService.transactions().then(transactions => {
      this.thereAreData = transactions.length > 0;

      const userIban = this.authService.currentUserIban();

      transactions.forEach(transaction => {
        this.saldit.push(transaction.cause + ' ' + this.datePipe.transform(transaction.date, 'dd MM yyyy, HH:mm'));

        const value = (transaction.amount === null) ? new Decimal('0') : new Decimal(transaction.amount.$numberDecimal);
        let amount = new Decimal(value);
        if (transaction.emitterIban === userIban) {
          amount = amount.negated();
        }
        this.balance = this.balance.plus(amount);

        this.saldi.push(this.balance.toNumber());
      });
    },
    reason => this.HandlerError(reason));
  }


  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
