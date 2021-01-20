import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalMenuComponent } from './internal-menu.component';

describe('InternalMenuComponent', () => {
  let component: InternalMenuComponent;
  let fixture: ComponentFixture<InternalMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
