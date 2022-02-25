import { TestBed } from '@angular/core/testing';

import { MoveDataService } from './move-data.service';

describe('MoveDataService', () => {
  let service: MoveDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoveDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
