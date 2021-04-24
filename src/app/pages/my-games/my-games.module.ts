import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyGamesPageRoutingModule } from './my-games-routing.module';

import { MyGamesPage } from './my-games.page';
import { HeaderComponent } from '../../components/header/header.component';
import { GameCardComponent } from '../../components/game-card/game-card.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MyGamesPageRoutingModule],
  declarations: [MyGamesPage, HeaderComponent, GameCardComponent],
})
export class MyGamesPageModule {}
