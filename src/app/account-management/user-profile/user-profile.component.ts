import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FirebaseOpsService, User } from 'src/app/services/firebase-ops.service';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  allUsers: User[] = [];
  currentUser: User;


  userID = '';
  firstName = '';
  lastName = '';
  email = '';
  userName = "";

  constructor(private authService: AuthService, private afd: AngularFireDatabase, private afAuth: AngularFireAuth, private fbOps: FirebaseOpsService) { 
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe( user => {
      if (user) { 
        this.userID = user.uid 
        console.log("User UID: " + this.userID);
        this.email = user.email;
        console.log("User Email: " + this.email);
        this.fbOps.getUsersList().snapshotChanges().subscribe(res => {
          this.allUsers.length = 0;
          res.forEach(u => {
            const user = u.payload.toJSON();
            // console.log(user['email']);
            this.allUsers.push(user as User);
            if(user['email'] == this.email) {

              this.firstName = user['firstName'];
              
              this.lastName = user['lastName'];
              
              this.email = user['email'];
              
              this.userName = user['username'];
              
            }
          })
          console.log("Users fetched succesfully. All Users: ");
          console.log("First name: " + this.firstName);
          console.log("Last name: " + this.lastName);
          console.log("Email: " + this.email);
          console.log("User name: " + this.userName);
          console.log(this.allUsers)
        }, err => {
          console.log("Users could not be fetched");
        });
      }
    });
  }


  logOut() {
    console.log("LOGGING OUT")
    this.authService.singout();
  }

}
