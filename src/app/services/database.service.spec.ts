import { TestBed } from '@angular/core/testing';

import { DatabaseService } from './database.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { RouterTestingModule } from '@angular/router/testing';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';

describe('DatabaseService', () => {
  let service: DatabaseService;

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
    service = TestBed.inject(DatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
