webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/add-transaction/add-transaction.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".btn-back {\n  margin-bottom: 20px;\n  margin-left: 15px;\n}\n\n.contacts-icon {\n  height: 26px;\n  width: 28px;\n}\n\n.contacts-btn {\n  padding: 3px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/add-transaction/add-transaction.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <button (click)=\"goBack()\" class=\"btn btn-default btn-back\">Indietro</button>\n</div>\n\n<div class=\"container\">\n\n    <form class=\"detail-form col-md-6\" #transactionForm=\"ngForm\">\n        <div class=\"form-group\">\n          <label for=\"cause\">Causale</label>\n          <select class=\"form-control\" id=\"cause\" [(ngModel)]=\"transaction.cause\" name=\"cause\" required>\n            <option [value]=\"'bon'\">Bonifico</option>\n            <option [value]=\"'ric'\">Ricarica telefonica</option>\n            <option [value]=\"'mav'\">Pagamento mav</option>\n          </select>\n        </div>\n\n        <div *ngIf=\"transaction.cause == 'ric'\" class=\"form-group\">\n          <div class=\"form-group\">\n            <label for=\"ric_receiverIban\">Operatore</label>\n            <select class=\"form-control\" id=\"ric_receiverIban\" [(ngModel)]=\"transaction.receiverIban\" name=\"receiverIban\">\n              <option *ngFor=\"let op of operators\" [value]=\"op.iban\">{{op.name}}</option>\n            </select>\n          </div>\n          <div class=\"form-group\">\n            <label for=\"ric_amount\">Importo</label>\n            <select class=\"form-control\" id=\"ric_amount\" [(ngModel)]=\"transaction.amount\" name=\"amount\" required>\n              <option [value]=\"10\">10 €</option>\n              <option [value]=\"20\">20 €</option>\n              <option [value]=\"50\">50 €</option>\n            </select>\n          </div>\n          <div class=\"form-group\">\n            <label for=\"phoneNumber\">Numero</label>\n            <input class=\"form-control\" [(ngModel)]=\"transaction.phoneNumber\" name=\"phoneNumber\" id=\"phoneNumber\" required validatePhoneNumber>\n          </div>\n        </div>\n\n        <div *ngIf=\"transaction.cause == 'bon'\">\n          <div class=\"form-group\">\n            <label for=\"bon_receiver\" class=\"form-label\">Verso</label>\n            <div class=\"input-group\">\n                <input type=\"text\" class=\"form-control\" id=\"bon_receivr\" [(ngModel)]='transaction.receiverIban' name=\"receiverIban\">\n                <span class=\"input-group-btn\">\n                  <button class=\"btn btn-default contacts-btn\" type=\"button\" (click)=\"showContactsList()\">\n                    <img class=\"contacts-icon\" src=\"assets/icons/contacts.png\"/>\n                  </button>\n                </span>\n            </div>\n          </div>\n          <div class=\"form-group\">\n            <label for=\"bon_amount\" class=\"form-label\">Importo</label>\n            <input type=\"text\" class=\"form-control\" id=\"bon_amount\" [(ngModel)]=\"transaction.amount\" name=\"amount\"\n                validateAmount required>\n          </div>\n           <div class=\"form-group\">\n            <label for=\"bon_notes\" class=\"form-label\">Note</label>\n            <input type=\"text\" class=\"form-control\" id=\"bon_notes\" [(ngModel)]=\"transaction.notes\" name=\"notes\">\n          </div>\n        </div>\n\n\n        <div *ngIf=\"transaction.cause == 'mav'\">\n          <div class=\"form-group\">\n            <label for=\"mav_amount\">Importo</label>\n            <input type=\"text\" class=\"form-control\" id=\"mav_amount\" [(ngModel)]=\"transaction.amount\" name=\"amount\"\n              validateAmount required>\n          </div>\n          <div class=\"form-group\">\n            <label for=\"mav_id\">Codice identificativo</label>\n            <input type=\"text\" class=\"form-control\" id=\"mav_id\" [(ngModel)]=\"transaction.mavId\" name=\"mav_id\">\n          </div>\n          <div class=\"form-group\">\n            <label for=\"mav_notes\">Note</label>\n            <input type=\"text\" class=\"form-control\" id=\"mav_notes\" [(ngModel)]=\"transaction.notes\" name=\"mav_notes\">\n          </div>\n        </div>\n\n        <button type=\"submit\" class=\"btn btn-success\" (click)=\"create()\" [disabled]=\"!transactionForm.form.valid\">Salva</button>\n      </form>\n\n      <div *ngIf=\"chooseFromContacts\" class=\"col-md-6\">\n        <choose-contact (contactSelected)=\"OnSelectedContact($event)\"> </choose-contact>\n      </div>\n\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/add-transaction/add-transaction.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddTransactionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_iCamBankService__ = __webpack_require__("../../../../../src/app/services/iCamBankService.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_base_location_data_component__ = __webpack_require__("../../../../../src/app/base-location-data.component.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AddTransactionComponent = (function (_super) {
    __extends(AddTransactionComponent, _super);
    function AddTransactionComponent(location, cambankService, router) {
        var _this = _super.call(this, cambankService, location, router) || this;
        _this.chooseFromContacts = false;
        _this.transaction = {
            _id: '',
            cause: '',
            emitterIban: '',
            receiverIban: '',
            amount: null,
            date: null,
            phoneNumber: null,
            mavId: null,
            notes: ''
        };
        return _this;
    }
    AddTransactionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.camBankService.operators().then(function (operators) {
            _this.operators = operators;
        }, function (reason) { return _this.HandlerError(reason); });
    };
    AddTransactionComponent.prototype.create = function () {
        var _this = this;
        this.transaction.date = new Date();
        if (this.transaction.cause === 'bon') {
            this.camBankService.addTransfer(this.transaction).then(function (trans) { return _this.transactionAdded(trans); }, function (reason) { return _this.HandlerError(reason); });
        }
        else if (this.transaction.cause === 'ric') {
            this.camBankService.addPhoneCharging(this.transaction).then(function (trans) { return _this.transactionAdded(trans); }, function (reason) { return _this.HandlerError(reason); });
        }
        else if (this.transaction.cause === 'mav') {
            this.camBankService.addMav(this.transaction).then(function (trans) { return _this.transactionAdded(trans); }, function (reason) { return _this.HandlerError(reason); });
        }
    };
    AddTransactionComponent.prototype.transactionAdded = function (trans) {
        this.goBack();
    };
    AddTransactionComponent.prototype.showContactsList = function () {
        this.chooseFromContacts = true;
    };
    AddTransactionComponent.prototype.OnSelectedContact = function (contact) {
        this.transaction.receiverIban = contact.iban;
        this.chooseFromContacts = false;
    };
    return AddTransactionComponent;
}(__WEBPACK_IMPORTED_MODULE_4_app_base_location_data_component__["a" /* BaseLocationDataComponent */]));
AddTransactionComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'add-transaction',
        template: __webpack_require__("../../../../../src/app/add-transaction/add-transaction.component.html"),
        styles: [__webpack_require__("../../../../../src/app/add-transaction/add-transaction.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["g" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common__["g" /* Location */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_app_services_iCamBankService__["a" /* CamBankService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_app_services_iCamBankService__["a" /* CamBankService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _c || Object])
], AddTransactionComponent);

var _a, _b, _c;
//# sourceMappingURL=add-transaction.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n\n    <navigation-menu></navigation-menu>\n\n    <router-outlet></router-outlet>\n\n    <footer></footer>\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_charts__ = __webpack_require__("../../../../ng2-charts/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__login_login_component__ = __webpack_require__("../../../../../src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__transactions_list_transactions_component__ = __webpack_require__("../../../../../src/app/transactions-list/transactions.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__transaction_detail_transaction_component__ = __webpack_require__("../../../../../src/app/transaction-detail/transaction.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__transactions_page_transactions_page_component__ = __webpack_require__("../../../../../src/app/transactions-page/transactions-page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__spinner_spinner_component__ = __webpack_require__("../../../../../src/app/spinner/spinner.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__navigation_menu_menu_component__ = __webpack_require__("../../../../../src/app/navigation-menu/menu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__not_found_not_found_component__ = __webpack_require__("../../../../../src/app/not-found/not-found.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__unauthorized_unauthorized_component__ = __webpack_require__("../../../../../src/app/unauthorized/unauthorized.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__home_home_component__ = __webpack_require__("../../../../../src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__add_transaction_add_transaction_component__ = __webpack_require__("../../../../../src/app/add-transaction/add-transaction.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__contacts_list_contacts_list_component__ = __webpack_require__("../../../../../src/app/contacts-list/contacts-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__contact_edit_contact_edit_component__ = __webpack_require__("../../../../../src/app/contact-edit/contact-edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__contact_delete_contact_delete_component__ = __webpack_require__("../../../../../src/app/contact-delete/contact-delete.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__contact_add_contact_add_component__ = __webpack_require__("../../../../../src/app/contact-add/contact-add.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__register_register_component__ = __webpack_require__("../../../../../src/app/register/register.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__statistics_statistics_component__ = __webpack_require__("../../../../../src/app/statistics/statistics.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__currencies_currencies_component__ = __webpack_require__("../../../../../src/app/currencies/currencies.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__footer_footer_component__ = __webpack_require__("../../../../../src/app/footer/footer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__choose_contact_choose_contact_component__ = __webpack_require__("../../../../../src/app/choose-contact/choose-contact.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__edit_profile_edit_profile_component__ = __webpack_require__("../../../../../src/app/edit-profile/edit-profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__shared_pipes_transactionCause_pipe__ = __webpack_require__("../../../../../src/app/shared/pipes/transactionCause.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__shared_pipes_decimalAmount_pipe__ = __webpack_require__("../../../../../src/app/shared/pipes/decimalAmount.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__shared_pipes_opened_pipe__ = __webpack_require__("../../../../../src/app/shared/pipes/opened.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__shared_pipes_currencies_pipe__ = __webpack_require__("../../../../../src/app/shared/pipes/currencies.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__shared_validators_phoneNumberValidator__ = __webpack_require__("../../../../../src/app/shared/validators/phoneNumberValidator.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__shared_validators_amountValidator__ = __webpack_require__("../../../../../src/app/shared/validators/amountValidator.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__shared_validators_emailValidator__ = __webpack_require__("../../../../../src/app/shared/validators/emailValidator.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34_app_services_iCamBankService__ = __webpack_require__("../../../../../src/app/services/iCamBankService.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35_app_services_camBankService_api__ = __webpack_require__("../../../../../src/app/services/camBankService.api.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36_app_services_iAuthService__ = __webpack_require__("../../../../../src/app/services/iAuthService.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37_app_services_authenticationService__ = __webpack_require__("../../../../../src/app/services/authenticationService.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







































