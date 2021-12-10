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

  isEditable: boolean = false; 
  status = "";
  // editing: boolean = false;

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
          // console.log("On Init - My Goals:")
          // console.log(this.myGoalsList);
          // console.log("On Init - Saved Goals:")
          // console.log(this.savedGoalsList);
        }, err => {
          console.log("(On Init) User Profile - Goals could not be fetched");
        });
      }
    });
  }

  saveGoals() {
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
    this.pushGoals();
  }

  pushGoals() {
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

  editGoals() {
    this.isEditable = !this.isEditable;
    if(this.isEditable){
      (<HTMLElement>document.getElementById("edit-button")).textContent = "Update Goals";
    } else {
      (<HTMLElement>document.getElementById("edit-button")).textContent = "Edit Goals";
      console.log("My Goals List after update: ")
      console.log(this.myGoalsList)
      this.updateGoalsToAccount(this.myGoalsList)
    }

  }

  updateGoalsToAccount(list) {
    console.log("Yearly Goals - SAVING GOALS TO ACCOUNT!")
    this.fbOpsService.updateGoals(this.userID, list);
    // this.status = "Goals were successfully updated!"
  }

  trackByIndex(index: number, obj: any) {
    return index;
  }

  deleteGoal(goal, index) {
    console.log("Deleting goal: '" + goal + "' with index: " + index);
    // var inputElement = document.getElementById(index);
    // inputElement.parentElement.removeChild(inputElement);
    this.myGoalsList.splice(index,1);
    console.log("My new goals list after removal of goal: " + goal + " at index: " + index + " =");
    console.log(this.myGoalsList);
    // this.updateGoalsToAccount(this.myGoalsList)
  }

  cancelChanges() {
    console.log("Saved Goals List (original copy): ")
    console.log(this.savedGoalsList)
    this.isEditable = false;
    this.fbOpsService.updateGoals(this.userID, this.savedGoalsList);
    this.ngOnInit();
  }
}
