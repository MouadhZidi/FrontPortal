import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExprienceprofComponent } from './exprienceprof.component';

describe('ExprienceprofComponent', () => {
  let component: ExprienceprofComponent;
  let fixture: ComponentFixture<ExprienceprofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExprienceprofComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExprienceprofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
