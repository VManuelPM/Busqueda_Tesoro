import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamesPageRoutingModule } from './games-routing.module';

import { GamesPage } from './games.page';
import { GameCardComponent } from '../../components/game-card/game-card.component';
import { HeaderComponent } from '../../components/header/header.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, GamesPageRoutingModule],
  declarations: [GamesPage, HeaderComponent, GameCardComponent],
})
export class GamesPageModule {}
