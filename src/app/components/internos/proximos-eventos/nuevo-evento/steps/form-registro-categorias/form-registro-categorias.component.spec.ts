import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegistroCategoriasComponent } from './form-registro-categorias.component';

describe('FormRegistroCategoriasComponent', () => {
  let component: FormRegistroCategoriasComponent;
  let fixture: ComponentFixture<FormRegistroCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRegistroCategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRegistroCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
