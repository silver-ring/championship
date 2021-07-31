import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgxHalClientModule} from '@lagoshny/ngx-hal-client';
import {ExternalConfigurationService} from '../services/external-configuration.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxHalClientModule
  ],
  providers: [
    {provide: 'ExternalConfigurationService', useClass: ExternalConfigurationService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