// TODO: Paginare le liste e/o campi di ricerca
// TODO: Pagina di personalizzazione profilo (email nome utente e pwd)
// TODO: Registrazione controllare che nome utente e email non esistano
var appRoutes = [
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_15__home_home_component__["a" /* HomeComponent */] },
    { path: 'transactions', component: __WEBPACK_IMPORTED_MODULE_10__transactions_page_transactions_page_component__["a" /* TransactionsPageComponent */] },
    { path: 'transactions/add', component: __WEBPACK_IMPORTED_MODULE_16__add_transaction_add_transaction_component__["a" /* AddTransactionComponent */] },
    { path: 'transactions/:id', component: __WEBPACK_IMPORTED_MODULE_9__transaction_detail_transaction_component__["a" /* TransactionDetailComponent */] },
    { path: 'contacts', component: __WEBPACK_IMPORTED_MODULE_17__contacts_list_contacts_list_component__["a" /* ContactsListComponent */] },
    { path: 'contacts/add', component: __WEBPACK_IMPORTED_MODULE_20__contact_add_contact_add_component__["a" /* ContactAddComponent */] },
    { path: 'contacts/edit/:id', component: __WEBPACK_IMPORTED_MODULE_18__contact_edit_contact_edit_component__["a" /* ContactEditComponent */] },
    { path: 'contacts/delete/:id', component: __WEBPACK_IMPORTED_MODULE_19__contact_delete_contact_delete_component__["a" /* ContactDeleteComponent */] },
    { path: 'statistics', component: __WEBPACK_IMPORTED_MODULE_22__statistics_statistics_component__["a" /* StatisticsComponent */] },
    { path: 'currencies', component: __WEBPACK_IMPORTED_MODULE_23__currencies_currencies_component__["a" /* CurrenciesComponent */] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_7__login_login_component__["a" /* LoginComponent */] },
    { path: 'register', component: __WEBPACK_IMPORTED_MODULE_21__register_register_component__["a" /* RegisterComponent */] },
    { path: 'profile/edit', component: __WEBPACK_IMPORTED_MODULE_26__edit_profile_edit_profile_component__["a" /* EditProfileComponent */] },
    { path: 'unauthorized', component: __WEBPACK_IMPORTED_MODULE_14__unauthorized_unauthorized_component__["a" /* UnauthorizedComponent */] },
    { path: 'notfound', component: __WEBPACK_IMPORTED_MODULE_13__not_found_not_found_component__["a" /* NotFoundComponent */] },
    { path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_13__not_found_not_found_component__["a" /* NotFoundComponent */] }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_31__shared_validators_phoneNumberValidator__["a" /* PhoneNumberValidatorDirective */],
            __WEBPACK_IMPORTED_MODULE_32__shared_validators_amountValidator__["a" /* AmountValidatorDirective */],
            __WEBPACK_IMPORTED_MODULE_33__shared_validators_emailValidator__["a" /* EmailValidatorDirective */],
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_7__login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_8__transactions_list_transactions_component__["a" /* TransactionsListComponent */],
            __WEBPACK_IMPORTED_MODULE_11__spinner_spinner_component__["a" /* SpinnerComponent */],
            __WEBPACK_IMPORTED_MODULE_9__transaction_detail_transaction_component__["a" /* TransactionDetailComponent */],
            __WEBPACK_IMPORTED_MODULE_10__transactions_page_transactions_page_component__["a" /* TransactionsPageComponent */],
            __WEBPACK_IMPORTED_MODULE_12__navigation_menu_menu_component__["a" /* NavigationMenuComponent */],
            __WEBPACK_IMPORTED_MODULE_13__not_found_not_found_component__["a" /* NotFoundComponent */],
            __WEBPACK_IMPORTED_MODULE_14__unauthorized_unauthorized_component__["a" /* UnauthorizedComponent */],
            __WEBPACK_IMPORTED_MODULE_15__home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_16__add_transaction_add_transaction_component__["a" /* AddTransactionComponent */],
            __WEBPACK_IMPORTED_MODULE_17__contacts_list_contacts_list_component__["a" /* ContactsListComponent */],
            __WEBPACK_IMPORTED_MODULE_18__contact_edit_contact_edit_component__["a" /* ContactEditComponent */],
            __WEBPACK_IMPORTED_MODULE_19__contact_delete_contact_delete_component__["a" /* ContactDeleteComponent */],
            __WEBPACK_IMPORTED_MODULE_20__contact_add_contact_add_component__["a" /* ContactAddComponent */],
            __WEBPACK_IMPORTED_MODULE_21__register_register_component__["a" /* RegisterComponent */],
            __WEBPACK_IMPORTED_MODULE_22__statistics_statistics_component__["a" /* StatisticsComponent */],
            __WEBPACK_IMPORTED_MODULE_23__currencies_currencies_component__["a" /* CurrenciesComponent */],
            __WEBPACK_IMPORTED_MODULE_24__footer_footer_component__["a" /* FooterComponent */],
            __WEBPACK_IMPORTED_MODULE_25__choose_contact_choose_contact_component__["a" /* ChooseContactComponent */],
            __WEBPACK_IMPORTED_MODULE_26__edit_profile_edit_profile_component__["a" /* EditProfileComponent */],
            __WEBPACK_IMPORTED_MODULE_27__shared_pipes_transactionCause_pipe__["a" /* TransactionCausePipe */],
            __WEBPACK_IMPORTED_MODULE_28__shared_pipes_decimalAmount_pipe__["a" /* DecimalAmountPipe */],
            __WEBPACK_IMPORTED_MODULE_29__shared_pipes_opened_pipe__["a" /* OpenedPipe */],
            __WEBPACK_IMPORTED_MODULE_30__shared_pipes_currencies_pipe__["a" /* CurrenciesPipe */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["c" /* RouterModule */].forRoot(appRoutes),
            __WEBPACK_IMPORTED_MODULE_5_ng2_charts__["ChartsModule"]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_27__shared_pipes_transactionCause_pipe__["a" /* TransactionCausePipe */],
            __WEBPACK_IMPORTED_MODULE_28__shared_pipes_decimalAmount_pipe__["a" /* DecimalAmountPipe */],
            __WEBPACK_IMPORTED_MODULE_29__shared_pipes_opened_pipe__["a" /* OpenedPipe */],
            __WEBPACK_IMPORTED_MODULE_30__shared_pipes_currencies_pipe__["a" /* CurrenciesPipe */]
        ],
        providers: [
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["LOCALE_ID"], useValue: 'it-IT' },
            { provide: __WEBPACK_IMPORTED_MODULE_34_app_services_iCamBankService__["a" /* CamBankService */], useClass: __WEBPACK_IMPORTED_MODULE_35_app_services_camBankService_api__["a" /* CamBankServiceApi */] },
            { provide: __WEBPACK_IMPORTED_MODULE_36_app_services_iAuthService__["a" /* AuthService */], useClass: __WEBPACK_IMPORTED_MODULE_37_app_services_authenticationService__["a" /* AuthServiceApi */] }
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/base-data.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseDataComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_services_iCamBankService__ = __webpack_require__("../../../../../src/app/services/iCamBankService.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BaseDataComponent = (function () {
    function BaseDataComponent(camBankService, router) {
        this.camBankService = camBankService;
        this.router = router;
        this.isBusy = false;
    }
    BaseDataComponent.prototype.HandlerError = function (error) {
        console.log(error);
        switch (error.status) {
            case 401:
                this.router.navigateByUrl('unauthorized');
                break;
            case 404:
                this.router.navigateByUrl('notfound');
                break;
        }
    };
    return BaseDataComponent;
}());
BaseDataComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'basedata'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_app_services_iCamBankService__["a" /* CamBankService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_services_iCamBankService__["a" /* CamBankService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object])
], BaseDataComponent);

var _a, _b;
//# sourceMappingURL=base-data.component.js.map

/***/ }),

/***/ "../../../../../src/app/base-location-data.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseLocationDataComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_iCamBankService__ = __webpack_require__("../../../../../src/app/services/iCamBankService.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__base_data_component__ = __webpack_require__("../../../../../src/app/base-data.component.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BaseLocationDataComponent = (function (_super) {
    __extends(BaseLocationDataComponent, _super);
    function BaseLocationDataComponent(camBankService, location, router) {
        var _this = _super.call(this, camBankService, router) || this;
        _this.camBankService = camBankService;
        _this.location = location;
        return _this;
    }
    BaseLocationDataComponent.prototype.goBack = function () {
        this.location.back();
    };
    return BaseLocationDataComponent;
}(__WEBPACK_IMPORTED_MODULE_4__base_data_component__["a" /* BaseDataComponent */]));
BaseLocationDataComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'basedata'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_app_services_iCamBankService__["a" /* CamBankService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_app_services_iCamBankService__["a" /* CamBankService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["g" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common__["g" /* Location */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _c || Object])
], BaseLocationDataComponent);

var _a, _b, _c;
//# sourceMappingURL=base-location-data.component.js.map

/***/ }),

/***/ "../../../../../src/app/choose-contact/choose-contact.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "td:hover {\n  cursor: pointer;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/choose-contact/choose-contact.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"table-responsive\">\n  <h4>I tuoi contatti</h4>\n  <table class=\"table table-hover\">\n    <tbody>\n      <tr *ngFor=\"let contact of contacts\">\n        <td (click)=\"OnItemClick(contact)\">{{contact.name}}</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/choose-contact/choose-contact.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChooseContactComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_services_iCamBankService__ = __webpack_require__("../../../../../src/app/services/iCamBankService.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_base_data_component__ = __webpack_require__("../../../../../src/app/base-data.component.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ChooseContactComponent = (function (_super) {
    __extends(ChooseContactComponent, _super);
    function ChooseContactComponent(camBankService, router) {
        var _this = _super.call(this, camBankService, router) || this;
        _this.contactSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        return _this;
    }
    ChooseContactComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.camBankService.contacts().then(function (contacts) {
            _this.contacts = contacts;
        }, function (reason) { return _this.HandlerError(reason); });
    };
    ChooseContactComponent.prototype.OnItemClick = function (item) {
        this.contactSelected.emit(item);
    };
    return ChooseContactComponent;
}(__WEBPACK_IMPORTED_MODULE_3_app_base_data_component__["a" /* BaseDataComponent */]));
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], ChooseContactComponent.prototype, "contactSelected", void 0);
ChooseContactComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'choose-contact',
        template: __webpack_require__("../../../../../src/app/choose-contact/choose-contact.component.html"),
        styles: [__webpack_require__("../../../../../src/app/choose-contact/choose-contact.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_app_services_iCamBankService__["a" /* CamBankService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_app_services_iCamBankService__["a" /* CamBankService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], ChooseContactComponent);

var _a, _b;
//# sourceMappingURL=choose-contact.component.js.map

/***/ }),

/***/ "../../../../../src/app/contact-add/contact-add.component.html":
/***/ (function(module, exports) {

module.exports = "<button class=\"btn btn-default btn-back\" (click)=\"goBack()\">Indietro</button>\n\n<form class=\"detail-form\" #transactionForm=\"ngForm\">\n  <div class=\"form-group\">\n    <label for=\"cause\">Iban</label>\n    <input type=\"text\" name=\"iban\" id=\"iban\" [(ngModel)]=\"contact.iban\" class=\"form-control\" required>\n  </div>\n  <div class=\"form-group\">\n    <label for=\"name\">Nome</label>\n    <input type=\"text\" name=\"name\" id=\"name\" [(ngModel)]=\"contact.name\" class=\"form-control\" required>\n  </div>\n  <p class=\"test-advise-message\">* Tutti i campi di questo form sono obbligatori</p>\n  <button type=\"submit\" class=\"btn btn-success\" (click)=\"create()\" [disabled]=\"!transactionForm.valid\">Salva</button>\n</form>\n"

/***/ }),

/***/ "../../../../../src/app/contact-add/contact-add.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactAddComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_iCamBankService__ = __webpack_require__("../../../../../src/app/services/iCamBankService.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_base_location_data_component__ = __webpack_require__("../../../../../src/app/base-location-data.component.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ContactAddComponent = (function (_super) {
    __extends(ContactAddComponent, _super);
    function ContactAddComponent(cambankService, router, location) {
        var _this = _super.call(this, cambankService, location, router) || this;
        _this.contact = { iban: '', ownerIban: '', name: '' };
        return _this;
    }
    ContactAddComponent.prototype.create = function () {
        var _this = this;
        this.camBankService.addContact(this.contact).then(function (contact) {
            _this.router.navigateByUrl('/contacts');
        }, function (reason) { return _this.HandlerError; });
    };
    return ContactAddComponent;
}(__WEBPACK_IMPORTED_MODULE_4_app_base_location_data_component__["a" /* BaseLocationDataComponent */]));
ContactAddComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'contact-add',
        template: __webpack_require__("../../../../../src/app/contact-add/contact-add.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_app_services_iCamBankService__["a" /* CamBankService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_app_services_iCamBankService__["a" /* CamBankService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common__["g" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common__["g" /* Location */]) === "function" && _c || Object])
], ContactAddComponent);

var _a, _b, _c;
//# sourceMappingURL=contact-add.component.js.map

/***/ }),

/***/ "../../../../../src/app/contact-delete/contact-delete.component.html":
/***/ (function(module, exports) {

module.exports = "<button class=\"btn btn-default btn-back\" (click)=\"goBack()\">Indietro</button>\n\n<div class=\"spinner-container\" *ngIf=\"isBusy\">\n  <spinner></spinner>\n</div>\n\n<form class=\"detail-form\" #transactionForm=\"ngForm\" *ngIf=\"!isBusy\">\n  <div class=\"form-group\">\n    <label for=\"cause\">Iban</label>\n    <input type=\"text\" name=\"iban\" id=\"iban\" [ngModel]=\"contact.iban\" class=\"form-control\" disabled>\n  </div>\n  <div class=\"form-group\">\n    <label for=\"name\">Nome</label>\n    <input type=\"text\" name=\"name\" id=\"name\" [ngModel]=\"contact.name\" class=\"form-control\" disabled>\n  </div>\n  <button type=\"submit\" class=\"btn btn-danger\" (click)=\"delete()\">Elimina</button>\n</form>\n"

/***/ }),

/***/ "../../../../../src/app/contact-delete/contact-delete.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactDeleteComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_iCamBankService__ = __webpack_require__("../../../../../src/app/services/iCamBankService.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_base_location_data_component__ = __webpack_require__("../../../../../src/app/base-location-data.component.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ContactDeleteComponent = (function (_super) {
    __extends(ContactDeleteComponent, _super);
    function ContactDeleteComponent(cambankService, route, router, location) {
        var _this = _super.call(this, cambankService, location, router) || this;
        _this.cambankService = cambankService;
        _this.route = route;
        return _this;
    }
    ContactDeleteComponent.prototype.ngOnInit = function () {
        var _this = this;
        var iban = this.route.snapshot.params['id'];
        if (!iban) {
            return;
        }
        this.isBusy = true;
        this.cambankService.contact(iban).then(function (contact) {
            _this.contact = contact;
            _this.isBusy = false;
        }, function (reason) {
            _this.HandlerError(reason);
            _this.isBusy = false;
        });
    };
    ContactDeleteComponent.prototype.delete = function () {
        var _this = this;
        if (this.contact == null) {
            return;
        }
        this.cambankService.deleteContact(this.contact.iban).then(function (contact) {
            _this.router.navigateByUrl('/contacts');
        }, function (reason) { return _this.HandlerError(reason); });
    };
    return ContactDeleteComponent;
}(__WEBPACK_IMPORTED_MODULE_4_app_base_location_data_component__["a" /* BaseLocationDataComponent */]));
ContactDeleteComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'contact-delete',
        template: __webpack_require__("../../../../../src/app/contact-delete/contact-delete.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_app_services_iCamBankService__["a" /* CamBankService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_app_services_iCamBankService__["a" /* CamBankService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["g" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common__["g" /* Location */]) === "function" && _d || Object])
], ContactDeleteComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=contact-delete.component.js.map

