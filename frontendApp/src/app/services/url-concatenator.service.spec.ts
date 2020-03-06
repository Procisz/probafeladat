import { TestBed } from '@angular/core/testing';

import { UrlConcatenatorService } from './url-concatenator.service';

describe('UrlConcatenatorService', () => {
  let service: UrlConcatenatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlConcatenatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
