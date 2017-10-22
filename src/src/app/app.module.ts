import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { ChartsModule } from 'ng2-charts';

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
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactDeleteComponent } from './contact-delete/contact-delete.component';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { RegisterComponent } from './register/register.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { FooterComponent } from './footer/footer.component';
import { ChooseContactComponent } from './choose-contact/choose-contact.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

import { TransactionCausePipe } from './shared/pipes/transactionCause.pipe';
import { DecimalAmountPipe } from './shared/pipes/decimalAmount.pipe';
import { OpenedPipe } from './shared/pipes/opened.pipe';
import { CurrenciesPipe } from './shared/pipes/currencies.pipe';

import { PhoneNumberValidatorDirective } from './shared/validators/phoneNumberValidator';
import { AmountValidatorDirective } from './shared/validators/amountValidator';
import { EmailValidatorDirective } from './shared/validators/emailValidator';

import { CamBankService } from 'app/services/iCamBankService';
import { CamBankServiceApi } from 'app/services/camBankService.api';
import { AuthService } from 'app/services/iAuthService';
import { AuthServiceApi } from 'app/services/authenticationService';

import { LOCALE_ID } from '@angular/core';


// TODO: Paginare le liste e/o campi di ricerca
// TODO: Pagina di personalizzazione profilo (email nome utente e pwd)
// TODO: Registrazione controllare che nome utente e email non esistano

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'transactions', component: TransactionsPageComponent },
  { path: 'transactions/add', component: AddTransactionComponent },
  { path: 'transactions/:id', component: TransactionDetailComponent },
  { path: 'contacts', component: ContactsListComponent },
  { path: 'contacts/add', component: ContactAddComponent },
  { path: 'contacts/edit/:id', component: ContactEditComponent },
  { path: 'contacts/delete/:id', component: ContactDeleteComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'currencies', component: CurrenciesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/edit', component: EditProfileComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'notfound', component: NotFoundComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  declarations: [
    PhoneNumberValidatorDirective,
    AmountValidatorDirective,
    EmailValidatorDirective,

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
    ContactsListComponent,
    ContactEditComponent,
    ContactDeleteComponent,
    ContactAddComponent,
    RegisterComponent,
    StatisticsComponent,
    CurrenciesComponent,
    FooterComponent,
    ChooseContactComponent,
    EditProfileComponent,

    TransactionCausePipe,
    DecimalAmountPipe,
    OpenedPipe,
    CurrenciesPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ChartsModule
  ],
  exports: [
    TransactionCausePipe,
    DecimalAmountPipe,
    OpenedPipe,
    CurrenciesPipe
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'it-IT' },
    { provide: CamBankService, useClass: CamBankServiceApi },
    { provide: AuthService, useClass: AuthServiceApi }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
