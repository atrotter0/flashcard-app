import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecksEditComponent } from './decks-edit.component';

describe('DecksEditComponent', () => {
  let component: DecksEditComponent;
  let fixture: ComponentFixture<DecksEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecksEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecksEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
