import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  templateUrl: './announce-champion.component.html',
  styleUrls: ['./announce-champion.component.scss'],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnnounceChampionComponent implements OnInit {

  winnerId: string | null = null;
  winnerName: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.winnerId = this.route.snapshot.queryParamMap.get('winnerId');
    this.winnerName = this.route.snapshot.queryParamMap.get('winnerName');
    if (!this.winnerId || !this.winnerName) {
      this.router.navigate(['']);
    }
  }

  startOver(): void {
    this.router.navigate(['']);
  }
}
