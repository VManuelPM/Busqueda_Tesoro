import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Attempt } from '../models/attempt';

@Injectable({
  providedIn: 'root',
})
export class AttemptService {
  constructor(private db: AngularFirestore) {}

  getAttemptByUIdAndGId(uid: string, gid: string) {
    return this.db
      .collection<Attempt>('attempts', (ref) =>
        ref.where('uid', '==', uid).where('gid', '==', gid)
      )
      .valueChanges();
  }

  getAttemptsByUId(uid: string) {
    return this.db
      .collection<Attempt>('attempts', (ref) => ref.where('uid', '==', uid))
      .valueChanges();
  }

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
