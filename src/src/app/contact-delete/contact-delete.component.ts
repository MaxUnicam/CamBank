import { Component } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { IContact } from 'app/shared/models/contact';
import { CamBankService } from 'app/services/iCamBankService';

import { BaseLocationDataComponent } from 'app/base-location-data.component';


@Component({
  selector: 'contact-delete',
  templateUrl: './contact-delete.component.html'
})

export class ContactDeleteComponent extends BaseLocationDataComponent {

  contact: IContact;

  constructor(
    private cambankService: CamBankService,
    private route: ActivatedRoute,
    router: Router, location: Location
  ) { 
    super(cambankService, location, router);
  }

  ngOnInit() {
    const iban = this.route.snapshot.params['id'];
    if (!iban) {
      return;
    }

    this.isBusy = true;
    this.cambankService.contact(iban).then(contact => {
      this.contact = contact;
      this.isBusy = false;
    },
    reason => {
      this.HandlerError(reason);
      this.isBusy = false;
    });
  }

  delete() {
    if (this.contact == null) {
      return;
    }

    this.cambankService.deleteContact(this.contact.iban).then(contact => {
      this.router.navigateByUrl('/contacts');
    },
    reason => this.HandlerError(reason));
  }

}
