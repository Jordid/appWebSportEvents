import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosExternosComponent } from './eventos-externos.component';

describe('EventosExternosComponent', () => {
  let component: EventosExternosComponent;
  let fixture: ComponentFixture<EventosExternosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosExternosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosExternosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
