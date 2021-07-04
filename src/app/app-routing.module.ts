import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';

import { HomePageComponent } from './home-page/home-page.component'
import { LogInPageComponent } from './account-management/log-in-page/log-in-page.component';
import { YearlyGoalsComponent } from './yearly-goals/yearly-goals.component';
import { CreateAccountComponent } from './account-management/create-account/create-account.component';
import { UserProfileComponent } from './account-management/user-profile/user-profile.component';

const routes: Routes = [
  { 
    path: '',
    children: [
      {
        path: '', 
        redirectTo: '/log-in',
        pathMatch: 'full'
      },
      {
        path: 'log-in',
        component: LogInPageComponent,
        data: { title: 'Log In'}
      },
      {
        path: 'create-account',
        component: CreateAccountComponent,
        data: { title: 'Create Account'}
      },
      {
        path: 'my-account',
        component: UserProfileComponent,
        data: { title: 'My Account'}
      },
      {
        path: 'home-page',
        component: HomePageComponent,
        data: { title: 'My Bullet Journal'}
      },
      {
        path: 'events', 
        component: EventsComponent,
        data: {title: 'My Events'}
      },
      {
        path: 'yearly-goals', 
        component: YearlyGoalsComponent,
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
