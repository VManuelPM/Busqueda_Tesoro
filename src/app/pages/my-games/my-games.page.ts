import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';
import { Game } from '../../models/game';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.page.html',
  styleUrls: ['./my-games.page.scss'],
})
export class MyGamesPage implements OnInit {
  textHeader = 'My games';
  flagArrow = true;
  games: Game[];
  user: User;

  constructor(
    private gameService: GameService,
    private authService: AuthService,
    private router: Router
  ) {
    this.getGamesUser();
  }

  ngOnInit() {}

  async getGamesUser() {
    this.authService
      .getCurrentuser()
      .then((user) => {
        if (user) {
          this.user = user;
          console.log(user.uid);
          this.gameService.getGamesByUserId(user.uid).subscribe((res) => {
            console.log(res);
            this.games = res;
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  viewDetail(game: Game) {
    this.router.navigate(['/game-detail', game.customIdName]);
  }
}
