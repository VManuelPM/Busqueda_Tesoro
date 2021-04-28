import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../../models/game';
import { User } from '../../models/user';
import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Attempt } from '../../models/attempt';
import { AttemptService } from '../../services/attempt.service';
import { DatabaseService } from '../../services/database.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-attempt',
  templateUrl: './attempt.page.html',
  styleUrls: ['./attempt.page.scss'],
})
export class AttemptPage implements OnInit {
  textHeader = 'Attempt';
  flagArrow = true;
  attemptFind: Attempt;
  attempt: Attempt;
  gid: string;
  game: Game;
  userCreator: User;
  attemptForm: FormGroup;
  isSubmitted = false;
  user: User;
  objectForm: any;
  dateShow: any;
  flagAttempt = false;

  constructor(
    private gameService: GameService,
    private authService: AuthService,
    private userService: UsersService,
    private attempService: AttemptService,
    private route: ActivatedRoute,
    private dbService: DatabaseService,
    private toastService: ToastService,
    public formBuilder: FormBuilder
  ) {
    this.initialValidation();
  }

  ngOnInit() {
    this.attemptForm = this.formBuilder.group({
      solutionUser: [
        '',
        [Validators.required, Validators.min(10), Validators.max(99)],
      ],
    });
  }

  initialValidation() {
    this.gid = this.route.snapshot.params.gid;
    if (this.gid) {
      this.getGame(this.gid).subscribe((gameRes) => {
        this.game = gameRes;
        this.userService.getUserById(gameRes.uid).subscribe((userC) => {
          this.userCreator = userC;
          this.game = gameRes;
          this.authService.getCurrentuser().then((userR) => {
            this.user = userR;
            if (userR) {
              this.loadAttempt(this.user.uid, this.gid).subscribe(
                (attemptRes) => {
                  this.attemptFind = attemptRes[0];
                  if (this.attemptFind) {
                    try {
                      this.dateShow = this.attemptFind.dateAttempt.toDate();
                      this.attemptForm.controls['solutionUser'].disable();
                      this.attemptForm.controls['solutionUser'].setValue(
                        this.attemptFind.solutionUser
                      );
                    } catch (error) {
                      console.log('error', error);
                    }
                  }
                }
              );
            }
          });
        });
      });
    }
  }

  getGame(idGame) {
    return this.gameService.getGameByGameId(idGame);
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.attemptForm.valid) {
      console.log('Please provide all the required values');
      return false;
    } else {
      let solutionUser = parseInt(this.getDataForm().solutionUser);
      console.log(this.game.solution);
      let points = this.attempService.points(
        parseInt(this.game.solution),
        solutionUser,
        this.game.points
      );
      let attemptPreview = {
        solutionUser: solutionUser,
        pointsAttempt: points,
        gid: this.gid,
        uid: this.user.uid,
        dateAttempt: new Date(),
      };
      this.attempt = attemptPreview;
      if (this.attempt) {
        this.toastService
          .presentAlertConfirm(
            'Are you sure?',
            'Do you want to sent this solution?'
          )
          .then((flagAlert) => {
            if (flagAlert === 'ok') {
              this.dbService.addGeneric(this.attempt, 'attempts');
              this.toastService.presentToast('Answer added !! ');
              this.toastService.presentToast(`Points Obtained:${points}`);
              this.flagAttempt = true;
            }
          });
      }
    }
  }

  get errorControl() {
    return this.attemptForm.controls;
  }

  getAttempt(uid: string, gid: string) {
    if (uid && gid) {
      return this.attempService.getAttemptByUIdAndGId(uid, gid);
    }
  }

  loadAttempt(uid, gid) {
    return this.getAttempt(uid, gid);
  }

  getDataForm() {
    return (this.objectForm = {
      solutionUser: this.attemptForm.value.solutionUser,
    });
  }
}
