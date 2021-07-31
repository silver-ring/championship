import {Injectable, Injector} from '@angular/core';
import {RestService} from '@lagoshny/ngx-hal-client';
import {MatchResource} from '../resources/match.resource';

@Injectable()
export class MatchService extends RestService<MatchResource> {

  constructor(injector: Injector) {
    super(MatchResource, 'matches', injector);
  }

}
