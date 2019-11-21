import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsDeVenteComponent } from './points-de-vente.component';

describe('PointsDeVenteComponent', () => {
  let component: PointsDeVenteComponent;
  let fixture: ComponentFixture<PointsDeVenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsDeVenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsDeVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
