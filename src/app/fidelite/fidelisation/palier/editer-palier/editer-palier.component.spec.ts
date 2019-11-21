import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerPalierComponent } from './editer-palier.component';

describe('EditerPalierComponent', () => {
  let component: EditerPalierComponent;
  let fixture: ComponentFixture<EditerPalierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditerPalierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditerPalierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
