import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerClientsComponent } from './lister-clients.component';

describe('ListerClientsComponent', () => {
  let component: ListerClientsComponent;
  let fixture: ComponentFixture<ListerClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListerClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListerClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
