import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggridadressComponent } from './aggridadress.component';

describe('AggridadressComponent', () => {
  let component: AggridadressComponent;
  let fixture: ComponentFixture<AggridadressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggridadressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggridadressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
