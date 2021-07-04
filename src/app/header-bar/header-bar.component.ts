import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {

  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getSignInState();
  }


  logOut() {
    this.authService.singout();
    this.router.navigate(['log-in']);
    console.log("You've been logged out");
  }

  getSignInState() {
    console.log("Checking sign-in state")
    this.isLoggedIn = this.authService.isUserEmailLoggedIn
  }

}
