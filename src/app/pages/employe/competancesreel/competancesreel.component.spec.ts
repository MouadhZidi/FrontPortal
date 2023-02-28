import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetancesreelComponent } from './competancesreel.component';

describe('CompetancesreelComponent', () => {
  let component: CompetancesreelComponent;
  let fixture: ComponentFixture<CompetancesreelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetancesreelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetancesreelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
