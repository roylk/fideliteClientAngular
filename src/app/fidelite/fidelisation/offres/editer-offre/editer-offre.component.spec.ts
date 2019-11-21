import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerOffreComponent } from './editer-offre.component';

describe('EditerOffreComponent', () => {
  let component: EditerOffreComponent;
  let fixture: ComponentFixture<EditerOffreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditerOffreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditerOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
