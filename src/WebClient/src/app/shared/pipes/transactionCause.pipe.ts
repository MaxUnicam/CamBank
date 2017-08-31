import { Pipe, PipeTransform } from '@angular/core';

import { IBankTransaction } from 'app/shared/models/bankTransaction';


@Pipe({name: 'transactionCause'})
export class TransactionCausePipe implements PipeTransform {

  transform(value: IBankTransaction, currentIban:string): string {
    if (!value || !value.emitterIban || !currentIban) {
      return '';
    }

    if (currentIban !== value.receiverIban && currentIban !== value.emitterIban) {
      return '';
    }

    let userCause = '';
    if (value.receiverIban === currentIban) {
      userCause += value.emitterIban + ' ha ';
      if (value.cause.toLowerCase() === 'bonifico') {
        userCause += 'effettuato un bonifico verso il tuo conto corrente';
      } else if (value.cause.toLowerCase() === 'mav') {
        userCause += 'pagato un mav';
      } else if (value.cause.toLowerCase() === 'ricarica telefonica') {
        userCause += 'effettuato una ricarica telefonica al numero ' + value.phoneNumber;
      }
    } else {
      if (value.cause.toLowerCase() === 'bonifico') {
        userCause += 'Hai effettuato un bonifico verso ' + value.receiverIban;
      } else if (value.cause.toLowerCase() === 'mav') {
        userCause += 'Hai pagato un mav';
      } else if (value.cause.toLowerCase() === 'ricarica telefonica') {
        userCause += 'Hai effettuato una ricarica telefonica al numero ' + value.phoneNumber;
      }
    }

    return userCause;
  }

}
