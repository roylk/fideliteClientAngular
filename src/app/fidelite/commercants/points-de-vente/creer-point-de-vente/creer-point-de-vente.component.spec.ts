import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerPointDeVenteComponent } from './creer-point-de-vente.component';

describe('CreerPointDeVenteComponent', () => {
  let component: CreerPointDeVenteComponent;
  let fixture: ComponentFixture<CreerPointDeVenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreerPointDeVenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerPointDeVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
