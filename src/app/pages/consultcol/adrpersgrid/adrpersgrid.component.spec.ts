import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdrpersgridComponent } from './adrpersgrid.component';

describe('AdrpersgridComponent', () => {
  let component: AdrpersgridComponent;
  let fixture: ComponentFixture<AdrpersgridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdrpersgridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdrpersgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
