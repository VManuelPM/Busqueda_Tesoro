import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AttemptPage } from './attempt.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireModule } from '@angular/fire';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireStorage } from '@angular/fire/storage';
import { AttemptService } from '../../services/attempt.service';

describe('AttemptPage', () => {
  let component: AttemptPage;
  let fixture: ComponentFixture<AttemptPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AttemptPage],
        imports: [
          IonicModule.forRoot(),
          HttpClientTestingModule,
          AngularFireModule.initializeApp(environment.firebaseConfig),
          RouterTestingModule,
          ReactiveFormsModule,
        ],
        providers: [
          AttemptService,
          { provide: AngularFireStorage, useValue: {} },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(AttemptPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
