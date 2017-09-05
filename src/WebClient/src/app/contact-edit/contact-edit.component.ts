import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { IContact } from 'app/shared/models/contact';
import { CamBankService } from 'app/services/iCamBankService';

import { BaseLocationDataComponent } from 'app/base-location-data.component';


@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html'
})

export class ContactEditComponent extends BaseLocationDataComponent implements OnInit {

  contact: IContact;

  constructor(
    private cambankService: CamBankService,
    private route: ActivatedRoute,
    router: Router, location: Location
  ) {
    super(cambankService, location, router);
    this.contact = { iban: null, ownerIban: null, name: null }; 
  }


  ngOnInit() {
    const iban = this.route.snapshot.params['id'];
    if (!iban) {
      return;
    }

    this.cambankService.contact(iban).then(contact => {
      this.contact = contact;
    },
    reason => this.HandlerError(reason));
  }

  update() {
    const iban = this.route.snapshot.params['id'];
    this.cambankService.updateContact(iban, this.contact).then(contact => {
      this.router.navigateByUrl('/contacts');
    },
    reason => this.HandlerError(reason));
  }

}
