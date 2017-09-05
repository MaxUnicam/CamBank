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


  constructor(camBankService: CamBankService, router: Router) { 
    super(camBankService, router);
  }

  ngOnInit() {
    this.camBankService.contacts().then(contacts => {
      this.contacts = contacts;
    },
    reason => this.HandlerError(reason));
  }

}
