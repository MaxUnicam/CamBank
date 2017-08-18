import { Component, OnInit } from '@angular/core';

import { CamBankService } from 'app/services/iCamBankService';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'app works!';

  constructor(private cambankService: CamBankService) { }

  ngOnInit() {
    // this.cambankService.authorize().then(response => {
    //   if (!response.success) {
    //     return;
    //   }
    //   this.token = response.token;
    // });
  }

}
