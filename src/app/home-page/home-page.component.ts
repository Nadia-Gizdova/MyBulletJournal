import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FirebaseOpsService } from '../services/firebase-ops.service';

import { ModalService } from '../modal';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  userID = '';
  firstName = '';
  lastName = '';
  email = '';

  constructor(private authService: AuthService, private firebaseOpsService: FirebaseOpsService, private afAuth: AngularFireAuth) { }



  ngOnInit(): void {
    this.afAuth.authState.subscribe( user => {
      if (user) { 
        console.log("Home Page - We have a user")
        this.userID = user.uid;
        console.log("Home Page - MY USER ID: " + this.userID);
        this.email = user.email;
        console.log("Home Page - MY EMAIL: " + this.email);
        
      }
    });
  }

}
