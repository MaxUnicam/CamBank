import { Component } from '@angular/core';

import { CamBankService } from 'app/services/iCamBankService';

import { Location } from '@angular/common';


@Component({
  selector: 'basedata'
})

export class BaseDataComponent {

  constructor(protected camBankService: CamBankService) { }

  protected HandlerError(error) {

    switch (error.status) {
      case 401:
        const body = JSON.parse(error._body);
        if (body.message.toLowerCase() === 'no token') {
          console.log('non hai inviato il token sulla richiesta');
        } else if (body.message.toLowerCase() === 'invalid token') {
          console.log('hai inviato un token invalido o scaduto');
        }
        break;
      case 404:
        console.log('not found');
        break;
    }
    console.log(error);
  }

}
