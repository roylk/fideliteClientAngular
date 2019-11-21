import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailClientsComponent } from './detail-clients.component';

describe('DetailClientsComponent', () => {
  let component: DetailClientsComponent;
  let fixture: ComponentFixture<DetailClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
