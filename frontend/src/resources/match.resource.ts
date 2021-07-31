import {Resource} from '@lagoshny/ngx-hal-client';
import {ParticipantResource} from './participant.resource';

export class MatchResource extends Resource {
  id: number | null = null;
  participant1: ParticipantResource | null = null;
  participant2: ParticipantResource | null = null;
  participant1Score: number | null = null;
  participant2Score: number | null = null;
  winner: ParticipantResource | null = null;
  group: number | null = null;
  roundClosed: boolean | null = null;
}
