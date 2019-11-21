import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerTerminalComponent } from './creer-terminal.component';

describe('CreerTerminalComponent', () => {
  let component: CreerTerminalComponent;
  let fixture: ComponentFixture<CreerTerminalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreerTerminalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
