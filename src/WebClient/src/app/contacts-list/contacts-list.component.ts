import { Component, OnInit } from '@angular/core';

import { IContact } from 'app/shared/models/contact';
import { CamBankService } from 'app/services/iCamBankService';


@Component({
  selector: 'contacts-list',
  templateUrl: './contacts-list.component.html'
})

export class ContactsListComponent implements OnInit {

  contacts: IContact[];


  constructor(private camBankService: CamBankService) { }

  ngOnInit() {
    this.camBankService.contacts().then(contacts => {
      this.contacts = contacts;
      // console.log(contacts);
    },
    reason => {
      console.log(reason);
    });
  }

}
