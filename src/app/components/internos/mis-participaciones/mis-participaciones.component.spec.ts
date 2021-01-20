import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisParticipacionesComponent } from './mis-participaciones.component';

describe('MisParticipacionesComponent', () => {
  let component: MisParticipacionesComponent;
  let fixture: ComponentFixture<MisParticipacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisParticipacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisParticipacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
