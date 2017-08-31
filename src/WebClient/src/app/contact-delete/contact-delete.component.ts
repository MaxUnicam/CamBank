import { Component } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { IContact } from 'app/shared/models/contact';
import { CamBankService } from 'app/services/iCamBankService';


@Component({
  selector: 'contact-delete',
  templateUrl: './contact-delete.component.html'
})

export class ContactDeleteComponent {

  contact: IContact;

  constructor(
    private cambankService: CamBankService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

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

  delete() {
    if (this.contact == null) {
      return;
    }

    this.cambankService.deleteContact(this.contact.iban).then(contact => {
      this.router.navigateByUrl('/contacts');
    },
    reason => {
      console.log(reason);
    });
  }

  goBack() {
    this.location.back();
  }

}
