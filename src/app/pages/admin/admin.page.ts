import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CameraPhoto, CameraResultType, Plugins } from '@capacitor/core';
import { Game } from '../../models/game';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { GameService } from '../../services/game.service';
import { ImageService } from '../../services/image.service';
import { StorageService } from '../../services/storage.service';
import { ToastService } from '../../services/toast.service';

const { Camera } = Plugins;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  //object Game
  game: Game;
  //Sage resource url with the blob of image
  photo: SafeResourceUrl;
  //Form
  gameForm: FormGroup;
  //Image captured
  imageUpload: CameraPhoto;
  //Tex to sent to header
  textHeader: string;
  // Text of the button
  textButton: string;
  //Object generic of form
  objectForm: any;
  //variable to send to header
  flagArrow = true;
  //Flag to know state of form
  isSubmitted = false;
  //Url get from storage
  url: string;
  // User id
  uid: string;
  //Game id
  gid: string;

  constructor(
    private gameService: GameService,
    private authService: AuthService,
    private imageService: ImageService,
    private databaseService: DatabaseService,
    private storageService: StorageService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    public formBuilder: FormBuilder
  ) {
    this.gid = this.route.snapshot.params.gid;

    //Validate if exists game id to change text of button
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
    this.instanceForm();
  }

  /**
   * Instance reactive form
   */
  instanceForm() {
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
      solution: [
        '',
        [Validators.required, Validators.min(10), Validators.max(99)],
      ],
      points: [
        '',
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
    });
  }

  /**
   * Load Game by game Id
   * @param gameId Id of game
   */
  loadGame(gameId: string) {
    this.gameService.getGameByGameId(gameId).subscribe((gameInfo) => {
      this.gameForm.controls['gameName'].setValue(gameInfo.gameName);
      this.gameForm.controls['description'].setValue(gameInfo.description);
      this.gameForm.controls['solution'].setValue(gameInfo.solution);
      this.gameForm.controls['points'].setValue(gameInfo.points);
      this.url = gameInfo.image;
    });
  }

  /**
   * Save or update game when form is submited
   * @returns false if the form is not valid
   */
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

  /**
   * Get the errors of form
   */
  get errorControl() {
    return this.gameForm.controls;
  }

  /**
   * Take a picture of camera or get picture from gallery
   */
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

  /**
   * Save Game in DB
   */
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

  /**
   * Updage Game
   */
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

  /**
   * Delete a game
   */
  deleteGame() {
    if (this.gid) {
      if (this.url) {
        this.toastService
          .presentAlertConfirm(
            'Are you sure?',
            'Do you want to delete this game?'
          )
          .then((flagAlert) => {
            if (flagAlert === 'ok') {
              this.storageService.deleteImage(this.url);
              this.databaseService.deleteGeneric(this.gid, 'games');
              this.toastService.presentToast('Game Deleted !!!');
              this.router.navigate(['/my-games']);
            }
          });
      }
    }
  }

  /**
   * Get Data from Imputs
   * @returns Object with the structure of Game
   */
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
