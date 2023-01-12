import { TestBed } from '@angular/core/testing';

import { UsrserviceService } from './usrservice.service';

describe('UsrserviceService', () => {
  let service: UsrserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsrserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
