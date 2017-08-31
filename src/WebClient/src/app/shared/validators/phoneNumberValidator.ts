import { Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[validatePhoneNumber][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useValue: validatePhoneNumber, multi: true }
  ]
})

export class PhoneNumberValidatorDirective {}

function validatePhoneNumber(c: FormControl) {
  const number = c.value;
  if (number == null || number.length != 10) {
    return { valid: false, errorMessage: 'I numer i sono composti da 10 valori, controlla meglio.' };
  }

  // Controllo sia composto solo da numeri
  if (/^\d+$/.test(number)){
    return null;
  } else {
    return { valid: false, errorMessage: 'Hai inserito lettere o simboli non corretti.' };
  }
}
