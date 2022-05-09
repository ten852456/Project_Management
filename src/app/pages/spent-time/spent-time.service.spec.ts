import { TestBed } from '@angular/core/testing';

import { SpentTimeService } from './spent-time.service';

describe('SpentTimeService', () => {
  let service: SpentTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpentTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
