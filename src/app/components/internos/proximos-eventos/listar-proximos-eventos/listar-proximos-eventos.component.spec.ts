import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProximosEventosComponent } from './listar-proximos-eventos.component';

describe('ListarProximosEventosComponent', () => {
  let component: ListarProximosEventosComponent;
  let fixture: ComponentFixture<ListarProximosEventosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarProximosEventosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarProximosEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
