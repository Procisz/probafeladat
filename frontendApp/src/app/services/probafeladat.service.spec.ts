import { TestBed } from '@angular/core/testing';

import { ProbafeladatService } from './probafeladat.service';

describe('ProbafeladatService', () => {
  let service: ProbafeladatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProbafeladatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
