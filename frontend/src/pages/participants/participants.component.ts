import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TableHeader, TableRawAction, TableRow} from '../../elements/data-table/data-table.component';
import {ParticipantService} from '../../services/participant.service';
import {ParticipantResource} from '../../resources/participant.resource';
import {FormField} from '../../elements/model/model.component';
import {take} from 'rxjs/operators';
import {ChampionshipService} from '../../services/championship.service';
import {Router} from '@angular/router';
import {MatchService} from '../../services/match.service';

@Component({
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss'],
  providers: [ParticipantService, ChampionshipService, MatchService]
})
export class ParticipantsComponent implements OnInit {
  showParticipantForm = false;
  showGroupsForm = false;
  showContinueChampionship = false;
  headers: TableHeader[] = [{index: 0, name: 'Id', flex: 1}, {index: 1, name: 'Participant', flex: 4}
    , {index: 2, name: 'Actions', flex: 1}];
  data: TableRow[][] = [];
  actions: TableRawAction[][] = [];
  participantFormFields: Map<string, FormField> = new Map<string, FormField>();
  groupsFormFields: Map<string, FormField> = new Map<string, FormField>();

  constructor(private participantService: ParticipantService,
              private championshipService: ChampionshipService,
              private matchService: MatchService,
              private changeDetector: ChangeDetectorRef,
              private router: Router) {
  }

  ngOnInit(): void {
    this.participantFormFields.set('name', {label: 'Participant Name', value: ''});
    this.groupsFormFields.set('groups', {label: 'Number Of Groups', value: ''});
    this.matchService.count('countAllByRoundClosedIsFalse').subscribe((count) => {
      this.showContinueChampionship = count > 0;
    });
    this.loadParticipants();
  }

  loadParticipants(): void {
    this.participantService.search('findAllByDeletedIsFalse').pipe(take(1))
      .subscribe(participants => {
        this.data = participants.map(participant => ([{index: 0, value: participant.id?.toString() ?? ''},
          {index: 1, value: participant.name ?? ''}]));
        this.actions = participants.map(participant => ([{
          index: 2, label: 'Delete', actions: () => {
            participant.deleted = true;
            this.participantService.update(participant).pipe(take(1)).subscribe(() => {
              this.loadParticipants();
              this.changeDetector.markForCheck();
            });
          }
        }]));
        this.changeDetector.markForCheck();
      });
  }

  continueChampionship(): void {
    this.router.navigate(['matches-board']);
  }

  saveParticipant(formFields: Map<string, FormField>): void {
    const participantName = formFields.get('name')?.value;
    if (participantName) {
      const participant = new ParticipantResource();
      participant.name = participantName;
      participant.deleted = false;
      this.participantService.create(participant).pipe(take(1))
        .subscribe(() => {
          this.showParticipantForm = false;
          this.loadParticipants();
        });
    } else {
      alert('Participant Name is required');
    }
  }

  submitStartChampionShip(formFields: Map<string, FormField>): void {
    const numberOfGroups = formFields.get('groups')?.value;
    if (numberOfGroups) {
      this.championshipService.startChampionship(parseInt(numberOfGroups, 0)).pipe(take(1))
        .subscribe(() => {
          this.showGroupsForm = false;
          this.router.navigate(['matches-board']);
        }, (response) => {
          alert(response.error.message);
        });
    } else {
      alert('Number Of Groups is required');
    }
  }

}
