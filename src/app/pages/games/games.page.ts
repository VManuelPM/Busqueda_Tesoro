import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { User } from '../../models/user';
import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {
  textHeader = 'Games';
  flagArrow = true;
  games: Game[];
  user: User;

  constructor(
    private gameService: GameService,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.getGames();
  }

  ngOnInit() {}

  async getGames() {
    this.authService
      .getCurrentuser()
      .then((user) => {
        if (user) {
          this.user = user;
          console.log(user.uid);
          this.gameService.getGames(user.uid).subscribe((res) => {
            console.log(res);
            this.games = res;
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  attempt(game: Game) {
    this.router.navigate(['/attempt', game.customIdName]);
  }
}
