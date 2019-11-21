import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PalierComponent } from './palier.component';

describe('PalierComponent', () => {
  let component: PalierComponent;
  let fixture: ComponentFixture<PalierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PalierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PalierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
