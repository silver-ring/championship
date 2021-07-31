import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ExternalConfiguration,
  ExternalConfigurationHandlerInterface
} from '@lagoshny/ngx-hal-client';

@Injectable()
export class ExternalConfigurationService implements ExternalConfigurationHandlerInterface {

  getProxyUri(): string {
    return '';
  }

  getRootUri(): string {
    return `api/`;
  }

  getHttp(): HttpClient {
    return this.http;
  }

  constructor(private http: HttpClient) {}

  getExternalConfiguration(): ExternalConfiguration {
    return {};
  }

  setExternalConfiguration(): any {}

  deserialize(): any {}

  serialize(): any {}
}
