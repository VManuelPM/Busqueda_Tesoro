import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyGamesPageRoutingModule } from './my-games-routing.module';

import { MyGamesPage } from './my-games.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyGamesPageRoutingModule
  ],
  declarations: [MyGamesPage]
})
export class MyGamesPageModule {}
