import { TestBed } from '@angular/core/testing';

import { ImageModuleService } from './image-module.service';

describe('ImageModuleService', () => {
  let service: ImageModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
