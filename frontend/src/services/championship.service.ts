import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export type Winner = {
  id: number;
  name: string;
};

@Injectable()
export class ChampionshipService {

  constructor(private httpClient: HttpClient) {

  }

  startChampionship(numberOfGroups: number): Observable<void> {
    return this.httpClient.post<void>('/api/championship/start', {
      numberOfGroups
    });
  }

  closeRound(): Observable<null | Winner> {
    return this.httpClient.post<null | Winner>('/api/championship/close', {});
  }

}
