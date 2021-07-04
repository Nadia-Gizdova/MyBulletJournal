import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
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

  constructor(private afd: AngularFireDatabase, ) { }

  getUsers(): Observable<any> {
    return this.afd.list<User>('users').valueChanges();
  }


  createUser(_firstname: string, _lastname: string, _email: string, _username: string) {
    console.log("CREATING USER!!");
    const currTime = Number(new Date());
    this.afd.list<User>('users').push({firstName: _firstname, lastName: _lastname, email: _email, username: _username});
    this.afd.object('users').update({lastUpdatedAt: currTime});
  }
}
