import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggridcompreelComponent } from './aggridcompreel.component';

describe('AggridcompreelComponent', () => {
  let component: AggridcompreelComponent;
  let fixture: ComponentFixture<AggridcompreelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggridcompreelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggridcompreelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
