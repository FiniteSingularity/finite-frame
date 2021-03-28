import { TestBed } from '@angular/core/testing';

import { FrameStateService } from './frame-state.service';

describe('FrameStateService', () => {
  let service: FrameStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrameStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
