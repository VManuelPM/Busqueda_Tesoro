import { User } from './user';
import { Game } from './game';
export interface Attemp {
  respuesta: number;
  puntos: number;
  game: Game;
  user: User;
}