/***/ }),

/***/ "../../../../../src/app/contact-edit/contact-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<button class=\"btn btn-default btn-back\" (click)=\"goBack()\">Indietro</button>\n\n<div class=\"spinner-container\" *ngIf=\"isBusy\">\n  <spinner></spinner>\n</div>\n\n<form class=\"detail-form\" #transactionForm=\"ngForm\" *ngIf=\"!isBusy\">\n  <div class=\"form-group\">\n    <label for=\"cause\">Iban</label>\n    <input type=\"text\" name=\"iban\" id=\"iban\" [(ngModel)]=\"contact.iban\" class=\"form-control\">\n  </div>\n  <div class=\"form-group\">\n    <label for=\"name\">Nome</label>\n    <input type=\"text\" name=\"name\" id=\"name\" [(ngModel)]=\"contact.name\" class=\"form-control\">\n  </div>\n  <button type=\"submit\" class=\"btn btn-success\" (click)=\"update()\">Salva</button>\n</form>\n"

/***/ }),

/***/ "../../../../../src/app/contact-edit/contact-edit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactEditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_iCamBankService__ = __webpack_require__("../../../../../src/app/services/iCamBankService.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_base_location_data_component__ = __webpack_require__("../../../../../src/app/base-location-data.component.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ContactEditComponent = (function (_super) {
    __extends(ContactEditComponent, _super);
    function ContactEditComponent(cambankService, route, router, location) {
        var _this = _super.call(this, cambankService, location, router) || this;
        _this.cambankService = cambankService;
        _this.route = route;
        _this.contact = { iban: null, ownerIban: null, name: null };
        return _this;
    }
    ContactEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        var iban = this.route.snapshot.params['id'];
        if (!iban) {
            return;
        }
        this.isBusy = true;
        this.cambankService.contact(iban).then(function (contact) {
            _this.contact = contact;
            _this.isBusy = false;
        }, function (reason) {
            _this.HandlerError(reason);
            _this.isBusy = false;
        });
    };
    ContactEditComponent.prototype.update = function () {
        var _this = this;
        var iban = this.route.snapshot.params['id'];
        this.cambankService.updateContact(iban, this.contact).then(function (contact) {
            _this.router.navigateByUrl('/contacts');
        }, function (reason) { return _this.HandlerError(reason); });
    };
    return ContactEditComponent;
}(__WEBPACK_IMPORTED_MODULE_4_app_base_location_data_component__["a" /* BaseLocationDataComponent */]));
ContactEditComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'contact-edit',
        template: __webpack_require__("../../../../../src/app/contact-edit/contact-edit.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_app_services_iCamBankService__["a" /* CamBankService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_app_services_iCamBankService__["a" /* CamBankService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["g" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common__["g" /* Location */]) === "function" && _d || Object])
], ContactEditComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=contact-edit.component.js.map

/***/ }),

/***/ "../../../../../src/app/contacts-list/contacts-list.component.html":
/***/ (function(module, exports) {

module.exports = "<a class=\"btn btn-default\" [routerLink]=\"'add'\">Add</a>\n\n<div class=\"table-responsive\" *ngIf=\"thereAreContacts\">\n  \n  <div class=\"spinner-container\" *ngIf=\"isBusy\">\n    <spinner></spinner>\n  </div>\n\n  <table class=\"table table-hover\" *ngIf=\"!isBusy\">\n    <thead>\n      <tr class=\"tablerow\">\n        <th width=\"35%\">Iban</th>\n        <th width=\"50%\">Nome</th>\n        <th width=\"15%\">Azioni</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let contact of contacts\">\n        <td>{{contact.iban}}</td>\n        <td>{{contact.name}}</td>\n        <td>\n          <a [routerLink]=\"'edit/' + contact.iban\"><img class=\"action_icon\" src=\"assets/icons/edit.png\"></a>\n          <a [routerLink]=\"'delete/' + contact.iban\"><img class=\"action_icon\" src=\"assets/icons/remove.png\"></a>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n  \n</div>\n\n<div class=\"container message\" *ngIf=\"!thereAreContacts\">\n  <h5>\n    Non hai aggiunto nessun contatto\n  </h5>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/contacts-list/contacts-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactsListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_services_iCamBankService__ = __webpack_require__("../../../../../src/app/services/iCamBankService.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_base_data_component__ = __webpack_require__("../../../../../src/app/base-data.component.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ContactsListComponent = (function (_super) {
    __extends(ContactsListComponent, _super);
    function ContactsListComponent(camBankService, router) {
        var _this = _super.call(this, camBankService, router) || this;
        _this.thereAreContacts = true;
        return _this;
    }
    ContactsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isBusy = true;
        this.camBankService.contacts().then(function (contacts) {
            _this.isBusy = false;
            _this.contacts = contacts;
            _this.thereAreContacts = contacts.length > 0;
        }, function (reason) {
            _this.isBusy = false;
            _this.thereAreContacts = false;
            _this.HandlerError(reason);
        });
    };
    return ContactsListComponent;
}(__WEBPACK_IMPORTED_MODULE_3_app_base_data_component__["a" /* BaseDataComponent */]));
ContactsListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'contacts-list',
        template: __webpack_require__("../../../../../src/app/contacts-list/contacts-list.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_app_services_iCamBankService__["a" /* CamBankService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_app_services_iCamBankService__["a" /* CamBankService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], ContactsListComponent);

var _a, _b;
//# sourceMappingURL=contacts-list.component.js.map

/***/ }),

/***/ "../../../../../src/app/currencies/currencies.component.html":
/***/ (function(module, exports) {

module.exports = "<h4>Il mercato è {{isMarketOpen | isOpen}}</h4>\n<br>\n\n<div class=\"spinner-container\" *ngIf=\"isBusy\">\n  <spinner></spinner>\n</div>\n\n<table class=\"table table-hover table-striped\" *ngIf=\"!isBusy\">\n  <thead>\n    <tr class=\"tablerow\">\n      <th>Valute</th>\n      <th>Cambio</th>\n      <th>Bid</th>\n      <th>Ask</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr *ngFor=\"let quote of quotes\" (click)=\"transactionClicked(transaction)\">\n      <td>{{quote.symbol | currencies}}</td>\n      <td>{{quote.price}}</td>\n      <td>{{quote.bid}}</td>\n      <td>{{quote.ask}}</td>\n    </tr>\n  </tbody>\n</table>\n"

/***/ }),

/***/ "../../../../../src/app/currencies/currencies.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CurrenciesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_services_iCamBankService__ = __webpack_require__("../../../../../src/app/services/iCamBankService.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__base_data_component__ = __webpack_require__("../../../../../src/app/base-data.component.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CurrenciesComponent = (function (_super) {
    __extends(CurrenciesComponent, _super);
    function CurrenciesComponent(camBankService, router) {
        var _this = _super.call(this, camBankService, router) || this;
        _this.isMarketOpen = false;
        return _this;
    }
    CurrenciesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isBusy = true;
        this.camBankService.isMarketOpen().then(function (isOpen) {
            _this.isMarketOpen = isOpen;
        }, function (reason) { return _this.HandlerError(reason); });
        this.camBankService.currenciesQuote().then(function (quotes) {
            _this.quotes = quotes;
            _this.isBusy = false;
        }, function (reason) {
            _this.HandlerError(reason);
            _this.isBusy = false;
        });
    };
    return CurrenciesComponent;
}(__WEBPACK_IMPORTED_MODULE_3__base_data_component__["a" /* BaseDataComponent */]));
CurrenciesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'currencies',
        template: __webpack_require__("../../../../../src/app/currencies/currencies.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_app_services_iCamBankService__["a" /* CamBankService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_app_services_iCamBankService__["a" /* CamBankService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], CurrenciesComponent);

var _a, _b;
//# sourceMappingURL=currencies.component.js.map

/***/ }),

/***/ "../../../../../src/app/edit-profile/edit-profile.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n\n    <h4>Il tuo profilo</h4>\n\n    <div class=\"row spinner-container\" *ngIf=\"isBusy\">\n        <spinner></spinner>\n    </div>\n\n\n    <div class=\"row\" *ngIf=\"!isBusy\">\n\n        <form class=\"detail-form col-md-5\">\n            <div class=\"form-group\">\n                <label for=\"registrationDate\">Data di registrazione</label>\n                {{user.registrationDate | date:'longDate'}}\n            </div>\n            <div class=\"form-group\">\n                <label for=\"iban\">Iban</label>\n                <input type=\"text\" name=\"iban\" [(ngModel)]=\"user.iban\" class=\"form-control\" readonly>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"email\">E-mail</label>\n                <input type=\"text\" name=\"email\" [(ngModel)]=\"user.email\" class=\"form-control\" readonly>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"username\">Username</label>\n                <input type=\"text\" name=\"username\" [(ngModel)]=\"user.name\" class=\"form-control\" (keyup)=\"onUsernameEdited($event)\">\n            </div>\n\n            <div *ngIf=\"updateResult != null\" class=\"alert\" [ngClass]=\"{'alert-danger': isError, 'alert-success': !isError}\">{{updateResult}}</div>\n            <button type=\"submit\" class=\"btn btn-success\" (click)=\"update()\">Salva</button>\n        </form>\n\n    </div>\n\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/edit-profile/edit-profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_services_iCamBankService__ = __webpack_require__("../../../../../src/app/services/iCamBankService.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__base_data_component__ = __webpack_require__("../../../../../src/app/base-data.component.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EditProfileComponent = (function (_super) {
    __extends(EditProfileComponent, _super);
    function EditProfileComponent(camBankService, router) {
        var _this = _super.call(this, camBankService, router) || this;
        _this.user = { iban: null, email: null, name: null, isOperator: false, password: null, registrationDate: null };
        return _this;
    }
    EditProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isBusy = true;
        this.camBankService.userProfile().then(function (user) {
            ;
            _this.user = user;
            _this.isBusy = false;
        }, function (reason) {
            _this.HandlerError(reason);
            _this.isBusy = false;
        });
    };
    EditProfileComponent.prototype.update = function () {
        var _this = this;
        this.camBankService.editProfile(this.user.name).then(function (result) { return _this.onUpdated(result); }, function (reason) { return _this.onError(reason); });
    };
    EditProfileComponent.prototype.onUpdated = function (result) {
        this.updateResult = 'Username aggiornato correttamente';
        this.isError = false;
    };
    EditProfileComponent.prototype.onError = function (reason) {
        this.isError = true;
        if (reason.status === 409) {
            this.updateResult = 'Questo username è già stato usato';
        }
        else {
            this.HandlerError(reason);
        }
    };
    EditProfileComponent.prototype.onUsernameEdited = function (event) {
        this.updateResult = null;
        this.isError = false;
    };
    return EditProfileComponent;
}(__WEBPACK_IMPORTED_MODULE_3__base_data_component__["a" /* BaseDataComponent */]));
EditProfileComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'edit-profile',
        template: __webpack_require__("../../../../../src/app/edit-profile/edit-profile.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_app_services_iCamBankService__["a" /* CamBankService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_app_services_iCamBankService__["a" /* CamBankService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], EditProfileComponent);

var _a, _b;
//# sourceMappingURL=edit-profile.component.js.map

/***/ }),

/***/ "../../../../../src/app/footer/footer.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".footer-divider {\n  border-color: #11349d;\n  margin-top: 100px;\n}\n\n.copyright {\n  margin-top: 0px;\n  color: #11349d;\n  text-align: right;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/footer/footer.component.html":
/***/ (function(module, exports) {

module.exports = "<hr class=\"footer-divider\">\n<div class=\"copyright\">\n  Copyright © 2017 Cambank\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/footer/footer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FooterComponent = (function () {
    function FooterComponent() {
    }
    return FooterComponent;
}());
FooterComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'footer',
        template: __webpack_require__("../../../../../src/app/footer/footer.component.html"),
        styles: [__webpack_require__("../../../../../src/app/footer/footer.component.css")]
    })
], FooterComponent);

//# sourceMappingURL=footer.component.js.map

/***/ }),

