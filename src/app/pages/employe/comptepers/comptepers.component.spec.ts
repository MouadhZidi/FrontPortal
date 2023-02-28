import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptepersComponent } from './comptepers.component';

describe('ComptepersComponent', () => {
  let component: ComptepersComponent;
  let fixture: ComponentFixture<ComptepersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComptepersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComptepersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
