import { TestBed } from '@angular/core/testing';

import { LoggedGuard } from './logged.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { InjectionToken } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { RouterTestingModule } from '@angular/router/testing';
import { DatabaseService } from '../services/database.service';
import { StorageService } from '../services/storage.service';
import { environment } from 'src/environments/environment';
import { AngularFireStorage } from '@angular/fire/storage';

describe('LoggedGuard', () => {
  let guard: LoggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule,
      ],
      providers: [
        DatabaseService,
        StorageService,
        { provide: AngularFireStorage, useValue: {} },
      ],
    });
    guard = TestBed.inject(LoggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
