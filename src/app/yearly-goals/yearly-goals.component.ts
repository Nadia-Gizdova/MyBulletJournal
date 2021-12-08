import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { FirebaseOpsService } from '../services/firebase-ops.service';
import { Goals } from './goals';
import { User } from '../account-management/user-profile/user';

@Component({
  selector: 'app-yearly-goals',
  templateUrl: './yearly-goals.component.html',
  styleUrls: ['./yearly-goals.component.scss']
})
export class YearlyGoalsComponent implements OnInit {

  allUsers: User[] = [];
  myGoalsList: Goals[] = []; //from DB
  // myGoalsList: Goals; //from DB
  savedGoalsList: string[] = [];

  userID = '';
  email = '';

  

  constructor(private authService: AuthService, private fbOpsService: FirebaseOpsService,private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe( user => {
      if (user) { 
        this.userID = user.uid 
        console.log("(On Init) Yearly Goals - Current User UID: " + this.userID);
        this.fbOpsService.getGoals(this.userID).snapshotChanges().subscribe(res => {
          // this.myGoalsList.syncedGoals.length = 0;
          this.myGoalsList.length = 0;
          this.savedGoalsList.length = 0;
          res.forEach(g => {
            const goals = g.payload.toJSON();
            // this.myGoalsList.syncedGoals.push(goals as string);
            this.myGoalsList.push(goals as Goals);
            this.savedGoalsList.push(goals as string);
            if(user['email'] == this.email) {
              // this.myGoalsList.syncedGoals = goals["goals"];
              this.myGoalsList = goals["goals"];                 
            }
          })
          console.log("On Init - My Goals:")
          console.log(this.myGoalsList);
          console.log("On Init - Saved Goals:")
          console.log(this.savedGoalsList);
        }, err => {
          console.log("(On Init) User Profile - Goals could not be fetched");
        });
      }
    });
  }

  saveGoal() {
    var pendingGoalsList = document.getElementById("goals-list").getElementsByTagName("li");
    for (var i = 0; i < pendingGoalsList.length; ++i) {
      // var newLiElement = document.createElement('li');
      // newLiElement.style.fontFamily = "myBodyFont";
      // newLiElement.style.fontSize = "1.5vw";

      if (pendingGoalsList[i].textContent != "" && pendingGoalsList[i].textContent != null) {
        this.savedGoalsList.push(pendingGoalsList[i].textContent);
        // console.log("pendingGoalsList[i]: ")
      }
    }
    console.log("Saved my goals - Updated Goals List:");
    console.log(this.savedGoalsList);

    this.fbOpsService.updateGoals(this.userID, this.savedGoalsList);
    this.removeGoals();
  }

  removeGoals() {
    var ul = document.getElementById("goals-list");
    var items = ul.getElementsByTagName("li");
    var itemsLength = items.length;
    for (var i = 0; i < itemsLength; i++) {
      document.getElementById("goals-list").removeChild(items[0]);
    }
    var ul = document.getElementById("goals-list");
    var newLiElement = document.createElement('li');
    newLiElement.style.fontFamily = "myBodyFont";
    newLiElement.style.fontSize = "1.5vw";
    ul.appendChild(newLiElement);
  }

  // addGoal() {
  //   var saveGoalButtonDiv = document.createElement('div');
  //   saveGoalButtonDiv.className = 'save-goal-button-div';
  //   saveGoalButtonDiv.id = 'save-goal-button-div-id';
  //   saveGoalButtonDiv.innerHTML = "<button style = 'display: flex; flex-direction: row; padding-left: 15px; padding-right: 15px; margin-bottom: 10px; font-family: h1Bold; font-size: 2vw; border-radius: 20px; outline: none; background-color: white; align-self: center; cursor: pointer; box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);'>Save Goal</button>";
  //   document.getElementById("goals-container").appendChild(saveGoalButtonDiv);
  //   document.getElementById("save-goal-button-div-id").style.display = 'flex';
  //   document.getElementById("save-goal-button-div-id").style.justifyContent = 'flex-end';
  //   document.getElementById("save-goal-button-div-id").style.marginRight = '10%';
  //   document.getElementById("save-goal-button-div-id").style.marginBottom = '10px';
    
  //   var newGoalTextBoxDiv = document.createElement('div');
  //   newGoalTextBoxDiv.className = 'goal-textbox-div';
  //   newGoalTextBoxDiv.innerHTML = "<textarea style = 'width: 88.5%; resize: vertical; font-family: myBodyFont; font-size: 23px; margin-bottom: 30px; border-radius: 15px; border-color: lightgrey; height: 200px; overflow: scroll; outline: none; padding: 10px; box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);'>";
  //   document.getElementById("goals-container").appendChild(newGoalTextBoxDiv);
  // }

}
