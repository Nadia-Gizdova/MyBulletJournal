import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlyGoalsComponent } from './yearly-goals.component';

describe('YearlyGoalsComponent', () => {
  let component: YearlyGoalsComponent;
  let fixture: ComponentFixture<YearlyGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearlyGoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearlyGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
