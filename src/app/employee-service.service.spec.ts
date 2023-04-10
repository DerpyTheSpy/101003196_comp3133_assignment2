import { TestBed } from '@angular/core/testing';

import { EmployeeServicesService } from './employee-service.service';

describe('EmployeeServiceService', () => {
  let service: EmployeeServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
