import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffilComponent } from './affil.component';

describe('AffilComponent', () => {
  let component: AffilComponent;
  let fixture: ComponentFixture<AffilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
