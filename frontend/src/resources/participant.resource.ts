import {Resource} from '@lagoshny/ngx-hal-client';

export class ParticipantResource extends Resource {
  id: number | null = null;
  name: string | null = null;
  deleted: boolean | null = null;
}
