import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalcompComponent } from './evalcomp.component';

describe('EvalcompComponent', () => {
  let component: EvalcompComponent;
  let fixture: ComponentFixture<EvalcompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvalcompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