/***/ "../../../../../src/app/home/home.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "ul li {\n  color: #11349d;\n  font-size: 18px;\n  font-weight: normal;\n  margin: 12px 0;\n}\n\n.services-container {\n  border: 1px solid #11349d;\n  color: #11349d;\n  font-size: 22px;\n  font-weight: bold;\n  padding: 2%;\n  border-radius: 20px;\n}\n\n.btn-success, .btn-default {\n  width: 120px;\n  margin: 5px 15px;\n}\n\n.button-container {\n  position: relative;\n}\n\n.row {\n  margin: 15px 0;\n}\n\n.brand_icon {\n  width: 60%;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"services-container\">\n  I nostri servizi:\n  <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-xs-6\">\n          <ul class=\"col\">\n            <li>Effettua e ricevi bonifici</li>\n            <li>Effettua ricariche telefoniche e paga mav</li>\n            <li>Gestisci la tua rubrica</li>\n            <li>Visualizza grafici sulla tua situazione bancaria</li>\n            <li>Scarica report dei tuoi movimenti</li>\n            <li>Informati sui cambi delle principali valute</li>\n          </ul>\n        </div>\n        <div class=\"col-xs-6 button-container\">\n          <div class=\"row\">\n              <img class=\"brand_icon\" src=\"/assets/icons/cambank_icon.png\"/>\n          </div>\n          <div class=\"row\" *ngIf=\"!authService.isAuthenticated()\">\n              <a class=\"btn btn-success\" routerLink=\"/register\">Apri un conto</a>\n              <a class=\"btn btn-default\" routerLink=\"/login\">Login</a>\n          </div>\n        </div>\n      </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_services_iAuthService__ = __webpack_require__("../../../../../src/app/services/iAuthService.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = (function () {
    function HomeComponent(authService) {
        this.authService = authService;
    }
    return HomeComponent;
}());
HomeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'home',
        template: __webpack_require__("../../../../../src/app/home/home.component.html"),
        styles: [__webpack_require__("../../../../../src/app/home/home.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_app_services_iAuthService__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_services_iAuthService__["a" /* AuthService */]) === "function" && _a || Object])
], HomeComponent);

var _a;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "../../../../../src/app/login/login.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".ng-invalid:not(form) {\n  border-left: 5px solid #a94442; /* red */\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div class='container'>\n\n  <form #loginForm=\"ngForm\">\n\n    <div class=\"form-group\">\n      <label for=\"name\">Username</label>\n      <input type=\"text\" class=\"form-control\" id=\"name\" required\n              [(ngModel)]=\"user.name\" name=\"name\" #name=\"ngModel\">\n      <div [hidden]=\"name.valid || name.pristine\" class=\"alert alert-danger\">\n        Name is required\n      </div>\n    </div>\n\n    <div class=\"form-group\">\n      <label for=\"password\">Password</label>\n      <input type=\"password\" class=\"form-control\" id=\"password\" required\n              [(ngModel)]=\"user.password\" name=\"password\" #password=\"ngModel\">\n      <div [hidden]=\"password.valid || password.pristine\" class=\"alert alert-danger\">\n        Password is required\n      </div>\n    </div>\n\n    <spinner *ngIf=\"isAuthorizing\"></spinner>\n    <div *ngIf=\"errorMessage != null\" class=\"alert alert-danger\">{{errorMessage}}</div>\n    <button type=\"submit\" class=\"btn btn-default\" (click)=\"login()\" [disabled]=\"!loginForm.form.valid || authService.isAuthenticated()\">Login</button>\n\n  </form>\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_services_iAuthService__ = __webpack_require__("../../../../../src/app/services/iAuthService.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = (function () {
    function LoginComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.user = { name: '', password: '', iban: '', email: '', isOperator: false, registrationDate: null };
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.isAuthorizing = true;
        this.authService.authenticate(this.user.name, this.user.password).then(function (response) {
            _this.isAuthorizing = false;
            if (!response.success) {
                _this.errorMessage = 'Errore: il server ha riscontrato un problema, riprova il login.';
                return;
            }
            _this.router.navigateByUrl('/transactions');
        }, function (reason) {
            _this.isAuthorizing = false;
            if (reason.status === 401) {
                _this.errorMessage = 'Errore: credenziali non corrette';
            }
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-login',
        template: __webpack_require__("../../../../../src/app/login/login.component.html"),
        styles: [__webpack_require__("../../../../../src/app/login/login.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_app_services_iAuthService__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_app_services_iAuthService__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], LoginComponent);

var _a, _b;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "../../../../../src/app/navigation-menu/menu.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".navbar-default {\n  margin-top: 20px;\n  margin-bottom: 40px;\n  background-color: white;\n  border-color: #11349d;\n}\n\n.navbar-icon {\n  width: auto;\n  height: 22px;\n}\n\n.navbar-nav li a {\n  color: #11349d;\n}\n\n.active a {\n  background-color: #dae9ff;\n}\n\n.active a:hover {\n  background-color: #dae9ff;\n}\n\n.center {\n  margin: 15px;\n}\n\n.center a {\n  color: #11349d;\n  cursor: pointer;\n  margin-left: 20px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/navigation-menu/menu.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-default\">\n  <div class=\"container-fluid\">\n    <div class=\"navbar-header\">\n      <a class=\"navbar-brand\" routerLink=\"/home\"><img class=\"navbar-icon\" src=\"/assets/icons/cambank_icon.png\"></a>\n    </div>\n    <ul class=\"nav navbar-nav\">\n      <li *ngIf=\"authService.isAuthenticated()\" routerLinkActive=\"active\"><a routerLink=\"/transactions\">Il mio conto</a></li>\n      <li *ngIf=\"authService.isAuthenticated()\" routerLinkActive=\"active\"><a routerLink=\"/statistics\">Statistiche</a></li>\n      <li *ngIf=\"authService.isAuthenticated()\" routerLinkActive=\"active\"><a routerLink=\"/contacts\">Rubrica</a></li>\n      <li routerLinkActive=\"active\"><a routerLink=\"/currencies\">Mercati</a></li>\n    </ul>\n\n    <div class=\"nav navbar-nav navbar-right\">\n      <div class=\"center\">\n        <a *ngIf=\"!authService.isAuthenticated()\" routerLink=\"/login\">Log in</a>\n        <div *ngIf=\"authService.isAuthenticated()\">\n          <a routerLink=\"/profile/edit\">\n            {{authService.currentUsername()}}\n          </a>\n          <a (click)=\"logout()\">Log out</a>\n        </div>\n      </div>\n    </div>\n\n  </div>\n</nav>\n"

/***/ }),

/***/ "../../../../../src/app/navigation-menu/menu.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavigationMenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_services_iAuthService__ = __webpack_require__("../../../../../src/app/services/iAuthService.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NavigationMenuComponent = (function () {
    function NavigationMenuComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    NavigationMenuComponent.prototype.logout = function () {
        this.authService.logout();
        this.router.navigateByUrl('/home');
    };
    return NavigationMenuComponent;
}());
NavigationMenuComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'navigation-menu',
        styles: [__webpack_require__("../../../../../src/app/navigation-menu/menu.component.css")],
        template: __webpack_require__("../../../../../src/app/navigation-menu/menu.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_app_services_iAuthService__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_app_services_iAuthService__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], NavigationMenuComponent);

var _a, _b;
//# sourceMappingURL=menu.component.js.map

/***/ }),

/***/ "../../../../../src/app/not-found/not-found.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container {\n  text-align: center;\n}\n\n.alert-message, .btn-login {\n  margin: 30px 5px 5px 5px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/not-found/not-found.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <h2>Not found</h2>\n  <img src=\"assets/icons/notfound_icon.png\" />\n  <h4 class=\"alert-message\">Stai cercando un conenuto che non esiste o non è più indicizzato</h4>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/not-found/not-found.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotFoundComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var NotFoundComponent = (function () {
    function NotFoundComponent() {
    }
    return NotFoundComponent;
}());
NotFoundComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'not-found',
        template: __webpack_require__("../../../../../src/app/not-found/not-found.component.html"),
        styles: [__webpack_require__("../../../../../src/app/not-found/not-found.component.css")]
    })
], NotFoundComponent);

//# sourceMappingURL=not-found.component.js.map

/***/ }),

/***/ "../../../../../src/app/register/register.component.html":
/***/ (function(module, exports) {

module.exports = "<div class='container'>\n\n    <form #registerForm=\"ngForm\" *ngIf=\"!registered\">\n\n      <div class=\"form-group\">\n        <label for=\"email\">Indirizzo email</label>\n        <input type=\"text\" class=\"form-control\" id=\"mail\" validateEmail\n                [(ngModel)]=\"user.email\" name=\"mail\" #mail=\"ngModel\">\n        <div [hidden]=\"mail.valid || mail.pristine\" class=\"alert alert-danger\">\n          L'indirizzo email che hai inserito non è valido.\n        </div>\n      </div>\n\n      <div class=\"form-group\">\n        <label for=\"name\">Username</label>\n        <input type=\"text\" class=\"form-control\" id=\"name\" [(ngModel)]=\"user.name\" name=\"name\">\n      </div>\n\n      <div class=\"form-group\">\n        <label for=\"password\">Password</label>\n        <input type=\"password\" class=\"form-control\" id=\"password\" required\n                [(ngModel)]=\"user.password\" name=\"password\" #password=\"ngModel\">\n        <div [hidden]=\"password.valid || password.pristine\" class=\"alert alert-danger\">\n          La password è obbligatoria.\n        </div>\n      </div>\n\n      <spinner *ngIf=\"isAuthorizing\"></spinner>\n\n      <div *ngIf=\"errorMessage != null\" class=\"alert alert-danger\">{{errorMessage}}</div>\n\n      <button type=\"submit\" class=\"btn btn-default\" (click)=\"register()\" [disabled]=\"!registerForm.form.valid || authService.isAuthenticated()\">\n        Registrati\n      </button>\n\n    </form>\n\n    <div class=\"container\" *ngIf=\"registered\">\n      <div class=\"alert alert-success\">\n        {{registeredMessage}}\n      </div>\n      <button class=\"btn btn-default\" (click)=\"goToLogin()\">Login</button>\n    </div>\n\n  </div>\n"

/***/ }),

/***/ "../../../../../src/app/register/register.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_services_iCamBankService__ = __webpack_require__("../../../../../src/app/services/iCamBankService.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_iAuthService__ = __webpack_require__("../../../../../src/app/services/iAuthService.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_base_data_component__ = __webpack_require__("../../../../../src/app/base-data.component.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegisterComponent = (function (_super) {
    __extends(RegisterComponent, _super);
    function RegisterComponent(camBankService, router, authService) {
        var _this = _super.call(this, camBankService, router) || this;
        _this.authService = authService;
        _this.registeredMessage = 'Registrazione avvenuta correttamente. Effettua il login ed inizia ad usare i nostri servizi!';
        _this.user = { name: '', password: '', iban: '', email: '', isOperator: false, registrationDate: null };
        return _this;
    }
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.camBankService.register(this.user.email, this.user.password, this.user.name).then(function (user) {
            _this.registered = true;
        }, function (reason) { return _this.HandlerError(reason); });
    };
    RegisterComponent.prototype.goToLogin = function () {
        this.router.navigateByUrl('/login');
    };
    return RegisterComponent;
}(__WEBPACK_IMPORTED_MODULE_4_app_base_data_component__["a" /* BaseDataComponent */]));
RegisterComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'register',
        template: __webpack_require__("../../../../../src/app/register/register.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_app_services_iCamBankService__["a" /* CamBankService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_app_services_iCamBankService__["a" /* CamBankService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_app_services_iAuthService__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_app_services_iAuthService__["a" /* AuthService */]) === "function" && _c || Object])
], RegisterComponent);

var _a, _b, _c;
//# sourceMappingURL=register.component.js.map

/***/ }),

/***/ "../../../../../src/app/services/authenticationService.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthServiceApi; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__iCamBankService__ = __webpack_require__("../../../../../src/app/services/iCamBankService.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthServiceApi = (function () {
    function AuthServiceApi(apiService) {
        this.apiService = apiService;
        this.authenticated = false;
        this.loggedUserIban = localStorage.getItem('loggedUserIban');
        this.loggedUsername = localStorage.getItem('loggedUsername');
        this.authenticated = localStorage.getItem('token') != null && localStorage.getItem('token') !== 'null';
        this.updateLoggedUserIban();
    }
    AuthServiceApi.prototype.currentUserIban = function () {
        return this.loggedUserIban;
    };
    AuthServiceApi.prototype.currentUsername = function () {
        return this.loggedUsername;
    };
    AuthServiceApi.prototype.isAuthenticated = function () {
        return this.authenticated;
    };
    AuthServiceApi.prototype.authenticate = function (username, password) {
        var _this = this;
        return this.apiService.authorize(username, password).then(function (response) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('loggedUsername', username);
            _this.loggedUsername = username;
            _this.apiService.updateAccessToken(response.token);
            _this.authenticated = true;
            _this.updateLoggedUserIban();
            return response;
        }, function (reason) {
            _this.authenticated = false;
            localStorage.removeItem('token');
            localStorage.removeItem('loggedUsername');
            _this.loggedUserIban = null;
            _this.loggedUsername = null;
            return reason;
        });
    };
    AuthServiceApi.prototype.logout = function () {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedUserIban');
        localStorage.removeItem('loggedUsername');
        this.loggedUserIban = null;
        this.loggedUsername = null;
        this.authenticated = false;
        this.apiService.updateAccessToken(null);
    };
    /**
     * Utility methods
     */
    AuthServiceApi.prototype.updateLoggedUserIban = function () {
        var _this = this;
        this.apiService.loggedUserIban().then(function (iban) {
            _this.loggedUserIban = iban;
            localStorage.setItem('loggedUserIban', iban);
        }, function (reason) {
            console.log(reason);
        });
    };
    return AuthServiceApi;
}());
AuthServiceApi = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__iCamBankService__["a" /* CamBankService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__iCamBankService__["a" /* CamBankService */]) === "function" && _a || Object])
], AuthServiceApi);

