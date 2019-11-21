import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerPointDeVenteComponent } from './editer-point-de-vente.component';

describe('EditerPointDeVenteComponent', () => {
  let component: EditerPointDeVenteComponent;
  let fixture: ComponentFixture<EditerPointDeVenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditerPointDeVenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditerPointDeVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
