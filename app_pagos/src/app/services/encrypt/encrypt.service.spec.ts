/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EncryptService } from './encrypt.service';

describe('Service: Encrypt', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EncryptService]
    });
  });

  it('should ...', inject([EncryptService], (service: EncryptService) => {
    expect(service).toBeTruthy();
  }));
});
