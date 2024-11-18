import { TestBed } from '@angular/core/testing';

import { PublicationLikeService } from './publication-like.service';

describe('PublicationLikeService', () => {
  let service: PublicationLikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicationLikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
