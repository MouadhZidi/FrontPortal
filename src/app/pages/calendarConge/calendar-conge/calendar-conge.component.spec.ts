import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarCongeComponent } from './calendar-conge.component';

describe('CalendarCongeComponent', () => {
  let component: CalendarCongeComponent;
  let fixture: ComponentFixture<CalendarCongeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarCongeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
