import {ComponentFixtureAutoDetect, TestBed, waitForAsync} from '@angular/core/testing';
import {MatchService} from '../../services/match.service';
import {of} from 'rxjs';
import {ExternalConfigurationService} from '../../services/external-configuration.service';
import {NgxHalClientModule} from '@lagoshny/ngx-hal-client';
import {RouterTestingModule} from '@angular/router/testing';
import {ParticipantsComponent} from './participants.component';
import {ParticipantResource} from '../../resources/participant.resource';
import {ParticipantService} from '../../services/participant.service';
import {Chance} from 'chance';
import {routes} from '../pages.routing.module';
import {Router} from '@angular/router';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

const chance = new Chance();

describe('ParticipantsComponent', () => {
  const participant1 = new ParticipantResource();
  const participant2 = new ParticipantResource();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxHalClientModule,
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        ParticipantsComponent
      ],
      providers: [
        {provide: ComponentFixtureAutoDetect, useValue: true},
        {provide: 'ExternalConfigurationService', useClass: ExternalConfigurationService}
      ]
    });

    participant1.id = chance.integer();
    participant1.name = chance.name();
    participant1.deleted = false;
    participant2.id = chance.integer();
    participant2.name = chance.name();
    participant2.deleted = false;
    const participantService = jasmine.createSpyObj('participantService', ['search']);
    const participants = [participant1, participant2];
    participantService.search.withArgs('findAllByDeletedIsFalse').and.returnValue(of(participants));
    TestBed.overrideProvider(ParticipantService, {useValue: participantService});

    const matchService = jasmine.createSpyObj('matchService', ['count']);
    matchService.count.withArgs('countAllByRoundClosedIsFalse').and.returnValue(of(0));
    TestBed.overrideProvider(MatchService, {useValue: matchService});
  });

  it('should load participants', waitForAsync(() => {
    const fixture = TestBed.createComponent(ParticipantsComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    expect(app.data).toEqual([
      [{index: 0, value: participant1?.id?.toString() || ''}, {index: 1, value: participant1.name || ''}],
      [{index: 0, value: participant2?.id?.toString() || ''}, {index: 1, value: participant2.name || ''}]]
    );
  }));

  it('should show continue championship', () => {
    const fixture = TestBed.createComponent(ParticipantsComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    expect(app.showContinueChampionship).toBeFalsy();
  });

  it('should not show continue championship', () => {
    const matchService = jasmine.createSpyObj('matchService', ['count']);
    matchService.count.withArgs('countAllByRoundClosedIsFalse').and.returnValue(of(1));
    TestBed.overrideProvider(MatchService, {useValue: matchService});
    const fixture = TestBed.createComponent(ParticipantsComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    expect(app.showContinueChampionship).toBeTruthy();
  });

  it('should route to continue championship', () => {
    const matchService = jasmine.createSpyObj('matchService', ['count']);
    matchService.count.withArgs('countAllByRoundClosedIsFalse').and.returnValue(of(1));
    TestBed.overrideProvider(MatchService, {useValue: matchService});

    const route = jasmine.createSpyObj('route', ['navigate']);
    TestBed.overrideProvider(Router, {useValue: route});

    const fixture = TestBed.createComponent(ParticipantsComponent);
    const app = fixture.componentInstance;
    app.continueChampionship();
    expect(app.showContinueChampionship).toBeTruthy();
    expect(route.navigate).toHaveBeenCalledWith(['matches-board']);
  });

  it('should show ', () => {
    const fixture = TestBed.createComponent(ParticipantsComponent);
    const app = fixture.componentInstance;

    const bannerDe: DebugElement = fixture.debugElement;
    const actionsButtons: HTMLElement = bannerDe.query(By.css('.submit-participant-request')).nativeElement;
    actionsButtons.click();
    expect(app.showParticipantForm).toBeTruthy();
  });

});
