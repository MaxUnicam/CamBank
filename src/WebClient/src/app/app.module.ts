import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TransactionsListComponent } from './transactions-list/transactions.component';
import { TransactionDetailComponent } from './transaction-detail/transaction.component';
import { TransactionsPageComponent } from './transactions-page/transactions-page.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { NavigationMenuComponent } from './navigation-menu/menu.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { HomeComponent } from './home/home.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { ProvaComponent } from './prova/prova.component';

import { TransactionCausePipe } from './shared/pipes/transactionCause.pipe';
import { DecimalAmountPipe } from './shared/pipes/decimalAmount.pipe';

import { CamBankService } from 'app/services/iCamBankService';
import { CamBankServiceApi } from 'app/services/camBankService.api';

// TODO: aggiungere grafici riepilogativi della situazione im banca (ng2-charts)

const appRoutes: Routes = [
  { path: 'test', component: ProvaComponent }, // Da togliere, solo per lo sviluppo
  { path: 'home', component: HomeComponent },
  { path: 'transactions', component: TransactionsPageComponent },
  { path: 'transactions/add', component: AddTransactionComponent },
  { path: 'transactions/:id', component: TransactionDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'unauthorized', component: UnauthorizedComponent},
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TransactionsListComponent,
    SpinnerComponent,
    TransactionDetailComponent,
    TransactionsPageComponent,
    NavigationMenuComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    HomeComponent,
    AddTransactionComponent,
    ProvaComponent,

    TransactionCausePipe,
    DecimalAmountPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    )
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
