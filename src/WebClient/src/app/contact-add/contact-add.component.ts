import { Component } from '@angular/core';

import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { IContact } from 'app/shared/models/contact';
import { CamBankService } from 'app/services/iCamBankService';

import { BaseLocationDataComponent } from 'app/base-location-data.component';


@Component({
  selector: 'contact-add',
  templateUrl: './contact-add.component.html'
})

export class ContactAddComponent extends BaseLocationDataComponent {

  contact: IContact;

  constructor(cambankService: CamBankService, router: Router, location: Location) {
    super(cambankService, location, router);
    this.contact = { iban: null, ownerIban: null, name: null }; 
  }

  create() {
    this.camBankService.addContact(this.contact).then(contact => {
      this.router.navigateByUrl('/contacts');
    },
    reason => this.HandlerError);
  }

}
