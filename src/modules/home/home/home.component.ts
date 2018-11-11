import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { UserService } from '../../core/services/user-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( public userService: UserService, public router: Router ) { }

  ngOnInit() {
  }

  navigateToMyAccount()
  {
    this.router.navigate(['/user/', this.userService.userID]);
  }

  navigateToLogin()
  {
      this.router.navigate(['/login']);
  }

}
