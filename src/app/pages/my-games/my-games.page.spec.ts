import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyGamesPage } from './my-games.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireModule } from '@angular/fire';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { StorageService } from '../../services/storage.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';

describe('MyGamesPage', () => {
  let component: MyGamesPage;
  let fixture: ComponentFixture<MyGamesPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MyGamesPage],
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

      fixture = TestBed.createComponent(MyGamesPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
