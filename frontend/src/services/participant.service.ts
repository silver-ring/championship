import {Injectable, Injector} from '@angular/core';
import {RestService} from '@lagoshny/ngx-hal-client';
import {ParticipantResource} from '../resources/participant.resource';

@Injectable()
export class ParticipantService extends RestService<ParticipantResource> {

  constructor(injector: Injector) {
    super(ParticipantResource, 'participants', injector);
  }

}
