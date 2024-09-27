import { TestBed } from '@angular/core/testing';

import { PurchasedCoursesService } from './purchased-courses.service';

describe('PurchasedCoursesService', () => {
  let service: PurchasedCoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchasedCoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
