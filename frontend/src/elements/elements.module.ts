import { NgModule } from '@angular/core';

import {DataTableComponent} from './data-table/data-table.component';
import {CommonModule} from '@angular/common';
import {ModelComponent} from './model/model.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    DataTableComponent,
    ModelComponent
  ],
  exports: [
    DataTableComponent,
    ModelComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: []
})
export class ElementsModule { }
