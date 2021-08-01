import {NgModule} from '@angular/core';
import {ParticipantsComponent} from './participants.component';
import {CommonModule} from '@angular/common';
import {ElementsModule} from '../../elements/elements.module';
import {ParticipantService} from '../../services/participant.service';
import {ChampionshipService} from '../../services/championship.service';
import {MatchService} from '../../services/match.service';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ParticipantsComponent
  }
];

@NgModule({
  declarations: [
    ParticipantsComponent
  ],
  imports: [
    CommonModule,
    ElementsModule,
    RouterModule.forChild(routes)
  ],
  providers: [ParticipantService, ChampionshipService, MatchService]
})
export class ParticipantsModule {
}
