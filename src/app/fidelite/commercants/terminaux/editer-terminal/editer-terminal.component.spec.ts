import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerTerminalComponent } from './editer-terminal.component';

describe('EditerTerminalComponent', () => {
  let component: EditerTerminalComponent;
  let fixture: ComponentFixture<EditerTerminalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditerTerminalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditerTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
