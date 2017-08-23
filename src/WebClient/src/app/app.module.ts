import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TransactionsListComponent } from './transactions-list/transactions.component';
import { SpinnerComponent } from './spinner/spinner.component';

import { TransactionCausePipe } from './shared/pipes/transactionCause.pipe';
import { DecimalAmountPipe } from './shared/pipes/decimalAmount.pipe';

import { CamBankService } from 'app/services/iCamBankService';
import { CamBankServiceApi } from 'app/services/camBankService.api';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TransactionsListComponent,
    SpinnerComponent,

    TransactionCausePipe,
    DecimalAmountPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  exports: [
    TransactionCausePipe,
    DecimalAmountPipe
  ],
  providers: [
    { provide: CamBankService, useClass: CamBankServiceApi }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
