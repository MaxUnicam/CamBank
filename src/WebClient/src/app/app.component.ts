import { Component, OnInit } from '@angular/core';

import { CamBankService } from 'app/services/iCamBankService';

import { IContact } from './shared/models/contact';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'app works!';
  token = '';
  contacts: IContact[];

  constructor(private cambankService: CamBankService) { }

  ngOnInit() {

    this.token = localStorage.getItem('token');

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

    // this.cambankService.authorize('max', 'pwd').then(response => {
    //   if (!response.success) {
    //     return;
    //   }
    //   this.token = response.token;
    //   localStorage.setItem('token', response.token);
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
  }

}
