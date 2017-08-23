import { Pipe, PipeTransform } from '@angular/core';

import { IBankTransaction } from 'app/shared/models/bankTransaction';


@Pipe({name: 'decimalAmount'})
export class DecimalAmountPipe implements PipeTransform {

  transform(value: IBankTransaction, currentIban:string): string {
    let formattedAmount = (value.emitterIban === currentIban) ? '-' : '+';
    formattedAmount += ' ' + value.amount['$numberDecimal'] + ' €';
    return formattedAmount;
  }

}
