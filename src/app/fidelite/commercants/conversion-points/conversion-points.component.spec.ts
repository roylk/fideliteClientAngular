import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversionPointsComponent } from './conversion-points.component';

describe('ConversionPointsComponent', () => {
  let component: ConversionPointsComponent;
  let fixture: ComponentFixture<ConversionPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversionPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversionPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
