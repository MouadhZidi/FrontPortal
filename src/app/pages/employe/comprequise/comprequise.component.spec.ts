import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprequiseComponent } from './comprequise.component';

describe('ComprequiseComponent', () => {
  let component: ComprequiseComponent;
  let fixture: ComponentFixture<ComprequiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprequiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprequiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
