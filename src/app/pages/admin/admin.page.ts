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
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

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
  textHeader: string;
  textButton: string;
  objectForm: any;
  flagArrow = true;
  isSubmitted = false;
  url: string;
  uid: string;
  gid: string;

  constructor(
    private sanitizer: DomSanitizer,
    public formBuilder: FormBuilder,
    private gameService: GameService,
    private authService: AuthService,
    private imageService: ImageService,
    private databaseService: DatabaseService,
    private storageService: StorageService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.gid = this.route.snapshot.params.gid;

    if (this.gid) {
      this.loadGame(this.gid);
      this.textHeader = 'Update Game';
      this.textButton = 'Update Game';
    } else {
      this.textHeader = 'Add Game';
      this.textButton = 'Add Game';
    }
  }

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
      points: [
        '',
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
    });
  }

  loadGame(gameId: string) {
    this.gameService.getGameByGameId(gameId).subscribe((gameInfo) => {
      this.gameForm.controls['gameName'].setValue(gameInfo.gameName);
      this.gameForm.controls['description'].setValue(gameInfo.description);
      this.gameForm.controls['solution'].setValue(gameInfo.solution);
      this.gameForm.controls['points'].setValue(gameInfo.points);
      this.url = gameInfo.image;
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.gameForm.valid) {
      console.log('Please provide all the required values');
      return false;
    } else {
      //get current user
      this.authService.getCurrentuser().then((user) => {
        this.uid = user.uid;
        //Validate if exist user
        if (this.uid) {
          //Validate there is not image loaded before
          if (this.imageUpload && !this.gid && !this.url) {
            this.saveGame();
          } else {
            this.updateGame();
          }
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

  saveGame() {
    //Convert image to base64
    this.imageService.readAsBase64(this.imageUpload).then((imageBase64) => {
      if (imageBase64) {
        //save photo in storage
        this.gameService
          .savePhotoFirebase(this.uid, imageBase64)
          .then((res) => {
            if (res) {
              this.url = res;
              console.log('image', this.url);
              this.game = this.getDataForm();
              //Add game
              this.databaseService
                .addGeneric(this.game, 'games')
                .then(() => {
                  this.gameForm.reset();
                  this.toastService.presentToast('Added Game successfuly !!');
                  this.router.navigate(['/home']);
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          });
      }
    });
  }

  updateGame() {
    if (this.photo && this.imageUpload) {
      this.game = this.getDataForm();
      console.log('se borro');
      //Delete image from storage
      this.storageService.deleteImage(this.url);
      //Convert new Image to Base 64
      this.imageService.readAsBase64(this.imageUpload).then((imageBase64) => {
        if (imageBase64) {
          //save photo in storage
          this.gameService
            .savePhotoFirebase(this.uid, imageBase64)
            .then((res) => {
              if (res) {
                this.url = res;
                this.game.image = this.url;
                //Update game
                this.databaseService
                  .updateGeneric(this.gid, this.game, 'games')
                  .then(() => {
                    this.toastService.presentToast('Update successfuly !!');
                    this.router.navigate(['/my-games']);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            });
        }
      });
    } else {
      this.game = this.getDataForm();
      this.databaseService.updateGeneric(this.gid, this.game, 'games');
      this.toastService.presentToast('Update successfuly !!');
      this.router.navigate(['/my-games']);
    }
  }

  getDataForm() {
    return (this.objectForm = {
      image: this.url,
      gameName: this.gameForm.value.gameName,
      description: this.gameForm.value.description,
      solution: this.gameForm.value.solution,
      points: this.gameForm.value.points,
      uid: this.uid,
    });
  }
}
