import { Component } from '@angular/core';

import { CamBankService } from 'app/services/iCamBankService';

import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'basedata'
})

export class BaseDataComponent {

  constructor(protected camBankService: CamBankService, protected router: Router) { }

  protected HandlerError(error) {
    console.log(error);
    switch (error.status) {
      case 401:
        this.router.navigateByUrl('unauthorized');
        break;
      case 404:
        this.router.navigateByUrl('notfound');
        break;
    }
  }

}
