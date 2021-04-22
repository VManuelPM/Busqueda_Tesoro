import { User } from './user';

export interface Game {
  gid?: string;
  image: string;
  description: string;
  solution: string;
  points: number;
  user: User;
}
