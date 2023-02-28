import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpppositionRhComponent } from './oppposition-rh.component';

describe('OpppositionRhComponent', () => {
  let component: OpppositionRhComponent;
  let fixture: ComponentFixture<OpppositionRhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpppositionRhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpppositionRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
