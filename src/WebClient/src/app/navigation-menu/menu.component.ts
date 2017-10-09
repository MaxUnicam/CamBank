import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'app/services/iAuthService';


@Component({
  selector: 'navigation-menu',
  styleUrls: ['./menu.component.css'],
  templateUrl: './menu.component.html'
})

export class NavigationMenuComponent {

  constructor(private authService: AuthService, private router: Router) { }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/home');
  }

}
