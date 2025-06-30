import { TestBed } from '@angular/core/testing';

import { CodeSnippetService } from './code-snippet';

describe('CodeSnippet', () => {
  let service: CodeSnippetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeSnippetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
