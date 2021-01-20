import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutExternoComponent } from './layout-externo.component';

describe('LayoutExternoComponent', () => {
  let component: LayoutExternoComponent;
  let fixture: ComponentFixture<LayoutExternoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     // declarations: [ LayoutExternoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutExternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
