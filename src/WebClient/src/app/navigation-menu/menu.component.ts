import { Component } from '@angular/core';

import { AuthService } from 'app/services/iAuthService';


@Component({
  selector: 'navigation-menu',
  styleUrls: ['./menu.component.css'],
  templateUrl: './menu.component.html'
})

export class NavigationMenuComponent {

  constructor(private authService: AuthService) { }

}
