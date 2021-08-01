import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {takeLast} from 'rxjs/operators';
import {MatchService} from '../../../services/match.service';
import {MatchResource} from '../../../resources/match.resource';
import {ParticipantResource} from '../../../resources/participant.resource';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-match-info',
  templateUrl: './match-info.component.html',
  styleUrls: ['./match-info.component.scss'],
  providers: [MatchService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchInfoComponent implements OnInit {

  @Input()
  match: MatchResource | null = null;

  constructor(private matchService: MatchService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    forkJoin([
      this.match?.getRelation(ParticipantResource, 'participant1'),
      this.match?.getRelation(ParticipantResource, 'participant2')
    ]).subscribe((participantResources: ParticipantResource[]) => {
      if (this.match) {
        this.match.participant1 = participantResources[0];
        this.match.participant2 = participantResources[1];
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  addScore(participantId: number | null | undefined): void {
    if (this.match) {
      const participantScore = this.match.participant1?.id === participantId ? 'participant1Score' : 'participant2Score';
      this.match[participantScore] = (this.match[participantScore] || 0) + 1;
      this.matchService.update(this.match).pipe(takeLast(1)).subscribe();
    }
  }

  minusScore(participantId: number | null | undefined): void {
    if (this.match) {
      const participantScore = this.match?.participant1?.id === participantId ? 'participant1Score' : 'participant2Score';
      if ((this.match[participantScore] || 0) > 0) {
        this.match[participantScore] = (this.match[participantScore] || 0) - 1;
        this.matchService.update(this.match).pipe(takeLast(1)).subscribe();
      }
    }
  }

}
