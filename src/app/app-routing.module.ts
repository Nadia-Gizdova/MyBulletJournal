import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';

import { HomePageComponent } from './home-page/home-page.component'
import { LogInPageComponent } from './account-management/log-in-page/log-in-page.component';
import { YearlyGoalsComponent } from './yearly-goals/yearly-goals.component';
import { CreateAccountComponent } from './account-management/create-account/create-account.component';
import { UserProfileComponent } from './account-management/user-profile/user-profile.component';

import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { PasswordResetComponent } from './account-management/password-reset/password-reset.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['log-in']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home-page']);
const redirectUnauthorizedToCreateAccount = () => redirectLoggedInTo(['create-account']);

const routes: Routes = [
  { 
    path: '',
    children: [
      {
        path: '', 
        redirectTo: '/log-in',
        canActivate: [AngularFireAuthGuard], 
        data: { authGuardPipe: redirectLoggedInToHome },
        pathMatch: 'full'
      },
      {
        path: 'log-in',
        component: LogInPageComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectLoggedInToHome, title: 'Log In'}
      },
      {
        path: 'create-account',
        component: CreateAccountComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToCreateAccount, title: 'Create Account'}
      },
      {
        path: 'my-account',
        component: UserProfileComponent,
        canActivate: [AngularFireAuthGuard],
        data: { title: 'My Account'}
      },
      {
        path: 'reset-password',
        component: PasswordResetComponent,
        data: { title: 'Reset Password'}
      },
      {
        path: 'home-page',
        component: HomePageComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin, title: 'My Bullet Journal'}
      },
      {
        path: 'events', 
        component: EventsComponent,
        canActivate: [AngularFireAuthGuard],
        data: {title: 'My Events'}
      },
      {
        path: 'yearly-goals', 
        component: YearlyGoalsComponent,
        canActivate: [AngularFireAuthGuard],
        data: {title: 'My Yearly Goals'}
      }
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
