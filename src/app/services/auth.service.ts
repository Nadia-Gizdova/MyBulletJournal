import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;

  constructor(private afu: AngularFireAuth, private router: Router) { 
    this.afu.authState.subscribe(auth => {
      this.authState = auth;
    })
  }

  // all firebase getdata functions

  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false
  }

  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : ''
  }

  get currentUserName(): string {
    return this.authState['email']
  }

  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }

  get isUserEmailLoggedIn(): boolean {
    if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
      return true
    } else {
      return false
    }
  }

  getAuth() { 
    return this.afu;
  } 

registerWithEmail(email: string, password: string) {
    return this.afu.createUserWithEmailAndPassword(email.trim(), password)
      .then((user) => {
        this.authState = user
      })
      .catch(error => {
        console.log(error)
        throw error
      });
  }

  
  loginWithEmail(email: string, password: string)
  {
    return this.afu.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
      })
      .catch(error => {
        console.log(error)
        throw error
      });
  }

  resetPassword(email: string) {
    return this.afu.sendPasswordResetEmail(email);
  }

  singout(): void
  {
    this.afu.signOut();
    this.router.navigate(['/log-in']);
  }
}
