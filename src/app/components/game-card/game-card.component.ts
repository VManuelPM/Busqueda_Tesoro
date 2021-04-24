import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';
import { User } from '../../models/user';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements OnInit {
  @Input() gameObject: Game;
  @Input() user: User;

  constructor() {}

  ngOnInit() {}
}
