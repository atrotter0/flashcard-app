import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecksAddComponent } from './decks-add.component';

describe('DecksAddComponent', () => {
  let component: DecksAddComponent;
  let fixture: ComponentFixture<DecksAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecksAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecksAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
