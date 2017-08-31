import { Component } from '@angular/core';

import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { IContact } from 'app/shared/models/contact';
import { CamBankService } from 'app/services/iCamBankService';


@Component({
  selector: 'contact-add',
  templateUrl: './contact-add.component.html'
})

export class ContactAddComponent {

  contact: IContact;

  constructor(
    private cambankService: CamBankService,
    private router: Router,
    private location: Location
  ) {
    this.contact = { iban: null, ownerIban: null, name: null }; 
  }

  goBack() {
    this.location.back();
  }

  create() {
    this.cambankService.addContact(this.contact).then(contact => {
      this.router.navigateByUrl('/contacts');
    },
    reason => {
      console.log(reason);
    });
  }

}
