import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { User } from '../../models/user';
import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

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
    private router: Router
  ) {
    this.getGames();
  }

  ngOnInit() {}

  /**
   * Get Games with user id
   */
  getGames() {
    this.authService
      .getCurrentuser()
      .then((user) => {
        if (user) {
          this.user = user;
          this.gameService.getGames(user.uid).subscribe((res) => {
            this.games = res;
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * Reditec to detail game
   * @param game Object Game
   */
  attempt(game: Game) {
    this.router.navigate(['/attempt', game.customIdName]);
  }
}
