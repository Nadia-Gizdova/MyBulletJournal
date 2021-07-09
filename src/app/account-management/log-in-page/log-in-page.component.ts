import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseOpsService } from 'src/app/services/firebase-ops.service';

@Component({
  selector: 'app-log-in-page',
  templateUrl: './log-in-page.component.html',
  styleUrls: ['./log-in-page.component.scss']
})
export class LogInPageComponent implements OnInit {

  email = "";
  password = "";
  message = "";

  errorMessage = ""; //validation error handle
  error: {
    name: string,
    message: string
  } = {name: '', message: ''} //for firebase error handle

  constructor(private authService: AuthService, private router: Router, private fbOps: FirebaseOpsService) { }

  ngOnInit(): void {
    
  }

  logIn() {
    this.clearErrorMessage()
    if(this.validateLogin(this.email, this.password)) {
      this.authService.loginWithEmail(this.email, this.password)
      .then(() => {
        // this.message = "you have succesfully logged in! Welcome to your home page";
        this.router.navigate(['/home-page']);
      }).catch(_error => {
        console.log("You have failed to Log In. Please try again");
        this.error = _error;
      })
    }
  }

  clearErrorMessage()
  {
    this.errorMessage = '';
    this.error = {name : '' , message:''};
    console.log("Clearing Error Messages");
  }

  validateLogin(email: string, password: string) {
    if(email.length == 0 && password.length == 0) {
      this.errorMessage = "Email & password fields are empty. Please provide your log in credentials."
      console.log("Email & password are empty.");
      return false; 
    }
    if(email.length == 0) {
      this.errorMessage = "Email is empty. Please enter email";
      console.log("email length is 0")
      return false;
    }
    if(password.length == 0) {
      this.errorMessage = "Password is empty. Please enter password";
      console.log("password length is 0")
      return false;
    }
    this.errorMessage = "";
    console.log("no error - validated")
    return true;
  }

  resetPasswordFromLogin() {
    if (this.email.length == 0) { 
      (<HTMLElement>document.getElementById('resetPasswordErrorText')).textContent = "Please type in your email before trying to reset your password"; 
    } else {
      this.authService.resetPassword(this.email) 
      .then(
        () => (<HTMLElement>document.getElementById('resetPasswordErrorText')).textContent = "A password reset link has been sent to your email address")
      .catch(e => 
        (<HTMLElement>document.getElementById('resetPasswordErrorText')).textContent = e + ". An error occurred while attempting to reset your password");  
    }
      }

}
