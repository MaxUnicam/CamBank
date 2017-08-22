import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SpinnerComponent } from './spinner/spinner.component';

import { CamBankService } from 'app/services/iCamBankService';
import { CamBankServiceApi } from 'app/services/camBankService.api';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    { provide: CamBankService, useClass: CamBankServiceApi }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
