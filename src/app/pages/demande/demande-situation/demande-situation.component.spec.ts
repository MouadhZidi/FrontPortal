import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeSituationComponent } from './demande-situation.component';

describe('DemandeSituationComponent', () => {
  let component: DemandeSituationComponent;
  let fixture: ComponentFixture<DemandeSituationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeSituationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
