import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { IContact } from 'app/shared/models/contact';
import { CamBankService } from 'app/services/iCamBankService';


@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html'
})

export class ContactEditComponent implements OnInit {

  contact: IContact;

  constructor(
    private cambankService: CamBankService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { 
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
    reason => {
      console.log(reason);
    });
  }

  goBack() {
    this.location.back();
  }

  update() {
    const iban = this.route.snapshot.params['id'];
    this.cambankService.updateContact(iban, this.contact).then(contact => {
      this.router.navigateByUrl('/contacts');
    },
    reason => {
      console.log(reason);
    });
  }

}