var _a;
//# sourceMappingURL=authenticationService.js.map

/***/ }),

/***/ "../../../../../src/app/services/camBankService.api.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CamBankServiceApi; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/**
 * Servizio per l'interazione con le api
 * del backend
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CamBankServiceApi = (function () {
    function CamBankServiceApi(http) {
        // if (isDevMode()) {
        //   this.baseUrl = 'http://localhost:8080/';
        // }
        this.http = http;
        this.header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        this.baseUrl = '';
        this.baseForgeUrl = 'https://forex.1forge.com/1.0.2/';
        this.forgePrivateKey = 'DpwTPsb4fZczl78Qpmzhadp9IWq1Qwmj';
        var token = localStorage.getItem('token');
        if (token != null && token != 'null') {
            this.header.append('x-access-token', token);
        }
        this.header.append('Access-Control-Allow-Origin', '*');
    }
    /*
     * Metodi per l'autenticazione
     */
    CamBankServiceApi.prototype.authorize = function (username, password) {
        var body = { name: username, password: password };
        return this.http.post(this.baseUrl + 'auth', body)
            .map(function (res) { return res.json(); })
            .toPromise();
    };
    CamBankServiceApi.prototype.register = function (email, password, name) {
        var body = { email: email, password: password, name: name };
        return this.http.post(this.baseUrl + 'auth/register', body)
            .map(function (res) { return res.json(); })
            .toPromise();
    };
    CamBankServiceApi.prototype.loggedUserIban = function () {
        return this.http.get(this.baseUrl + 'utils/userIban', { headers: this.header })
            .map(function (res) { return res.json(); })
            .toPromise();
    };
    /*
     * Metodi per la gestione dei movimenti bancari
     */
    CamBankServiceApi.prototype.transactions = function () {
        return this.http.get(this.baseUrl + 'transactions/', { headers: this.header })
            .map(function (res) { return res.json(); })
            .toPromise();
    };
    CamBankServiceApi.prototype.transaction = function (transactionId) {
        return this.http.get(this.baseUrl + 'transactions/' + transactionId, { headers: this.header })
            .map(function (res) { return res.json(); })
            .toPromise();
    };
    CamBankServiceApi.prototype.updateTransactionNotes = function (transactionId, notes) {
        var body = { notes: notes };
        return this.http.put(this.baseUrl + 'transactions/update/' + transactionId, body, { headers: this.header })
            .map(function (res) { return res.json(); })
            .toPromise();
    };
    CamBankServiceApi.prototype.addTransfer = function (transfer) {
        var body = this.bodyFromBankTransaction(transfer);
        return this.http.post(this.baseUrl + 'transactions/add/transfer', body, { headers: this.header })
            .map(function (res) { return res.json(); })
            .toPromise();
    };
    CamBankServiceApi.prototype.addPhoneCharging = function (phoneCharging) {
        var body = this.bodyFromBankTransaction(phoneCharging);
        return this.http.post(this.baseUrl + 'transactions/add/phoneCharging', body, { headers: this.header })
            .map(function (res) { return res.json(); })
            .toPromise();
    };
    CamBankServiceApi.prototype.addMav = function (mav) {
        var body = this.bodyFromBankTransaction(mav);
        return this.http.post(this.baseUrl + 'transactions/add/mav', body, { headers: this.header })
            .map(function (res) { return res.json(); })
            .toPromise();
    };
    CamBankServiceApi.prototype.balance = function () {
        return this.http.get(this.baseUrl + 'transactions/status/balance', { headers: this.header })
            .map(function (res) { return res.json(); })
            .toPromise();
    };
    /*
     * Metodi per la gestione della rubrica dell'utente loggato
     */
    CamBankServiceApi.prototype.contacts = function () {
        return this.http.get(this.baseUrl + 'contacts/', { headers: this.header })
            .map(function (res) { return res.json(); })
            .toPromise();
    };
    CamBankServiceApi.prototype.contact = function (iban) {
        return this.http.get(this.baseUrl + 'contacts/' + iban, { headers: this.header })
            .map(function (res) { return res.json(); })
            .toPromise();
    };
    CamBankServiceApi.prototype.addContact = function (contact) {
        var body = { iban: contact.iban, name: contact.name };
        return this.http.post(this.baseUrl + 'contacts/add', body, { headers: this.header })
            .map(function (res) { return res.json(); })
            .toPromise();
    };
    CamBankServiceApi.prototype.updateContact = function (iban, contact) {
        var body = { newIban: contact.iban, name: contact.name };
        return this.http.put(this.baseUrl + 'contacts/update/' + iban, body, { headers: this.header })
            .map(function (res) { return res.json(); })
            .toPromise();
    };
    CamBankServiceApi.prototype.deleteContact = function (iban) {
        return this.http.delete(this.baseUrl + 'contacts/delete/' + iban, { headers: this.header })
            .map(function (res) { return res.json(); })
            .toPromise();
    };
    /*
     * Metodi di recupero dei report
     */
    CamBankServiceApi.prototype.statusReport = function () {
        var pdfHeader = this.header;
        pdfHeader.append('Accept', 'application/pdf');
        return this.http.get(this.baseUrl + 'reports/status', { headers: pdfHeader, responseType: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* ResponseContentType */].Blob })
            .map(function (res) { return new Blob([res.blob()], { type: 'application/pdf' }); })
            .toPromise();
    };
    CamBankServiceApi.prototype.transactionReport = function (id) {
        var pdfHeader = this.header;
        pdfHeader.append('Accept', 'application/pdf');
        return this.http.get(this.baseUrl + 'reports/' + id, { headers: pdfHeader, responseType: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* ResponseContentType */].Blob })
            .map(function (res) { return new Blob([res.blob()], { type: 'application/pdf' }); })
            .toPromise();
    };
    CamBankServiceApi.prototype.updateAccessToken = function (token) {
        if (token == null || token == 'null') {
            this.header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            this.header.delete('x-access-token');
        }
        else {
            this.header.set('x-access-token', token);
        }
    };
    /**
     * Metodi per il download dei dati dei mercati da 1Forge
     */
    CamBankServiceApi.prototype.isMarketOpen = function () {
        return this.http.get(this.baseForgeUrl + 'market_status?api_key=' + this.forgePrivateKey)
            .map(function (res) { return res.json().market_is_open; })
            .toPromise();
    };
    CamBankServiceApi.prototype.currenciesQuote = function () {
        var changes = 'EURGBP,EURCHF,EURUSD,EURCAD,EURJPY';
        return this.http.get(this.baseForgeUrl + 'quotes?pairs=' + changes + '&api_key=' + this.forgePrivateKey)
            .map(function (res) { return res.json(); })
            .toPromise();
        // https://forex.1forge.com/1.0.2/quotes?pairs=EURUSD,GBPJPY,AUDUSD&api_key=DpwTPsb4fZczl78Qpmzhadp9IWq1Qwmj
    };
    /*
     * Metodi di utilità sul server
     */
    CamBankServiceApi.prototype.operators = function () {
        return this.http.get(this.baseUrl + 'utils/operators', { headers: this.header })
            .map(function (res) { return res.json(); })
            .toPromise();
    };
    CamBankServiceApi.prototype.userProfile = function () {
        return this.http.get(this.baseUrl + 'utils/user/detail', { headers: this.header })
            .map(function (res) { return res.json(); })
            .toPromise();
    };
    CamBankServiceApi.prototype.editProfile = function (username) {
        var body = { username: username };
        return this.http.put(this.baseUrl + 'utils/user/edit', body, { headers: this.header })
            .map(function (res) { return res.json(); })
            .toPromise();
    };
    CamBankServiceApi.prototype.outgoings = function () {
        return this.http.get(this.baseUrl + 'statistics/outgoings', { headers: this.header })
            .map(function (res) { return res.json(); })
            .toPromise();
    };
    /*
     * Metodi di utilità in locale
     */
    CamBankServiceApi.prototype.bodyFromBankTransaction = function (transaction) {
        var body = {
            emitterIban: transaction.emitterIban,
            receiverIban: transaction.receiverIban,
            notes: transaction.notes,
            amount: transaction.amount,
            date: transaction.date,
            phoneNumber: transaction.phoneNumber,
            mavId: transaction.mavId
        };
        return body;
    };
    return CamBankServiceApi;
}());
CamBankServiceApi = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], CamBankServiceApi);

var _a;
//# sourceMappingURL=camBankService.api.js.map

/***/ }),

/***/ "../../../../../src/app/services/iAuthService.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var AuthService = (function () {
    function AuthService() {
    }
    return AuthService;
}());

//# sourceMappingURL=iAuthService.js.map

/***/ }),

/***/ "../../../../../src/app/services/iCamBankService.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CamBankService; });
var CamBankService = (function () {
    function CamBankService() {
    }
    return CamBankService;
}());

//# sourceMappingURL=iCamBankService.js.map

/***/ }),

/***/ "../../../../../src/app/shared/pipes/currencies.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CurrenciesPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var CurrenciesPipe = (function () {
    function CurrenciesPipe() {
    }
    CurrenciesPipe.prototype.transform = function (value) {
        if (value.toUpperCase() === 'EURUSD') {
            value = 'Euro / Dollaro americano';
        }
        else if (value.toUpperCase() === 'EURCAD') {
            value = 'Euro / Dollaro canadese';
        }
        else if (value.toUpperCase() === 'EURJPY') {
            value = 'Euro / Yen';
        }
        else if (value.toUpperCase() === 'EURCHF') {
            value = 'Euro / Franco svizzero';
        }
        else if (value.toUpperCase() === 'EURGBP') {
            value = 'Euro / Sterlina';
        }
        return value;
    };
    return CurrenciesPipe;
}());
CurrenciesPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'currencies' })
], CurrenciesPipe);

//# sourceMappingURL=currencies.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/shared/pipes/decimalAmount.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DecimalAmountPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_services_iAuthService__ = __webpack_require__("../../../../../src/app/services/iAuthService.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DecimalAmountPipe = (function () {
    function DecimalAmountPipe(authService) {
        this.authService = authService;
    }
    DecimalAmountPipe.prototype.transform = function (value) {
        var currentIban = this.authService.currentUserIban();
        var formattedAmount = (value.emitterIban === currentIban) ? '-' : '+';
        formattedAmount += ' ';
        formattedAmount += (value.amount !== null) ? value.amount['$numberDecimal'] : '0';
        formattedAmount += ' €';
        return formattedAmount;
    };
    return DecimalAmountPipe;
}());
DecimalAmountPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'decimalAmount' }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_app_services_iAuthService__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_services_iAuthService__["a" /* AuthService */]) === "function" && _a || Object])
], DecimalAmountPipe);

var _a;
//# sourceMappingURL=decimalAmount.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/shared/pipes/opened.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OpenedPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var OpenedPipe = (function () {
    function OpenedPipe() {
    }
    OpenedPipe.prototype.transform = function (value) {
        return (value) ? 'Aperto' : 'Chiuso';
    };
    return OpenedPipe;
}());
OpenedPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'isOpen' })
], OpenedPipe);

//# sourceMappingURL=opened.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/shared/pipes/transactionCause.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransactionCausePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_services_iAuthService__ = __webpack_require__("../../../../../src/app/services/iAuthService.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TransactionCausePipe = (function () {
    function TransactionCausePipe(authService) {
        this.authService = authService;
    }
    TransactionCausePipe.prototype.transform = function (value) {
        var currentIban = this.authService.currentUserIban();
        if (!currentIban || !value) {
            return '';
        }
        if (currentIban !== value.receiverIban && currentIban !== value.emitterIban) {
            return '';
        }
        var userCause = '';
        if (value.receiverIban === currentIban) {
            userCause += value.emitterIban + ' ha ';
            if (value.cause.toLowerCase() === 'bonifico') {
                userCause += 'effettuato un bonifico verso il tuo conto corrente';
            }
            else if (value.cause.toLowerCase() === 'mav') {
                userCause += 'pagato un mav';
            }
            else if (value.cause.toLowerCase() === 'ricarica telefonica') {
                userCause += 'effettuato una ricarica telefonica al numero ' + value.phoneNumber;
            }
        }
        else {
            if (value.cause.toLowerCase() === 'bonifico') {
                userCause += 'Hai effettuato un bonifico verso ' + value.receiverIban;
            }
            else if (value.cause.toLowerCase() === 'mav') {
                userCause += 'Hai pagato un mav';
            }
            else if (value.cause.toLowerCase() === 'ricarica telefonica') {
                userCause += 'Hai effettuato una ricarica telefonica al numero ' + value.phoneNumber;
            }
        }
        return userCause;
    };
    return TransactionCausePipe;
}());
TransactionCausePipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'transactionCause' }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_app_services_iAuthService__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_services_iAuthService__["a" /* AuthService */]) === "function" && _a || Object])
], TransactionCausePipe);

