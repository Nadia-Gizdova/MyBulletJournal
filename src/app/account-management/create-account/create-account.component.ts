import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';
import { FirebaseOpsService } from 'src/app/services/firebase-ops.service';
import { Observable } from 'rxjs';
import { User } from '../user-profile/user';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  
  firstName = "";
  lastName = "";
  email = "";
  username = "";
  password = ""
  message = "";
  errorMessage = ""; //validation error handle
  error: {
    name: string,
    message: string
  } = {name: '', message: ''} //for firebase error handle
  
  allUsers: Observable<User>;

  constructor(private authService: AuthService, private router: Router, private fbOps: FirebaseOpsService) {
    this.allUsers = this.fbOps.getUsers();
  }

  ngOnInit(): void {
  }

  clearErrorMessage()
  {
    this.errorMessage = '';
    this.error = {name : '' , message:''};
    console.log("Clearing Error Messages");
  }

  register() {
    this.clearErrorMessage();
    if(this.validateForm(this.email, this.password)) {
      this.authService.registerWithEmail(this.email, this.password)
      .then(()=> {
        this.createUser(this.firstName, this.lastName, this.email, this.username)
        this.message = "you are registered!"
        console.log(this.message);
        this.router.navigate(['/home-page'])
      }).catch(_error => {
        console.log("ERROR");
        this.error = _error;
        this.router.navigate(['/create-account'])
      })
    }
  } 

  createUser(firstname: string, lastname: string, email: string, username: string) {
    this.fbOps.createUser(firstname, lastname, email, username);
  }

  validateForm(email: string, password: string) {
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

    if(password.length < 6) {
      this.errorMessage = "password should be at least 6 characters";
      console.log("password length is < 6")
      return false;
    }
    this.errorMessage = "";
    console.log("no error - validated")
    return true;
  }
}
