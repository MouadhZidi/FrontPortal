import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggridevalagentComponent } from './aggridevalagent.component';

describe('AggridevalagentComponent', () => {
  let component: AggridevalagentComponent;
  let fixture: ComponentFixture<AggridevalagentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggridevalagentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggridevalagentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
