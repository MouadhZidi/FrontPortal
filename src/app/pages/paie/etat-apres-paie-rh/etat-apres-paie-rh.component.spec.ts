import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatApresPaieRhComponent } from './etat-apres-paie-rh.component';

describe('EtatApresPaieRhComponent', () => {
  let component: EtatApresPaieRhComponent;
  let fixture: ComponentFixture<EtatApresPaieRhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtatApresPaieRhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtatApresPaieRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
