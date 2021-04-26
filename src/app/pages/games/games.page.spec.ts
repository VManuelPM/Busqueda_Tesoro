import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GamesPage } from './games.page';
import { GameService } from '../../services/game.service';
import { StorageService } from '../../services/storage.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('GamesPage', () => {
  let component: GamesPage;
  let fixture: ComponentFixture<GamesPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GamesPage],
        imports: [
          IonicModule.forRoot(),
          HttpClientTestingModule,
          AngularFireModule.initializeApp(environment.firebaseConfig),
          RouterTestingModule,
          ReactiveFormsModule,
        ],
        providers: [
          GameService,
          StorageService,
          { provide: AngularFireStorage, useValue: {} },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(GamesPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
