import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalempComponent } from './evalemp.component';

describe('EvalempComponent', () => {
  let component: EvalempComponent;
  let fixture: ComponentFixture<EvalempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvalempComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
