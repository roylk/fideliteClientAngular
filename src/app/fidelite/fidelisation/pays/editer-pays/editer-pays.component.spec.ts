import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerPaysComponent } from './editer-pays.component';

describe('EditerPaysComponent', () => {
  let component: EditerPaysComponent;
  let fixture: ComponentFixture<EditerPaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditerPaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditerPaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
