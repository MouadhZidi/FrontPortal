import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridetabComponent } from './gridetab.component';

describe('GridetabComponent', () => {
  let component: GridetabComponent;
  let fixture: ComponentFixture<GridetabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridetabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridetabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
