import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandePretAvanceComponent } from './demande-pret-avance.component';

describe('DemandePretAvanceComponent', () => {
  let component: DemandePretAvanceComponent;
  let fixture: ComponentFixture<DemandePretAvanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandePretAvanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandePretAvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