var _a;
//# sourceMappingURL=transactionCause.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/shared/validators/amountValidator.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AmountValidatorDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var AmountValidatorDirective = (function () {
    function AmountValidatorDirective() {
    }
    return AmountValidatorDirective;
}());
AmountValidatorDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '[validateAmount][ngModel]',
        providers: [
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* NG_VALIDATORS */], useValue: validateAmount, multi: true }
        ]
    })
], AmountValidatorDirective);

function validateAmount(c) {
    var amount = c.value;
    if (!amount) {
        return null;
    }
    amount = amount.replace('€', '');
    amount = amount.replace(' ', '');
    if (!isNaN(amount)) {
        return null;
    }
    else {
        return { valid: false, errorMessage: 'Hai inserito lettere o simboli non corretti.' };
    }
}
//# sourceMappingURL=amountValidator.js.map

/***/ }),

/***/ "../../../../../src/app/shared/validators/emailValidator.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailValidatorDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var EmailValidatorDirective = (function () {
    function EmailValidatorDirective() {
    }
    return EmailValidatorDirective;
}());
EmailValidatorDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '[validateEmail][ngModel]',
        providers: [
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* NG_VALIDATORS */], useValue: validateEmail, multi: true }
        ]
    })
], EmailValidatorDirective);

function validateEmail(c) {
    var email = c.value;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
        return null;
    }
    else {
        return { valid: false, errorMessage: 'Hai inserito lettere o simboli non corretti.' };
    }
}
//# sourceMappingURL=emailValidator.js.map

/***/ }),

/***/ "../../../../../src/app/shared/validators/phoneNumberValidator.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhoneNumberValidatorDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var PhoneNumberValidatorDirective = (function () {
    function PhoneNumberValidatorDirective() {
    }
    return PhoneNumberValidatorDirective;
}());
PhoneNumberValidatorDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '[validatePhoneNumber][ngModel]',
        providers: [
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* NG_VALIDATORS */], useValue: validatePhoneNumber, multi: true }
        ]
    })
], PhoneNumberValidatorDirective);

function validatePhoneNumber(c) {
    var number = c.value;
    if (number == null || number.length != 10) {
        return { valid: false, errorMessage: 'I numer i sono composti da 10 valori, controlla meglio.' };
    }
    // Controllo sia composto solo da numeri
    if (/^\d+$/.test(number)) {
        return null;
    }
    else {
        return { valid: false, errorMessage: 'Hai inserito lettere o simboli non corretti.' };
    }
}
//# sourceMappingURL=phoneNumberValidator.js.map

/***/ }),

/***/ "../../../../../src/app/spinner/spinner.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".loader {\n  border: 4px solid #f3f3f3; /* Light grey */\n  border-top: 4px solid #3498db; /* Blue */\n  border-radius: 50%;\n  width: 30px;\n  height: 30px;\n  -webkit-animation: spin 2s linear infinite;\n          animation: spin 2s linear infinite;\n  margin: 5px;\n}\n\n@-webkit-keyframes spin {\n  0% { -webkit-transform: rotate(0deg); transform: rotate(0deg); }\n  100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); }\n}\n\n@keyframes spin {\n  0% { -webkit-transform: rotate(0deg); transform: rotate(0deg); }\n  100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); }\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/spinner/spinner.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpinnerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SpinnerComponent = (function () {
    function SpinnerComponent() {
    }
    return SpinnerComponent;
}());
SpinnerComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'spinner',
        template: '<div class="loader"></div>',
        styles: [__webpack_require__("../../../../../src/app/spinner/spinner.component.css")]
    })
], SpinnerComponent);

//# sourceMappingURL=spinner.component.js.map

/***/ }),

/***/ "../../../../../src/app/statistics/statistics.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" *ngIf=\"thereAreData\">\n\n  <div *ngIf=\"pieChartData && pieChartData.length > 0\" class=\"col-md-4\">\n    <label for=\"outgoingsPieChart\">Partizionamento Uscite</label>\n    <canvas id=\"outgoingsPieChart\" baseChart\n      [data]=\"pieChartData\"\n      [labels]=\"pieChartLabels\"\n      [chartType]=\"pieChartType\"\n      (chartHover)=\"chartHovered($event)\"\n      (chartClick)=\"chartClicked($event)\">\n    </canvas>\n  </div>\n\n  <div class=\"col-md-7\" *ngIf=\"saldi && saldi.length > 0\">\n    <label for=\"balanceLineChart\">Andamento bilancio</label>\n    <canvas id=\"balanceLineChart\" baseChart\n      [data]=\"saldi\"\n      [labels]=\"saldit\"\n      [options]=\"lineChartOptions\"\n      [chartType]=\"lineChartType\"\n      (chartHover)=\"chartHovered($event)\"\n      (chartClick)=\"chartClicked($event)\">\n    </canvas>\n  </div>\n\n</div>\n\n<div class=\"container message\" *ngIf=\"!thereAreData\">\n  <h5>\n    Non ci sono dati realtivi a tuoi movimenti\n  </h5>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/statistics/statistics.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatisticsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_iCamBankService__ = __webpack_require__("../../../../../src/app/services/iCamBankService.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_services_iAuthService__ = __webpack_require__("../../../../../src/app/services/iAuthService.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__base_data_component__ = __webpack_require__("../../../../../src/app/base-data.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_decimal_js_decimal_js__ = __webpack_require__("../../../../decimal.js/decimal.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_decimal_js_decimal_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_decimal_js_decimal_js__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var StatisticsComponent = (function (_super) {
    __extends(StatisticsComponent, _super);
    function StatisticsComponent(camBankService, router, authService, datePipe) {
        var _this = _super.call(this, camBankService, router) || this;
        _this.authService = authService;
        _this.datePipe = datePipe;
        _this.lineChartType = 'line';
        _this.pieChartLabels = ['Ricariche telefoniche', 'Pagamenti mav', 'Bonifici'];
        _this.pieChartType = 'pie';
        _this.saldit = [];
        _this.saldi = [];
        _this.balance = new __WEBPACK_IMPORTED_MODULE_6_decimal_js_decimal_js__(0);
        return _this;
    }
    StatisticsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.camBankService.outgoings().then(function (outgoings) {
            _this.pieChartData = [outgoings.charge.$numberDecimal, outgoings.mav.$numberDecimal, outgoings.transaction.$numberDecimal];
        }, function (reason) { return _this.HandlerError(reason); });
        this.camBankService.transactions().then(function (transactions) {
            _this.thereAreData = transactions.length > 0;
            var userIban = _this.authService.currentUserIban();
            transactions.forEach(function (transaction) {
                _this.saldit.push(transaction.cause + ' ' + _this.datePipe.transform(transaction.date, 'dd MM yyyy, HH:mm'));
                var value = (transaction.amount === null) ? new __WEBPACK_IMPORTED_MODULE_6_decimal_js_decimal_js__('0') : new __WEBPACK_IMPORTED_MODULE_6_decimal_js_decimal_js__(transaction.amount.$numberDecimal);
                var amount = new __WEBPACK_IMPORTED_MODULE_6_decimal_js_decimal_js__(value);
                if (transaction.emitterIban === userIban) {
                    amount = amount.negated();
                }
                _this.balance = _this.balance.plus(amount);
                _this.saldi.push(_this.balance.toNumber());
            });
        }, function (reason) { return _this.HandlerError(reason); });
    };
    StatisticsComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    StatisticsComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    return StatisticsComponent;
}(__WEBPACK_IMPORTED_MODULE_5__base_data_component__["a" /* BaseDataComponent */]));
StatisticsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'statistics',
        template: __webpack_require__("../../../../../src/app/statistics/statistics.component.html"),
        providers: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["d" /* DatePipe */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_app_services_iCamBankService__["a" /* CamBankService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_app_services_iCamBankService__["a" /* CamBankService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4_app_services_iAuthService__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_app_services_iAuthService__["a" /* AuthService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common__["d" /* DatePipe */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common__["d" /* DatePipe */]) === "function" && _d || Object])
], StatisticsComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=statistics.component.js.map

/***/ }),

/***/ "../../../../../src/app/transaction-detail/transaction.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".detail-form {\n  width: 60%;\n  margin: 10px auto 20px auto;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/transaction-detail/transaction.component.html":
/***/ (function(module, exports) {

module.exports = "<button (click)=\"goBack()\" class=\"btn btn-default\">Indietro</button>\n\n<div class=\"spinner-container\" *ngIf=\"isBusy\">\n    <spinner></spinner>\n  </div>\n\n<div *ngIf=\"transaction\">\n  <form class=\"detail-form\">\n    <div class=\"form-group\">\n      <label for=\"emitter\">Emesso da</label>\n      <input type=\"text\" class=\"form-control\" id=\"emitter\" value='{{transaction.emitterIban}}' disabled>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"receiver\">Verso</label>\n      <input type=\"text\" class=\"form-control\" id=\"receivr\" value='{{transaction.receiverIban}}' disabled>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"cause\">Causale</label>\n      <input type=\"text\" class=\"form-control\" id=\"cause\" value=\"{{transaction.cause}}\" disabled>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"date\">Data</label>\n      <input type=\"text\" class=\"form-control\" id=\"date\" value=\"{{transaction.date | date: 'dd/MM/yyyy'}}\" disabled>\n    </div>\n    <div class=\"form-group\" *ngIf=\"transaction.phoneNumber != null\">\n      <label for=\"number\">Numero</label>\n      <input type=\"text\" class=\"form-control\" id=\"number\" value=\"{{transaction.phoneNumber}}\" disabled>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"amount\">Importo</label>\n      <input type=\"text\" class=\"form-control\" id=\"amount\" value=\"{{transaction | decimalAmount: 'iban1'}}\" disabled>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"notes\">Note</label>\n      <input type=\"text\" class=\"form-control\" id=\"notes\" [(ngModel)]=\"transaction.notes\" name=\"notes\">\n    </div>\n    <button type=\"submit\" class=\"btn btn-success\" (click)=\"updateNotes()\">Salva</button>\n  </form>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/transaction-detail/transaction.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransactionDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_services_iCamBankService__ = __webpack_require__("../../../../../src/app/services/iCamBankService.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_base_location_data_component__ = __webpack_require__("../../../../../src/app/base-location-data.component.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TransactionDetailComponent = (function (_super) {
    __extends(TransactionDetailComponent, _super);
    function TransactionDetailComponent(cambankService, route, location, router) {
        var _this = _super.call(this, cambankService, location, router) || this;
        _this.route = route;
        return _this;
    }
    TransactionDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.id = this.route.snapshot.params['id'];
        if (!this.id) {
            return;
        }
        this.isBusy = true;
        this.camBankService.transaction(this.id).then(function (t) {
            _this.transaction = t;
            _this.isBusy = false;
        }, function (reason) {
            _this.HandlerError(reason);
            _this.isBusy = false;
        });
        return this.id;
    };
    TransactionDetailComponent.prototype.updateNotes = function () {
        var _this = this;
        this.camBankService.updateTransactionNotes(this.transaction._id, this.transaction.notes).then(function (transaction) { }, function (reason) { return _this.HandlerError(reason); });
    };
    return TransactionDetailComponent;
}(__WEBPACK_IMPORTED_MODULE_5_app_base_location_data_component__["a" /* BaseLocationDataComponent */]));
TransactionDetailComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'transaction-detail',
        styles: [__webpack_require__("../../../../../src/app/transaction-detail/transaction.component.css")],
        template: __webpack_require__("../../../../../src/app/transaction-detail/transaction.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4_app_services_iCamBankService__["a" /* CamBankService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_app_services_iCamBankService__["a" /* CamBankService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_common__["g" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_common__["g" /* Location */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _d || Object])
], TransactionDetailComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=transaction.component.js.map

/***/ }),

