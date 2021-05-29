import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';

import { HomePageComponent } from './home-page/home-page.component'
import { YearlyGoalsComponent } from './yearly-goals/yearly-goals.component';

const routes: Routes = [
  // { path: 'home-page', component: HomePageComponent}
  { 
    path: '',
    children: [
      {
        path: '', 
        redirectTo: '/home-page',
        pathMatch: 'full'
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
