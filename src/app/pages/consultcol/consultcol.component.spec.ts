import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultcolComponent } from './consultcol.component';

describe('ConsultcolComponent', () => {
  let component: ConsultcolComponent;
  let fixture: ComponentFixture<ConsultcolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultcolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultcolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
