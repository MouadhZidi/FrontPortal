import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcheanceContratComponent } from './echeance-contrat.component';

describe('EcheanceContratComponent', () => {
  let component: EcheanceContratComponent;
  let fixture: ComponentFixture<EcheanceContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcheanceContratComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcheanceContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
