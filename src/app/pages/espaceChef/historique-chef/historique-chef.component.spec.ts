import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueChefComponent } from './historique-chef.component';

describe('HistoriqueChefComponent', () => {
  let component: HistoriqueChefComponent;
  let fixture: ComponentFixture<HistoriqueChefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueChefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueChefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
