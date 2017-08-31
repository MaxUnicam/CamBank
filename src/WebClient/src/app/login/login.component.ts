import { Component, OnInit } from '@angular/core';

import { CamBankService } from 'app/services/iCamBankService';

import { IUser } from 'app/shared/models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user: IUser;
  isAuthorizing: boolean;
  errorMessage: string;

  isAuthenticated: boolean;

  constructor(private camBankService: CamBankService) {
    this.user = { name: '', password: '', iban: '', email: '', isOperator: false, registrationDate: null };
  }

  ngOnInit() {
    this.isAuthenticated = localStorage.getItem('token') != null;
  }

  login() {
    this.isAuthorizing = true;
    this.camBankService.authorize(this.user.name, this.user.password).then(response => {
      this.isAuthorizing = false;
      if (!response.success) {
        this.errorMessage = 'Errore: il server ha riscontrato un problema, riprova il login.';
        return;
      }
      localStorage.setItem('token', response.token);
    },
    reason => {
      this.isAuthorizing = false;
      if (reason.status === 401) {
        this.errorMessage = 'Errore: credenziali non corrette';
      }
    });
  }

  logout() {
    localStorage.setItem('token', null);
    this.isAuthenticated = false;
  }

}
