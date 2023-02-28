import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaldefinitifComponent } from './evaldefinitif.component';

describe('EvaldefinitifComponent', () => {
  let component: EvaldefinitifComponent;
  let fixture: ComponentFixture<EvaldefinitifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaldefinitifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaldefinitifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
