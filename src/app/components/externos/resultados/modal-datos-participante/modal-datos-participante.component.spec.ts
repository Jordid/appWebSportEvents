import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDatosParticipanteComponent } from './modal-datos-participante.component';

describe('ModalDatosParticipanteComponent', () => {
  let component: ModalDatosParticipanteComponent;
  let fixture: ComponentFixture<ModalDatosParticipanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDatosParticipanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDatosParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