/***/ "../../../../../src/app/transactions-list/transactions.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".table-hover tbody tr:hover td, .table-hover tbody tr:hover th {\n  background-color: aliceblue;\n}\n\n.balance-row {\n  text-align: right;\n  font-weight: bold;\n}\n\n.table-hover tbody .balance-row:hover td {\n  background-color: white;\n  cursor: default;\n}\n\n.balance-row .balance-value {\n  text-align: left;\n}\n\n.action:hover {\n  cursor: pointer;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/transactions-list/transactions.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"table-responsive\">\n  <div class=\"spinner-container\" *ngIf=\"isBusy\">\n    <spinner></spinner>\n  </div>\n  <table *ngIf=\"transactions !== undefined && transactions.length !== 0\" class=\"table table-hover\">\n    <thead>\n      <tr class=\"tablerow\">\n        <th width=\"12%\">Data</th>\n        <th width=\"62%\">Causale</th>\n        <th width=\"18%\">Importo</th>\n        <th width=\"8%\">Azioni</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let transaction of transactions\">\n        <td>{{transaction.date | date: \"dd/MM/yyyy\"}}</td>\n        <td>{{transaction | transactionCause}}</td>\n        <td>{{transaction | decimalAmount}}</td>\n        <td>\n          <a class=\"action\" (click)=\"downloadReport(transaction._id)\">\n            <img class=\"action_icon\" src=\"assets/icons/pdf.png\" alt=\"Report pdf\">\n          </a>\n          <a class=\"action\" (click)=\"transactionClicked(transaction)\">\n            <img class=\"action_icon\" src=\"assets/icons/report_icon.png\" alt=\"Dettaglio movimento\">\n          </a>\n        </td>\n      </tr>\n      <tr class=\"balance-row\">\n          <td></td>\n          <td>Saldo</td>\n          <td class=\"balance-value\">{{balance}}</td>\n      </tr>\n    </tbody>\n  </table>\n  <div *ngIf=\"(transactions === undefined || transactions.length === 0) && !isBusy\" class=\"message\">\n    <h5>Non è stato registrato alcun movimento</h5>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/transactions-list/transactions.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransactionsListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_services_iCamBankService__ = __webpack_require__("../../../../../src/app/services/iCamBankService.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_base_data_component__ = __webpack_require__("../../../../../src/app/base-data.component.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TransactionsListComponent = (function (_super) {
    __extends(TransactionsListComponent, _super);
    function TransactionsListComponent(camBankService, router) {
        return _super.call(this, camBankService, router) || this;
    }
    TransactionsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isBusy = true;
        this.camBankService.transactions().then(function (transactions) {
            _this.isBusy = false;
            _this.transactions = transactions;
            _this.camBankService.balance().then(function (balance) {
                _this.balance = balance;
            });
        }, function (reason) {
            _this.isBusy = false;
            _this.HandlerError(reason);
        });
    };
    TransactionsListComponent.prototype.transactionClicked = function (transaction) {
        this.router.navigateByUrl('/transactions/' + transaction._id);
    };
    TransactionsListComponent.prototype.downloadReport = function (id) {
        var _this = this;
        this.camBankService.transactionReport(id).then(function (report) {
            var fileURL = URL.createObjectURL(report);
            window.open(fileURL);
        }, function (reason) { return _this.HandlerError(reason); });
    };
    return TransactionsListComponent;
}(__WEBPACK_IMPORTED_MODULE_3_app_base_data_component__["a" /* BaseDataComponent */]));
TransactionsListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'transactions-list',
        template: __webpack_require__("../../../../../src/app/transactions-list/transactions.component.html"),
        styles: [__webpack_require__("../../../../../src/app/transactions-list/transactions.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_app_services_iCamBankService__["a" /* CamBankService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_app_services_iCamBankService__["a" /* CamBankService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], TransactionsListComponent);

var _a, _b;
//# sourceMappingURL=transactions.component.js.map

/***/ }),

/***/ "../../../../../src/app/transactions-page/transactions-page.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".actions-menu {\n  padding: 8px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/transactions-page/transactions-page.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"actions-menu\">\n  <button class=\"btn btn-default\" (click)=\"getStatusReport()\">Report</button>\n  <button class=\"btn btn-default\" (click)=\"openTransactionCreationForm()\">Aggiungi</button>\n</div>\n\n<transactions-list></transactions-list>\n"

/***/ }),

/***/ "../../../../../src/app/transactions-page/transactions-page.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransactionsPageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_services_iCamBankService__ = __webpack_require__("../../../../../src/app/services/iCamBankService.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_base_data_component__ = __webpack_require__("../../../../../src/app/base-data.component.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TransactionsPageComponent = (function (_super) {
    __extends(TransactionsPageComponent, _super);
    function TransactionsPageComponent(camBankService, router) {
        return _super.call(this, camBankService, router) || this;
    }
    TransactionsPageComponent.prototype.getStatusReport = function () {
        var _this = this;
        this.camBankService.statusReport().then(function (report) {
            var fileURL = URL.createObjectURL(report);
            window.open(fileURL);
        }, function (reason) { return _this.HandlerError(reason); });
    };
    TransactionsPageComponent.prototype.openTransactionCreationForm = function () {
        this.router.navigateByUrl('/transactions/add');
    };
    return TransactionsPageComponent;
}(__WEBPACK_IMPORTED_MODULE_3_app_base_data_component__["a" /* BaseDataComponent */]));
TransactionsPageComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'transactions-page',
        styles: [__webpack_require__("../../../../../src/app/transactions-page/transactions-page.component.css")],
        template: __webpack_require__("../../../../../src/app/transactions-page/transactions-page.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_app_services_iCamBankService__["a" /* CamBankService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_app_services_iCamBankService__["a" /* CamBankService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], TransactionsPageComponent);

var _a, _b;
//# sourceMappingURL=transactions-page.component.js.map

/***/ }),

/***/ "../../../../../src/app/unauthorized/unauthorized.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container {\n  text-align: center;\n}\n\n.alert-message, .btn-login {\n  margin: 30px 5px 5px 5px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/unauthorized/unauthorized.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <h2>Non sei autorizzato</h2>\n\n  <img src=\"/assets/icons/warning_icon.png\"/>\n\n  <div class=\"alert-message\">\n    <h4>Non hai effettuato il login oppure il tuo token è scaduto</h4>\n    <p>In ogni caso effettua il login per usare i nostri servizi</p>\n  </div>\n\n  <button class=\"btn btn-default btn-login\" (click)=\"goToLogin()\">Vai al login</button>\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/unauthorized/unauthorized.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UnauthorizedComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_services_iAuthService__ = __webpack_require__("../../../../../src/app/services/iAuthService.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UnauthorizedComponent = (function () {
    function UnauthorizedComponent(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    UnauthorizedComponent.prototype.ngOnInit = function () {
        if (this.authService.isAuthenticated()) {
            this.authService.logout();
        }
    };
    UnauthorizedComponent.prototype.goToLogin = function () {
        this.router.navigateByUrl('/login');
    };
    return UnauthorizedComponent;
}());
UnauthorizedComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'unauthorized',
        template: __webpack_require__("../../../../../src/app/unauthorized/unauthorized.component.html"),
        styles: [__webpack_require__("../../../../../src/app/unauthorized/unauthorized.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_app_services_iAuthService__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_app_services_iAuthService__["a" /* AuthService */]) === "function" && _b || Object])
], UnauthorizedComponent);

var _a, _b;
//# sourceMappingURL=unauthorized.component.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__("../../../../../src/polyfills.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");





if (__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "../../../../../src/polyfills.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_reflect__ = __webpack_require__("../../../../core-js/es6/reflect.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es7_reflect__ = __webpack_require__("../../../../core-js/es7/reflect.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_zone_js_dist_zone__ = __webpack_require__("../../../../zone.js/dist/zone.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_zone_js_dist_zone__);
/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/docs/ts/latest/guide/browser-support.html
 */
/***************************************************************************************************
 * BROWSER POLYFILLS
 */
/** IE9, IE10 and IE11 requires all of the following polyfills. **/
// import 'core-js/es6/symbol';
// import 'core-js/es6/object';
// import 'core-js/es6/function';
// import 'core-js/es6/parse-int';
// import 'core-js/es6/parse-float';
// import 'core-js/es6/number';
// import 'core-js/es6/math';
// import 'core-js/es6/string';
// import 'core-js/es6/date';
// import 'core-js/es6/array';
// import 'core-js/es6/regexp';
// import 'core-js/es6/map';
// import 'core-js/es6/set';
/** IE10 and IE11 requires the following for NgClass support on SVG elements */
// import 'classlist.js';  // Run `npm install --save classlist.js`.
/** IE10 and IE11 requires the following to support `@angular/animation`. */
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.
/** Evergreen browsers require these. **/


/** ALL Firefox browsers require the following to support `@angular/animation`. **/
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.
/***************************************************************************************************
 * Zone JS is required by Angular itself.
 */
 // Included with Angular CLI.
/***************************************************************************************************
 * APPLICATION IMPORTS
 */
/**
 * Date, currency, decimal and percent pipes.
 * Needed for: All but Chrome, Firefox, Edge, IE11 and Safari 10
 */
// import 'intl';  // Run `npm install --save intl`.
//# sourceMappingURL=polyfills.js.map

/***/ }),

