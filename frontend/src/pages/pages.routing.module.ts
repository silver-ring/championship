import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../pages/participants/participants.module').then(m => m.ParticipantsModule)},
  {
    path: 'matches-board',
    loadChildren: () => import('../pages/matches-board/matches-board.module').then(m => m.MatchesBoardModule)
  },
  {
    path: 'announce-champion',
    loadChildren: () => import('../pages/announce-champion/announce-champion.module').then(m => m.AnnounceChampionModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
