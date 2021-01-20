import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegistroCarrerasComponent } from './form-registro-carreras.component';

describe('FormRegistroCarrerasComponent', () => {
  let component: FormRegistroCarrerasComponent;
  let fixture: ComponentFixture<FormRegistroCarrerasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRegistroCarrerasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRegistroCarrerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
