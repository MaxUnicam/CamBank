import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { IContact } from 'app/shared/models/contact';
import { CamBankService } from 'app/services/iCamBankService';

import { BaseDataComponent } from 'app/base-data.component';


@Component({
  selector: 'contacts-list',
  templateUrl: './contacts-list.component.html'
})

export class ContactsListComponent extends BaseDataComponent implements OnInit {

  contacts: IContact[];
  thereAreContacts = true;

  constructor(camBankService: CamBankService, router: Router) { 
    super(camBankService, router);
  }

  ngOnInit() {
    this.isBusy = true;
    this.camBankService.contacts().then(contacts => {
      this.isBusy = false;
      this.contacts = contacts;
      this.thereAreContacts = contacts.length > 0;
    },
    reason => {
      this.isBusy = false;
      this.thereAreContacts = false;
      this.HandlerError(reason)
    });
  }

}
