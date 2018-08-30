import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomDockComponent } from './bottom-dock.component';

describe('BottomDockComponent', () => {
  let component: BottomDockComponent;
  let fixture: ComponentFixture<BottomDockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomDockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomDockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
