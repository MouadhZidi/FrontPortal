import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggridcomprequiseComponent } from './aggridcomprequise.component';

describe('AggridcomprequiseComponent', () => {
  let component: AggridcomprequiseComponent;
  let fixture: ComponentFixture<AggridcomprequiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggridcomprequiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggridcomprequiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
