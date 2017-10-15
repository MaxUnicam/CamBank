import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { CamBankService } from 'app/services/iCamBankService';

import { BaseDataComponent } from './base-data.component';


@Component({
  selector: 'basedata'
})

export class BaseLocationDataComponent extends BaseDataComponent {

  constructor(protected camBankService: CamBankService, private location: Location, router: Router) {
    super(camBankService, router);
  }

  protected goBack() {
    this.location.back();
  }

}
