import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CameraResultType, Plugins, CameraPhoto } from '@capacitor/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { Game } from '../../models/game';

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

  constructor(
    private sanitizer: DomSanitizer,
    public formBuilder: FormBuilder,
    private gameService: GameService
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
      // this.url = this.gameService.savePhotoFirebase(this.imageUpload);
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
