import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCommercantComponent } from './detail-commercant.component';

describe('DetailCommercantComponent', () => {
  let component: DetailCommercantComponent;
  let fixture: ComponentFixture<DetailCommercantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailCommercantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCommercantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
