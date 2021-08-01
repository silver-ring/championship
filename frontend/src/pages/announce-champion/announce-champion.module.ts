import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AnnounceChampionComponent} from './announce-champion.component';

const routes: Routes = [
  {
    path: '',
    component: AnnounceChampionComponent
  }
];

@NgModule({
  declarations: [
    AnnounceChampionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: []
})
export class AnnounceChampionModule {
}
