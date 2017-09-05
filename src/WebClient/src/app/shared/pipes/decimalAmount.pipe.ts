import { Pipe, PipeTransform } from '@angular/core';

import { IBankTransaction } from 'app/shared/models/bankTransaction';

import { AuthService } from 'app/services/iAuthService';


@Pipe({name: 'decimalAmount'})
export class DecimalAmountPipe implements PipeTransform {

  constructor(private authService: AuthService) { }

  transform(value: IBankTransaction): string {
    const currentIban = this.authService.currentUserIban();
    let formattedAmount = (value.emitterIban === currentIban) ? '-' : '+';
    formattedAmount += ' ' + value.amount['$numberDecimal'] + ' €';
    return formattedAmount;
  }

}
