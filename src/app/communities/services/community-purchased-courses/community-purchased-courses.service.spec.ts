import { TestBed } from '@angular/core/testing';

import { CommunityPurchasedCoursesService } from './community-purchased-courses.service';

describe('CommunityPurchasedCoursesService', () => {
  let service: CommunityPurchasedCoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunityPurchasedCoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
