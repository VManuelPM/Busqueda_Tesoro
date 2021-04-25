import { Game } from './game';
import { Attempt } from './attempt';

export class GameAttempt {
  private game: Game;
  private attempt: Attempt;

  constructor() {}

  public setGame(game: Game) {
    this.game = game;
  }

  public setAttempt(attempt: Attempt) {
    this.attempt = attempt;
  }

  public getGame() {
    return this.game;
  }

  public getAttepmt() {
    return this.attempt;
  }
}
