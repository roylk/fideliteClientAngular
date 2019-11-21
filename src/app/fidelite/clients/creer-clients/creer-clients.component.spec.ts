import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerClientsComponent } from './creer-clients.component';

describe('CreerClientsComponent', () => {
  let component: CreerClientsComponent;
  let fixture: ComponentFixture<CreerClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreerClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
