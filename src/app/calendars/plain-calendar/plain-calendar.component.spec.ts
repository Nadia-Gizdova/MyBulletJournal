import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlainCalendarComponent } from './plain-calendar.component';

describe('PlainCalendarComponent', () => {
  let component: PlainCalendarComponent;
  let fixture: ComponentFixture<PlainCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlainCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlainCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
