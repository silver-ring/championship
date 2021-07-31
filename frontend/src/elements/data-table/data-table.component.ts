import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

export type TableHeader = {
  index: number;
  name: string;
  flex: number;
};

export type TableRow = {
  index: number;
  value: string;
};

export type TableRawAction = {
  index: number;
  label: string;
  actions: () => void;
};

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent implements OnInit {
  @Input()
  headers: TableHeader[] = [];

  @Input()
  data: TableRow[][] = [];

  @Input()
  actions: TableRawAction[][] = [];

  ngOnInit(): void {
    this.headers = this.headers.sort((a, b) => a.index - b.index);
    this.data = this.data.map((row) => row.sort((a, b) => a.index - b.index));
  }

}
