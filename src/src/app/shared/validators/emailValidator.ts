import { Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS } from '@angular/forms';


@Directive({
  selector: '[validateEmail][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useValue: validateEmail, multi: true }
  ]
})

export class EmailValidatorDirective {}

function validateEmail(c: FormControl) {
  let email = c.value;
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email)){
    return null;
  } else {
    return { valid: false, errorMessage: 'Hai inserito lettere o simboli non corretti.' };
  }
}
