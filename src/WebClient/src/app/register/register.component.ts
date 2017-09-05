import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CamBankService } from 'app/services/iCamBankService';

import { IUser } from 'app/shared/models/user';

import { BaseDataComponent } from 'app/base-data.component';


@Component({
  selector: 'register',
  templateUrl: './register.component.html'
})

export class RegisterComponent extends BaseDataComponent {

  user: IUser;

  registeredMessage = 'Registrazione avvenuta correttamente. Effettua il login ed inizia ad usare i nostri servizi!';
  registered: boolean;

  constructor(camBankService: CamBankService, router: Router) {
    super(camBankService, router);
    this.user = { name: '', password: '', iban: '', email: '', isOperator: false, registrationDate: null };
  }

  register() {
    this.camBankService.register(this.user.email, this.user.password, this.user.name).then(
      user => {
        this.registered = true;
      },
      reason => this.HandlerError(reason)
    );
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

}
