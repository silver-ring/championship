import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChampionshipService} from '../../services/championship.service';
import {MatchService} from '../../services/match.service';
import {RouterModule, Routes} from '@angular/router';
import {MatchesBoardComponent} from './matches-board.component';
import {MatchInfoComponent} from './match-info/match-info.component';

const routes: Routes = [
  {
    path: '',
    component: MatchesBoardComponent
  }
];

@NgModule({
  declarations: [
    MatchInfoComponent,
    MatchesBoardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [ChampionshipService, MatchService]
})
export class MatchesBoardModule {
}
