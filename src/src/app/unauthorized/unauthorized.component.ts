import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from 'app/services/iAuthService';


@Component({
  selector: 'unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})

export class UnauthorizedComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }


  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.authService.logout();
    }
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

}
