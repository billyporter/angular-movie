import { TestBed } from '@angular/core/testing';

import { MovieFetcher } from './movie-fetcher.service';

describe('MovieFetcherService', () => {
  let service: MovieFetcher;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieFetcher);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
