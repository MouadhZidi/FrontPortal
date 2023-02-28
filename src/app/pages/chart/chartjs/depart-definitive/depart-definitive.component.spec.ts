import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartDefinitiveComponent } from './depart-definitive.component';

describe('DepartDefinitiveComponent', () => {
  let component: DepartDefinitiveComponent;
  let fixture: ComponentFixture<DepartDefinitiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartDefinitiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartDefinitiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
