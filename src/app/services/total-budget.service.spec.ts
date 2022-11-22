import { TestBed } from '@angular/core/testing';

import { TotalBudgetService } from './total-budget.service';

describe('TotalBudgetService', () => {
  let service: TotalBudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalBudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
