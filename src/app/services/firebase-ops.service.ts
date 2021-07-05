import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}



@Injectable({
  providedIn: 'root'
})

export class FirebaseOpsService {

  currentUserDetails;

  usersRef: AngularFireList<User> = null;
  usersList;

  constructor(private afd: AngularFireDatabase) {
    this.usersRef
   }

  getUsers(): Observable<any> {
    return this.afd.list<User>('/users').valueChanges();
  }

  // getUserDetails(email) {
  //   var userDetails = this.afd.list('/users', users => users.orderByChild('email').equalTo(email));
  //   return userDetails;
  // }

  getUsersList() : AngularFireList<User> {
    this.usersRef = this.afd.list('/users') as AngularFireList<User>
    return this.usersRef;
  }


  createUser(_firstname: string, _lastname: string, _email: string, _username: string) {
    console.log("CREATING USER!!");
    const currTime = Number(new Date());
    this.afd.list<User>('users').push({firstName: _firstname, lastName: _lastname, email: _email, username: _username});
    this.afd.object('users').update({lastUpdatedAt: currTime});
  }
}
