import { TestBed } from '@angular/core/testing';

import { ProbaService } from './proba.service';

describe('ProbaService', () => {
  let service: ProbaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProbaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
