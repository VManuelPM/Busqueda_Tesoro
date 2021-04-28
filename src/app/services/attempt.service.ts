import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Attempt } from '../models/attempt';

@Injectable({
  providedIn: 'root',
})
export class AttemptService {
  constructor(private db: AngularFirestore) {}

  /**
   * Get attempts by user id andd game Id
   * @param uid user id
   * @param gid game id
   * @returns Observable with attempts by uid and gid
   */
  getAttemptByUIdAndGId(uid: string, gid: string) {
    return this.db
      .collection<Attempt>('attempts', (ref) =>
        ref.where('uid', '==', uid).where('gid', '==', gid)
      )
      .valueChanges();
  }

  /**
   * Get attempts by user id
   * @param uid user id
   * @returns Observable with attempts by uid
   */
  getAttemptsByUId(uid: string) {
    return this.db
      .collection<Attempt>('attempts', (ref) => ref.where('uid', '==', uid))
      .valueChanges();
  }

  /**
   * Calculate the points of the user
   * @param solution  Solution of the game
   * @param solutionUser Solution of the user
   * @param points Total Points of the game
   * @returns points have got the user;
   */
  points(solution: number, solutionUser: number, points: number) {
    let adjacentBefore = solution - 5;
    let adjacentAfter = solution + 5;

    if (solutionUser == solution) {
      return points;
    }

    if (solutionUser >= adjacentBefore && solutionUser <= adjacentAfter) {
      return points / 2;
    }

    return 0;
  }
}
