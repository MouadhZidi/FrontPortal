import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PretAvanceComponent } from './pret-avance.component';

describe('PretAvanceComponent', () => {
  let component: PretAvanceComponent;
  let fixture: ComponentFixture<PretAvanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PretAvanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PretAvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
