import { Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS } from '@angular/forms';


@Directive({
  selector: '[validateAmount][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useValue: validateAmount, multi: true }
  ]
})

export class AmountValidatorDirective {}

function validateAmount(c: FormControl) {
  let amount = c.value;
  if (!amount) {
    return null;
  }

  amount = amount.replace('€', '');
  amount = amount.replace(' ', '');

  if (!isNaN(amount)) {
    return null;
  } else {
    return { valid: false, errorMessage: 'Hai inserito lettere o simboli non corretti.' };
  }
}
