import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


export class UserManagementActions {
  static resetPassword = 'resetPassword';
  static verifyEmail = 'verifyEmail';
  static recoverEmail = 'recoverEmail';
}

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit, OnDestroy {

  ngUnsubscribe: Subject<any> = new Subject<any>();
  actions = UserManagementActions;

  errorMessage = "";
  oldPassword: string;
  newPassword = "";
  confirmPassword = "";
  // The user management action to be completed
  mode: any;
  // Just a code Firebase uses to prove that this is a real password reset.
  actionCode: any;
  actionCodeChecked: boolean;


  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(params => {
      // if we didn't receive any parameters, 
      // we can't do anything
      if (!params) this.router.navigate(['/log-in']);

      this.mode = params['mode'];
      this.actionCode = params['oobCode'];

      switch (params['mode']) {
        case UserManagementActions.resetPassword: {
          // Verify the password reset code is valid.
          this.authService.getAuth().verifyPasswordResetCode(this.actionCode).then(email => {
            this.actionCodeChecked = true;
          }).catch(e => {
            // Invalid or expired action code. Ask user to try to reset the password
            // again.
            alert(e);
            this.router.navigate(['/log-in']);
          });
        } break
        case UserManagementActions.recoverEmail: {

        } break
        case UserManagementActions.verifyEmail: {

        } break
        default: {
          console.log('query parameters are missing');
          this.router.navigate(['/log-in']);
        }
      }
    })
  }

  ngOnDestroy() {
    // End all subscriptions listening to ngUnsubscribe
    // to avoid memory leaks.
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  handleResetPassword() { 
    if (this.newPassword != this.confirmPassword) {
      alert('New Password and Confirm Password do not match');
      return;
    }
    // Save the new password.
    this.authService.getAuth().confirmPasswordReset(
        this.actionCode,   
        this.newPassword
    )
    .then(resp => {
      // Password reset has been confirmed and new password updated.
      alert('New password has been saved');
      this.router.navigate(['/log-in']);
    }).catch(e => {
      // Error occurred during confirmation. The code might have expired or the password is too weak.
      alert(e);
    });
  }


  resetMyPassword() {

  }

}
