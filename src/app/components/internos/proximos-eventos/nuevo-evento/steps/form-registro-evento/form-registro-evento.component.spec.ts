import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegistroEventoComponent } from './form-registro-evento.component';

describe('FormRegistroEventoComponent', () => {
  let component: FormRegistroEventoComponent;
  let fixture: ComponentFixture<FormRegistroEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRegistroEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRegistroEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
