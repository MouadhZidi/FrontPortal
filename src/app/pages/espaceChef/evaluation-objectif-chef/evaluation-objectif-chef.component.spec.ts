import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationObjectifChefComponent } from './evaluation-objectif-chef.component';

describe('EvaluationObjectifChefComponent', () => {
  let component: EvaluationObjectifChefComponent;
  let fixture: ComponentFixture<EvaluationObjectifChefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationObjectifChefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationObjectifChefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
