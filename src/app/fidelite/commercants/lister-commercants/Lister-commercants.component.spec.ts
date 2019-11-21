import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerCommercantsComponent } from './lister-commercants.component';

describe('ListerCommercantsComponent', () => {
  let component: ListerCommercantsComponent;
  let fixture: ComponentFixture<ListerCommercantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListerCommercantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListerCommercantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
