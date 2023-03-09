import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierContratComponent } from './calendrier-contrat.component';

describe('CalendrierContratComponent', () => {
  let component: CalendrierContratComponent;
  let fixture: ComponentFixture<CalendrierContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendrierContratComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendrierContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
