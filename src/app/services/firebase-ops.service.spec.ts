import { TestBed } from '@angular/core/testing';

import { FirebaseOpsService } from './firebase-ops.service';

describe('FirebaseOpsService', () => {
  let service: FirebaseOpsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseOpsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
