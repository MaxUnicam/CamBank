import { Component, OnInit } from '@angular/core';

import { CamBankService } from 'app/services/iCamBankService';

import { IContact } from './shared/models/contact';
import { IBankTransaction } from './shared/models/bankTransaction';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'app works!';
  contacts: IContact[];
  transactions: IBankTransaction[];

  constructor(private cambankService: CamBankService) { }

  ngOnInit() {

    // const contact = { iban: 'iban12', name: 'Privalia' };
    // this.cambankService.updateContact('iban12', contact).then(response => {
    //   console.log('Aggiornato');
    // },
    // reason => {
    //   console.log(reason);
    // });

    // const contact = { iban: 'iban23', name: 'Privalia' };
    // this.cambankService.addContact(contact).then(response => {
    //   console.log('Aggiunto');
    // },
    // reason => {
    //   console.log('Errore');
    // });

    // this.cambankService.deleteContact('iban23').then(response => {
    //   console.log('Eliminato');
    // },
    // reason => {
    //   console.log(reason);
    // });

    this.cambankService.contacts().then(contacts => {
      this.contacts = contacts;
    },
    reason => {
      console.log(reason);
    });

    this.cambankService.transactions().then(transactions => {
      this.transactions = transactions;
    },
    reason => {
      console.log(reason);
    });

    // this.cambankService.transaction('5989dd83a0624d0a34ed2117').then(transaction => {
    //   this.detailCause = transaction.cause;
    //   this.detailIban1 = transaction.emitterIban;
    //   this.detailIban2 = transaction.receiverIban;
    // },
    // reason => {
    //   console.log(reason);
    // });
  }

}
