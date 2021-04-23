import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CameraResultType, Plugins, CameraPhoto } from '@capacitor/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { Game } from '../../models/game';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { ImageService } from '../../services/image.service';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';

const { Camera } = Plugins;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  private game: Game;
  photo: SafeResourceUrl;
  gameForm: FormGroup;
  imageUpload: CameraPhoto;
  textHeader = 'Add Game';
  flagArrow = true;
  isSubmitted = false;
  url = '';
  uid: string;

  constructor(
    private sanitizer: DomSanitizer,
    public formBuilder: FormBuilder,
    private gameService: GameService,
    private authService: AuthService,
    private imageService: ImageService,
    private databaseService: DatabaseService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.gameForm = this.formBuilder.group({
      gameName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(200),
        ],
      ],
      solution: ['', [Validators.required]],
      points: ['', [Validators.required]],
    });
  }

  saveGame() {
    this.isSubmitted = true;
    if (!this.gameForm.valid) {
      console.log('Please provide all the required values');
      return false;
    } else {
      console.log(this.gameForm.value.solution);
      //get current user
      this.authService.getCurrentuser().then((user) => {
        this.uid = user.uid;
        //Validate if exist user
        if (this.uid) {
          this.imageService
            .readAsBase64(this.imageUpload)
            .then((imageBase64) => {
              if (imageBase64) {
                //save photo in storage
                this.gameService
                  .savePhotoFirebase(this.uid, imageBase64)
                  .then((res) => {
                    if (res) {
                      this.url = res;
                      console.log('image', this.url);
                      let objectForm = {
                        image: this.url,
                        description: this.gameForm.value.description,
                        solution: this.gameForm.value.solution,
                        points: this.gameForm.value.points,
                        uid: this.uid,
                      };
                      this.game = objectForm;
                      //Add game
                      this.databaseService
                        .addGeneric(this.game, 'games')
                        .then((res) => {
                          this.toastService.presentToast('Added Game Success');
                          this.router.navigate(['/home']);
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }
                  });
              }
            });
        } else {
          console.log('Error uid');
        }
      });
    }
  }

  get errorControl() {
    return this.gameForm.controls;
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });
    this.imageUpload = image;
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(
      image && image.webPath
    );
  }
}
