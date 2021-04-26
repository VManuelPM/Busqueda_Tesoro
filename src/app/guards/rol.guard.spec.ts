import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorage } from '@angular/fire/storage';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { DatabaseService } from '../services/database.service';
import { StorageService } from '../services/storage.service';
import { RolGuard } from './rol.guard';

describe('RolGuard', () => {
  let guard: RolGuard;

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
    guard = TestBed.inject(RolGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
