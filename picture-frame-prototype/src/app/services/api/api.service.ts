import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = null;
  private baseWsUrl: string = null;
  private pathPrefix = '/api/v1';
  private wsPathPrefix = '/websockets';

  constructor() {
    this.baseUrl = environment.apiUrl;
  }

  get url(): string {
    return `${this.baseUrl}${this.pathPrefix}`;
  }

  set url(url: string) {
    this.baseUrl = url;
  }

  // get wsUrl(): string {
  //   return `${this.baseWsUrl}${this.wsPathPrefix}`;
  // }

  // set wsUrl(url: string) {
  //   this.baseWsUrl = url;
  // }
}
