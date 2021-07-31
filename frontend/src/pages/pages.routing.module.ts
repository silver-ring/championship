import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParticipantsComponent } from './participants/participants.component';
import {MatchesBoardComponent} from './matches-board/matches-board.component';
import {AnnounceChampionComponent} from './announce-champion/announce-champion.component';

export const routes: Routes = [
  { path: '', component: ParticipantsComponent },
  { path: 'matches-board', component: MatchesBoardComponent },
  { path: 'announce-champion', component: AnnounceChampionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