/***/ "../../../../chart.js/node_modules/moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../../../../chart.js/node_modules/moment/locale/af.js",
	"./af.js": "../../../../chart.js/node_modules/moment/locale/af.js",
	"./ar": "../../../../chart.js/node_modules/moment/locale/ar.js",
	"./ar-dz": "../../../../chart.js/node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "../../../../chart.js/node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "../../../../chart.js/node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "../../../../chart.js/node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "../../../../chart.js/node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "../../../../chart.js/node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "../../../../chart.js/node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "../../../../chart.js/node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "../../../../chart.js/node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "../../../../chart.js/node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "../../../../chart.js/node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "../../../../chart.js/node_modules/moment/locale/ar-tn.js",
	"./ar.js": "../../../../chart.js/node_modules/moment/locale/ar.js",
	"./az": "../../../../chart.js/node_modules/moment/locale/az.js",
	"./az.js": "../../../../chart.js/node_modules/moment/locale/az.js",
	"./be": "../../../../chart.js/node_modules/moment/locale/be.js",
	"./be.js": "../../../../chart.js/node_modules/moment/locale/be.js",
	"./bg": "../../../../chart.js/node_modules/moment/locale/bg.js",
	"./bg.js": "../../../../chart.js/node_modules/moment/locale/bg.js",
	"./bn": "../../../../chart.js/node_modules/moment/locale/bn.js",
	"./bn.js": "../../../../chart.js/node_modules/moment/locale/bn.js",
	"./bo": "../../../../chart.js/node_modules/moment/locale/bo.js",
	"./bo.js": "../../../../chart.js/node_modules/moment/locale/bo.js",
	"./br": "../../../../chart.js/node_modules/moment/locale/br.js",
	"./br.js": "../../../../chart.js/node_modules/moment/locale/br.js",
	"./bs": "../../../../chart.js/node_modules/moment/locale/bs.js",
	"./bs.js": "../../../../chart.js/node_modules/moment/locale/bs.js",
	"./ca": "../../../../chart.js/node_modules/moment/locale/ca.js",
	"./ca.js": "../../../../chart.js/node_modules/moment/locale/ca.js",
	"./cs": "../../../../chart.js/node_modules/moment/locale/cs.js",
	"./cs.js": "../../../../chart.js/node_modules/moment/locale/cs.js",
	"./cv": "../../../../chart.js/node_modules/moment/locale/cv.js",
	"./cv.js": "../../../../chart.js/node_modules/moment/locale/cv.js",
	"./cy": "../../../../chart.js/node_modules/moment/locale/cy.js",
	"./cy.js": "../../../../chart.js/node_modules/moment/locale/cy.js",
	"./da": "../../../../chart.js/node_modules/moment/locale/da.js",
	"./da.js": "../../../../chart.js/node_modules/moment/locale/da.js",
	"./de": "../../../../chart.js/node_modules/moment/locale/de.js",
	"./de-at": "../../../../chart.js/node_modules/moment/locale/de-at.js",
	"./de-at.js": "../../../../chart.js/node_modules/moment/locale/de-at.js",
	"./de-ch": "../../../../chart.js/node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "../../../../chart.js/node_modules/moment/locale/de-ch.js",
	"./de.js": "../../../../chart.js/node_modules/moment/locale/de.js",
	"./dv": "../../../../chart.js/node_modules/moment/locale/dv.js",
	"./dv.js": "../../../../chart.js/node_modules/moment/locale/dv.js",
	"./el": "../../../../chart.js/node_modules/moment/locale/el.js",
	"./el.js": "../../../../chart.js/node_modules/moment/locale/el.js",
	"./en-au": "../../../../chart.js/node_modules/moment/locale/en-au.js",
	"./en-au.js": "../../../../chart.js/node_modules/moment/locale/en-au.js",
	"./en-ca": "../../../../chart.js/node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "../../../../chart.js/node_modules/moment/locale/en-ca.js",
	"./en-gb": "../../../../chart.js/node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "../../../../chart.js/node_modules/moment/locale/en-gb.js",
	"./en-ie": "../../../../chart.js/node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "../../../../chart.js/node_modules/moment/locale/en-ie.js",
	"./en-nz": "../../../../chart.js/node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "../../../../chart.js/node_modules/moment/locale/en-nz.js",
	"./eo": "../../../../chart.js/node_modules/moment/locale/eo.js",
	"./eo.js": "../../../../chart.js/node_modules/moment/locale/eo.js",
	"./es": "../../../../chart.js/node_modules/moment/locale/es.js",
	"./es-do": "../../../../chart.js/node_modules/moment/locale/es-do.js",
	"./es-do.js": "../../../../chart.js/node_modules/moment/locale/es-do.js",
	"./es.js": "../../../../chart.js/node_modules/moment/locale/es.js",
	"./et": "../../../../chart.js/node_modules/moment/locale/et.js",
	"./et.js": "../../../../chart.js/node_modules/moment/locale/et.js",
	"./eu": "../../../../chart.js/node_modules/moment/locale/eu.js",
	"./eu.js": "../../../../chart.js/node_modules/moment/locale/eu.js",
	"./fa": "../../../../chart.js/node_modules/moment/locale/fa.js",
	"./fa.js": "../../../../chart.js/node_modules/moment/locale/fa.js",
	"./fi": "../../../../chart.js/node_modules/moment/locale/fi.js",
	"./fi.js": "../../../../chart.js/node_modules/moment/locale/fi.js",
	"./fo": "../../../../chart.js/node_modules/moment/locale/fo.js",
	"./fo.js": "../../../../chart.js/node_modules/moment/locale/fo.js",
	"./fr": "../../../../chart.js/node_modules/moment/locale/fr.js",
	"./fr-ca": "../../../../chart.js/node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "../../../../chart.js/node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "../../../../chart.js/node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "../../../../chart.js/node_modules/moment/locale/fr-ch.js",
	"./fr.js": "../../../../chart.js/node_modules/moment/locale/fr.js",
	"./fy": "../../../../chart.js/node_modules/moment/locale/fy.js",
	"./fy.js": "../../../../chart.js/node_modules/moment/locale/fy.js",
	"./gd": "../../../../chart.js/node_modules/moment/locale/gd.js",
	"./gd.js": "../../../../chart.js/node_modules/moment/locale/gd.js",
	"./gl": "../../../../chart.js/node_modules/moment/locale/gl.js",
	"./gl.js": "../../../../chart.js/node_modules/moment/locale/gl.js",
	"./gom-latn": "../../../../chart.js/node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "../../../../chart.js/node_modules/moment/locale/gom-latn.js",
	"./he": "../../../../chart.js/node_modules/moment/locale/he.js",
	"./he.js": "../../../../chart.js/node_modules/moment/locale/he.js",
	"./hi": "../../../../chart.js/node_modules/moment/locale/hi.js",
	"./hi.js": "../../../../chart.js/node_modules/moment/locale/hi.js",
	"./hr": "../../../../chart.js/node_modules/moment/locale/hr.js",
	"./hr.js": "../../../../chart.js/node_modules/moment/locale/hr.js",
	"./hu": "../../../../chart.js/node_modules/moment/locale/hu.js",
	"./hu.js": "../../../../chart.js/node_modules/moment/locale/hu.js",
	"./hy-am": "../../../../chart.js/node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "../../../../chart.js/node_modules/moment/locale/hy-am.js",
	"./id": "../../../../chart.js/node_modules/moment/locale/id.js",
	"./id.js": "../../../../chart.js/node_modules/moment/locale/id.js",
	"./is": "../../../../chart.js/node_modules/moment/locale/is.js",
	"./is.js": "../../../../chart.js/node_modules/moment/locale/is.js",
	"./it": "../../../../chart.js/node_modules/moment/locale/it.js",
	"./it.js": "../../../../chart.js/node_modules/moment/locale/it.js",
	"./ja": "../../../../chart.js/node_modules/moment/locale/ja.js",
	"./ja.js": "../../../../chart.js/node_modules/moment/locale/ja.js",
	"./jv": "../../../../chart.js/node_modules/moment/locale/jv.js",
	"./jv.js": "../../../../chart.js/node_modules/moment/locale/jv.js",
	"./ka": "../../../../chart.js/node_modules/moment/locale/ka.js",
	"./ka.js": "../../../../chart.js/node_modules/moment/locale/ka.js",
	"./kk": "../../../../chart.js/node_modules/moment/locale/kk.js",
	"./kk.js": "../../../../chart.js/node_modules/moment/locale/kk.js",
	"./km": "../../../../chart.js/node_modules/moment/locale/km.js",
	"./km.js": "../../../../chart.js/node_modules/moment/locale/km.js",
	"./kn": "../../../../chart.js/node_modules/moment/locale/kn.js",
	"./kn.js": "../../../../chart.js/node_modules/moment/locale/kn.js",
	"./ko": "../../../../chart.js/node_modules/moment/locale/ko.js",
	"./ko.js": "../../../../chart.js/node_modules/moment/locale/ko.js",
	"./ky": "../../../../chart.js/node_modules/moment/locale/ky.js",
	"./ky.js": "../../../../chart.js/node_modules/moment/locale/ky.js",
	"./lb": "../../../../chart.js/node_modules/moment/locale/lb.js",
	"./lb.js": "../../../../chart.js/node_modules/moment/locale/lb.js",
	"./lo": "../../../../chart.js/node_modules/moment/locale/lo.js",
	"./lo.js": "../../../../chart.js/node_modules/moment/locale/lo.js",
	"./lt": "../../../../chart.js/node_modules/moment/locale/lt.js",
	"./lt.js": "../../../../chart.js/node_modules/moment/locale/lt.js",
	"./lv": "../../../../chart.js/node_modules/moment/locale/lv.js",
	"./lv.js": "../../../../chart.js/node_modules/moment/locale/lv.js",
	"./me": "../../../../chart.js/node_modules/moment/locale/me.js",
	"./me.js": "../../../../chart.js/node_modules/moment/locale/me.js",
	"./mi": "../../../../chart.js/node_modules/moment/locale/mi.js",
	"./mi.js": "../../../../chart.js/node_modules/moment/locale/mi.js",
	"./mk": "../../../../chart.js/node_modules/moment/locale/mk.js",
	"./mk.js": "../../../../chart.js/node_modules/moment/locale/mk.js",
	"./ml": "../../../../chart.js/node_modules/moment/locale/ml.js",
	"./ml.js": "../../../../chart.js/node_modules/moment/locale/ml.js",
	"./mr": "../../../../chart.js/node_modules/moment/locale/mr.js",
	"./mr.js": "../../../../chart.js/node_modules/moment/locale/mr.js",
	"./ms": "../../../../chart.js/node_modules/moment/locale/ms.js",
	"./ms-my": "../../../../chart.js/node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "../../../../chart.js/node_modules/moment/locale/ms-my.js",
	"./ms.js": "../../../../chart.js/node_modules/moment/locale/ms.js",
	"./my": "../../../../chart.js/node_modules/moment/locale/my.js",
	"./my.js": "../../../../chart.js/node_modules/moment/locale/my.js",
	"./nb": "../../../../chart.js/node_modules/moment/locale/nb.js",
	"./nb.js": "../../../../chart.js/node_modules/moment/locale/nb.js",
	"./ne": "../../../../chart.js/node_modules/moment/locale/ne.js",
	"./ne.js": "../../../../chart.js/node_modules/moment/locale/ne.js",
	"./nl": "../../../../chart.js/node_modules/moment/locale/nl.js",
	"./nl-be": "../../../../chart.js/node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "../../../../chart.js/node_modules/moment/locale/nl-be.js",
	"./nl.js": "../../../../chart.js/node_modules/moment/locale/nl.js",
	"./nn": "../../../../chart.js/node_modules/moment/locale/nn.js",
	"./nn.js": "../../../../chart.js/node_modules/moment/locale/nn.js",
	"./pa-in": "../../../../chart.js/node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "../../../../chart.js/node_modules/moment/locale/pa-in.js",
	"./pl": "../../../../chart.js/node_modules/moment/locale/pl.js",
	"./pl.js": "../../../../chart.js/node_modules/moment/locale/pl.js",
	"./pt": "../../../../chart.js/node_modules/moment/locale/pt.js",
	"./pt-br": "../../../../chart.js/node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "../../../../chart.js/node_modules/moment/locale/pt-br.js",
	"./pt.js": "../../../../chart.js/node_modules/moment/locale/pt.js",
	"./ro": "../../../../chart.js/node_modules/moment/locale/ro.js",
	"./ro.js": "../../../../chart.js/node_modules/moment/locale/ro.js",
	"./ru": "../../../../chart.js/node_modules/moment/locale/ru.js",
	"./ru.js": "../../../../chart.js/node_modules/moment/locale/ru.js",
	"./sd": "../../../../chart.js/node_modules/moment/locale/sd.js",
	"./sd.js": "../../../../chart.js/node_modules/moment/locale/sd.js",
	"./se": "../../../../chart.js/node_modules/moment/locale/se.js",
	"./se.js": "../../../../chart.js/node_modules/moment/locale/se.js",
	"./si": "../../../../chart.js/node_modules/moment/locale/si.js",
	"./si.js": "../../../../chart.js/node_modules/moment/locale/si.js",
	"./sk": "../../../../chart.js/node_modules/moment/locale/sk.js",
	"./sk.js": "../../../../chart.js/node_modules/moment/locale/sk.js",
	"./sl": "../../../../chart.js/node_modules/moment/locale/sl.js",
	"./sl.js": "../../../../chart.js/node_modules/moment/locale/sl.js",
	"./sq": "../../../../chart.js/node_modules/moment/locale/sq.js",
	"./sq.js": "../../../../chart.js/node_modules/moment/locale/sq.js",
	"./sr": "../../../../chart.js/node_modules/moment/locale/sr.js",
	"./sr-cyrl": "../../../../chart.js/node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../../../../chart.js/node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "../../../../chart.js/node_modules/moment/locale/sr.js",
	"./ss": "../../../../chart.js/node_modules/moment/locale/ss.js",
	"./ss.js": "../../../../chart.js/node_modules/moment/locale/ss.js",
	"./sv": "../../../../chart.js/node_modules/moment/locale/sv.js",
	"./sv.js": "../../../../chart.js/node_modules/moment/locale/sv.js",
	"./sw": "../../../../chart.js/node_modules/moment/locale/sw.js",
	"./sw.js": "../../../../chart.js/node_modules/moment/locale/sw.js",
	"./ta": "../../../../chart.js/node_modules/moment/locale/ta.js",
	"./ta.js": "../../../../chart.js/node_modules/moment/locale/ta.js",
	"./te": "../../../../chart.js/node_modules/moment/locale/te.js",
	"./te.js": "../../../../chart.js/node_modules/moment/locale/te.js",
	"./tet": "../../../../chart.js/node_modules/moment/locale/tet.js",
	"./tet.js": "../../../../chart.js/node_modules/moment/locale/tet.js",
	"./th": "../../../../chart.js/node_modules/moment/locale/th.js",
	"./th.js": "../../../../chart.js/node_modules/moment/locale/th.js",
	"./tl-ph": "../../../../chart.js/node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "../../../../chart.js/node_modules/moment/locale/tl-ph.js",
	"./tlh": "../../../../chart.js/node_modules/moment/locale/tlh.js",
	"./tlh.js": "../../../../chart.js/node_modules/moment/locale/tlh.js",
	"./tr": "../../../../chart.js/node_modules/moment/locale/tr.js",
	"./tr.js": "../../../../chart.js/node_modules/moment/locale/tr.js",
	"./tzl": "../../../../chart.js/node_modules/moment/locale/tzl.js",
	"./tzl.js": "../../../../chart.js/node_modules/moment/locale/tzl.js",
	"./tzm": "../../../../chart.js/node_modules/moment/locale/tzm.js",
	"./tzm-latn": "../../../../chart.js/node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../../../../chart.js/node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "../../../../chart.js/node_modules/moment/locale/tzm.js",
	"./uk": "../../../../chart.js/node_modules/moment/locale/uk.js",
	"./uk.js": "../../../../chart.js/node_modules/moment/locale/uk.js",
	"./ur": "../../../../chart.js/node_modules/moment/locale/ur.js",
	"./ur.js": "../../../../chart.js/node_modules/moment/locale/ur.js",
	"./uz": "../../../../chart.js/node_modules/moment/locale/uz.js",
	"./uz-latn": "../../../../chart.js/node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "../../../../chart.js/node_modules/moment/locale/uz-latn.js",
	"./uz.js": "../../../../chart.js/node_modules/moment/locale/uz.js",
	"./vi": "../../../../chart.js/node_modules/moment/locale/vi.js",
	"./vi.js": "../../../../chart.js/node_modules/moment/locale/vi.js",
	"./x-pseudo": "../../../../chart.js/node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../../../../chart.js/node_modules/moment/locale/x-pseudo.js",
	"./yo": "../../../../chart.js/node_modules/moment/locale/yo.js",
	"./yo.js": "../../../../chart.js/node_modules/moment/locale/yo.js",
	"./zh-cn": "../../../../chart.js/node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "../../../../chart.js/node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "../../../../chart.js/node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "../../../../chart.js/node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "../../../../chart.js/node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "../../../../chart.js/node_modules/moment/locale/zh-tw.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../../../chart.js/node_modules/moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map