import { TestBed } from '@angular/core/testing';

import { MylistService } from './mylist.service';

describe('MylistService', () => {
  let service: MylistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MylistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
