import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndimniteComponent } from './indimnite.component';

describe('IndimniteComponent', () => {
  let component: IndimniteComponent;
  let fixture: ComponentFixture<IndimniteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndimniteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndimniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
