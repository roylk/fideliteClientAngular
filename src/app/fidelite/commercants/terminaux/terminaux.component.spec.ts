import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminauxComponent } from './terminaux.component';

describe('TerminauxComponent', () => {
  let component: TerminauxComponent;
  let fixture: ComponentFixture<TerminauxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminauxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
