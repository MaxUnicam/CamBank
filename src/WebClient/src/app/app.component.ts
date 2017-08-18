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

    // this.cambankService.contacts().then(contacts => {
    //   this.contacts = contacts;
    // },
    // reason => {
    //   console.log(reason);
    // });

    // this.cambankService.authorize().then(response => {
    //   if (!response.success) {
    //     return;
    //   }
    //   this.token = response.token;
    //   localStorage.setItem('token', response.token);
    // });
  }

}
