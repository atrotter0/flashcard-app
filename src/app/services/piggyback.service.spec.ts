import { TestBed, inject } from '@angular/core/testing';

import { PiggybackService } from './piggyback.service';

describe('PiggybackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PiggybackService]
    });
  });

  it('should be created', inject([PiggybackService], (service: PiggybackService) => {
    expect(service).toBeTruthy();
  }));
});
