import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerUtilisateurComponent } from './editer-utilisateur.component';

describe('EditerUtilisateurComponent', () => {
  let component: EditerUtilisateurComponent;
  let fixture: ComponentFixture<EditerUtilisateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditerUtilisateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditerUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
