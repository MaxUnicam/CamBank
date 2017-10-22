import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CamBankService } from 'app/services/iCamBankService';
import { BaseDataComponent } from '../base-data.component';

import { IUser } from '../shared/models/user';


@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html'
})

export class EditProfileComponent extends BaseDataComponent implements OnInit {

    user: IUser;
    updateResult: string;
    isError: boolean;

    constructor(camBankService: CamBankService, router: Router) {
        super(camBankService, router);
        this.user = { iban: null, email: null, name: null, isOperator: false, password: null, registrationDate: null };
    }

    ngOnInit() {
        this.isBusy = true;
        this.camBankService.userProfile().then(user => {;
            this.user = user;
            this.isBusy = false;
          },
          reason => {
              this.HandlerError(reason);
              this.isBusy = false;
          }
        );
    }

    update() {
        this.camBankService.editProfile(this.user.name).then(
            result => this.onUpdated(result),
            reason => this.onError(reason)
        );
    }

    onUpdated(result) {
        this.updateResult = 'Username aggiornato correttamente';
        this.isError = false;
    }

    onError(reason) {
        this.isError = true;
        if (reason.status === 409) {
            this.updateResult = 'Questo username è già stato usato';
        } else {
            this.HandlerError(reason);
        }
    }

    onUsernameEdited(event) {
        this.updateResult = null;
        this.isError = false;
    }
}