import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatchService} from '../../services/match.service';
import {MatchResource} from '../../resources/match.resource';
import {ChampionshipService} from '../../services/championship.service';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';

@Component({
  templateUrl: './matches-board.component.html',
  styleUrls: ['./matches-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchesBoardComponent implements OnInit {

  matchesMap: Map<number, MatchResource[]> = new Map<number, MatchResource[]>();

  constructor(private matchService: MatchService,
              private championshipService: ChampionshipService,
              private router: Router,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loadMatches();
  }

  participantsList(): void {
    this.router.navigate(['']);
  }

  closeRound(): void {
    this.championshipService.closeRound().subscribe((winner) => {
      if (winner) {
        this.router.navigate(['announce-champion'], {
          queryParams: {
            winnerId: winner.id,
            winnerName: winner.name
          }
        });
      } else {
        this.loadMatches();
      }
    }, response => {
      alert(response.error.message);
    });
  }

  loadMatches(): void {
    this.matchService.search('findAllByRoundClosedIsFalse').pipe(take(1))
      .subscribe(async (matches: MatchResource[]) => {
      if (matches.length === 0) {
        this.router.navigate(['']);
      } else {
        this.matchesMap = matches.reduce((matchesMap: Map<number, MatchResource[]>, match: MatchResource) => {
          if (!matchesMap.has(match.group || 0)) {
            matchesMap.set(match.group || 0, []);
          }
          matchesMap.get(match.group || 0)?.push(match);
          return matchesMap;
        }, new Map<number, MatchResource[]>());
        this.changeDetectorRef.markForCheck();
      }
    });
  }

}
