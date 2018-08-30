import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictedAccessComponent } from './restricted-access.component';

describe('RestrictedAccessComponent', () => {
  let component: RestrictedAccessComponent;
  let fixture: ComponentFixture<RestrictedAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestrictedAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestrictedAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
