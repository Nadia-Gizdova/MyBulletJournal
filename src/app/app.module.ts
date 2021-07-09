import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CalendarComponent } from './calendars/calendar/calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChunkPipe } from './calendars/calendar/calendar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { YearlyGoalsComponent } from './yearly-goals/yearly-goals.component';
import { EventsComponent } from './events/events.component';
import { PlainCalendarComponent } from './calendars/plain-calendar/plain-calendar.component';
// import { ModalComponent } from './modal/modal.component';
import { ModalModule } from './modal';
import { LogInPageComponent } from './account-management/log-in-page/log-in-page.component';
import { CreateAccountComponent } from './account-management/create-account/create-account.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard'; 
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { FormsModule } from '@angular/forms';
import { UserProfileComponent } from './account-management/user-profile/user-profile.component';
import { PasswordResetComponent } from './account-management/password-reset/password-reset.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CalendarComponent,
    ChunkPipe,
    YearlyGoalsComponent,
    EventsComponent,
    PlainCalendarComponent,
    LogInPageComponent,
    CreateAccountComponent,
    HeaderBarComponent,
    UserProfileComponent,
    PasswordResetComponent,
    // ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSliderModule,
    MatIconModule,
    ModalModule,
    FormsModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthGuardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
