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
    // ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSliderModule,
    MatIconModule,
    ModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
