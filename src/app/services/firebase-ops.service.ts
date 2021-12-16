import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Goals } from '../yearly-goals/goals';
import { User } from '../account-management/user-profile/user';


@Injectable({
  providedIn: 'root'
})

export class FirebaseOpsService {

  currentUserDetails;

  usersRef: AngularFireList<User> = null;
  usersList;
  userID = "";
  

  constructor(private afd: AngularFireDatabase, private afAuth: AngularFireAuth) {
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
    this.afAuth.authState.subscribe( user => {
      if (user) { 
        this.userID = user.uid;
        // console.log("FBOPS - MY USER ID: " + this.userID);
      }
      console.log("FBOPS - CREATING USER!!");
      // console.log("FBOPS - Create User - User Id:" + this.userID);
      const currTime = Number(new Date());
      // this.afd.list<User>('users/' + this.userID).set({firstName: _firstname, lastName: _lastname, email: _email, username: _username});
      this.afd.object('users/' + this.userID).set({firstName: _firstname, lastName: _lastname, email: _email, username: _username});
      this.afd.object('users').update({lastUpdatedAt: currTime});
    });
  }

  updateUser(_userId: string, _userName: string, _firstName: string, _lastName: string) {
    console.log("FBOPS - UPDATING USER");
    // console.log("FBSOPS - User Id: " + _userId)
    this.afd.object('users/' + _userId).update({username: _userName, firstName: _firstName, lastName: _lastName});
  }

  updateGoals(_userID: string, _goals: Goals[], _year: number) {
    console.log("FBOPS - UPDATING GOALS");
    const currentYear = new Date();
    // this.afd.object('users/' + _userID + "/year: " + currentYear.getFullYear()).update({goals: _goals});
    this.afd.object('users/' + _userID + "/year/" + _year).update({goals: _goals});
    // const currentYear = new Date();
    // this.afd.object('users/' +  _userID + "/goals").update({year: currentYear.getFullYear()});
  }

  getGoals(_userID: string, _year): AngularFireList<Goals> {
    console.log("FBOPS - GETTING GOALS FOR YEAR: " + _year);
    // var goalsRef = this.afd.list('users/' + _userID + '/goals') as AngularFireList<Goals>
    // const currentYear = new Date();
    // var goalsRef = this.afd.list('users/' + _userID + "/year: " + currentYear.getFullYear() + '/goals') as AngularFireList<Goals>
    var goalsRef = this.afd.list('users/' + _userID + "/year/" + _year + '/goals') as AngularFireList<Goals>
    return goalsRef;
  }

}
