import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';

import { IContact } from 'app/shared/models/contact';
import { CamBankService } from 'app/services/iCamBankService';

import { BaseDataComponent } from 'app/base-data.component';


@Component({
  selector: 'choose-contact',
  templateUrl: './choose-contact.component.html',
  styleUrls: ['./choose-contact.component.css']
})

export class ChooseContactComponent extends BaseDataComponent implements OnInit {

  contacts: IContact[];

  @Output()
  contactSelected = new EventEmitter<IContact>();


  constructor(camBankService: CamBankService, router: Router) { 
    super(camBankService, router);
  }

  ngOnInit() {
    this.camBankService.contacts().then(contacts => {
      this.contacts = contacts;
    },
    reason => this.HandlerError(reason));
  }

  OnItemClick(item) {
    this.contactSelected.emit(item);
  }

}
