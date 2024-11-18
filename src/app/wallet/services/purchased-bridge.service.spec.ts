import { TestBed } from '@angular/core/testing';

import { PurchasedBridgeService } from './purchased-bridge.service';

describe('PurchasedBridgeService', () => {
  let service: PurchasedBridgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchasedBridgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
