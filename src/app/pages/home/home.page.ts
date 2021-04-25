import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AttemptService } from '../../services/attempt.service';
import { AuthService } from '../../services/auth.service';
import { GameService } from '../../services/game.service';
import { Attempt } from '../../models/attempt';
import { Game } from '../../models/game';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  textHeader = 'Welcome to Treasures';
  flagArrow = false;
  attempts: Attempt[];
  games: Game[];
  attemptsGames: any[] = [];
  pointsShow: number;
  sub1: Subscription;
  sub2: Subscription;

  constructor(
    private authSvc: AuthService,
    private menuController: MenuController,
    private attemptService: AttemptService,
    private gameService: GameService,
    private router: Router
  ) {}

  ngOnInit() {}

  getDataUser() {
    this.authSvc.getCurrentuser().then((user) => {
      if (user) {
        this.sub1 = this.getAttempts(user.uid)
          .pipe(take(1))
          .subscribe((attempt) => {
            if (attempt) {
              this.attempts = [];
              this.attempts = attempt;
              this.sub2 = this.getGames()
                .pipe(take(1))
                .subscribe((gameAll) => {
                  if (gameAll) {
                    this.games = [];
                    this.games = gameAll;
                    if ((this.attemptsGames = [])) {
                      this.attemptsGames = this.attempts.map((t1) => ({
                        ...t1,
                        ...this.games.find((t2) => t2.customIdName === t1.gid),
                      }));
                    }
                    console.log(this.attemptsGames);
                    this.getPoints(this.attempts);
                  }
                });
            }
          });
      }
    });
  }

  getPoints(attempts) {
    this.pointsShow = 0;
    attempts.forEach((item) => {
      this.pointsShow = this.pointsShow + item.pointsAttempt;
    });
  }

  ionViewWillEnter() {
    this.pointsShow = 0;
    this.games = [];
    this.attempts = [];
    this.getDataUser();
    this.menuController.enable(true);
  }

  getAttempts(uid: string) {
    return this.attemptService.getAttemptsByUId(uid);
  }

  getGames() {
    return this.gameService.getAllGames();
  }

  detail(gameAtt) {
    this.router.navigate(['/attempt', gameAtt.gid]);
  }
}
