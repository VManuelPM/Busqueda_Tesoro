import { TestBed } from '@angular/core/testing';

import { AttemptService } from './attempt.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { StorageService } from './storage.service';
import { AngularFireStorage } from '@angular/fire/storage';

describe('AttemptService', () => {
  let service: AttemptService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule,
      ],
      providers: [
        AttemptService,
        StorageService,
        { provide: AngularFireStorage, useValue: {} },
      ],
    });
    service = TestBed.inject(AttemptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
