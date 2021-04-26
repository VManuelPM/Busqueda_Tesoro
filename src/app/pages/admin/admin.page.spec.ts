import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorage } from '@angular/fire/storage';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { GameService } from '../../services/game.service';
import { StorageService } from '../../services/storage.service';
import { AdminPage } from './admin.page';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('AdminPage', () => {
  let component: AdminPage;
  let fixture: ComponentFixture<AdminPage>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AdminPage],
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
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AdminPage);
          component = fixture.componentInstance;
          de = fixture.debugElement.nativeElement.querySelector('#formAdmin');
          el = de.nativeElement;
        });

      fixture = TestBed.createComponent(AdminPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have button Add Game', () => {
    expect(component.textButton).toEqual('Add Game');
  });
});
