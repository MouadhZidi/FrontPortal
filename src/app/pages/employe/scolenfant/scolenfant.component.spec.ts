import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScolenfantComponent } from './scolenfant.component';

describe('ScolenfantComponent', () => {
  let component: ScolenfantComponent;
  let fixture: ComponentFixture<ScolenfantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScolenfantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScolenfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
