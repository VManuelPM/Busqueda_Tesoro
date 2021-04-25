import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttemptPageRoutingModule } from './attempt-routing.module';

import { AttemptPage } from './attempt.page';
import { HeaderComponent } from '../../components/header/header.component';
import { GameCardComponent } from '../../components/game-card/game-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttemptPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AttemptPage, HeaderComponent, GameCardComponent],
})
export class AttemptPageModule {}
