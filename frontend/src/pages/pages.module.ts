import { NgModule } from '@angular/core';

import {ParticipantsComponent} from './participants/participants.component';
import {PagesRoutingModule} from './pages.routing.module';
import {CommonModule} from '@angular/common';
import {ElementsModule} from '../elements/elements.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatchesBoardComponent} from './matches-board/matches-board.component';
import {MatchInfoComponent} from './matches-board/match-info/match-info.component';
import {AnnounceChampionComponent} from './announce-champion/announce-champion.component';

@NgModule({
  declarations: [
    ParticipantsComponent,
    MatchesBoardComponent,
    MatchInfoComponent,
    AnnounceChampionComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ElementsModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class PagesModule { }
