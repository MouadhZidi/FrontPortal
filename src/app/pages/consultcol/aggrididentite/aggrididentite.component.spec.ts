import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggrididentiteComponent } from './aggrididentite.component';

describe('AggrididentiteComponent', () => {
  let component: AggrididentiteComponent;
  let fixture: ComponentFixture<AggrididentiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggrididentiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggrididentiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
