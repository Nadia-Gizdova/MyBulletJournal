import { Component, OnInit } from '@angular/core';
import { FirebaseOpsService, User } from 'src/app/services/firebase-ops.service';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private authService: AuthService, private fbOps: FirebaseOpsService) { }

  ngOnInit(): void {
  }

  logOut() {
    console.log("LOGGING OUT")
    this.authService.singout();
  }

}
