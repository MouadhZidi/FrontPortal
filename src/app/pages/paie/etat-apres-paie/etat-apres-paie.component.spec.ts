import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatApresPaieComponent } from './etat-apres-paie.component';

describe('EtatApresPaieComponent', () => {
  let component: EtatApresPaieComponent;
  let fixture: ComponentFixture<EtatApresPaieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtatApresPaieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtatApresPaieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
