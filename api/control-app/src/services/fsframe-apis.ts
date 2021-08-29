import { lastValueFrom } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import baseUrl from './base-api-url';

type QueryParams = Record<
  string,
  string | number | boolean | string[] | number[] | boolean[]
>;

class BaseApiService {
  basePath = '';

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  get token() {
    const token = localStorage.getItem('token');
    if (token === null) {
      throw new Error('No token currently exists.  You must authorize.');
    }
    return token;
  }

  get authHeader(): Readonly<Record<string, any>> {
    return {
      Authorization: `Token ${this.token}`,
    };
  }

  get<T = any>(endpoint: string, queryParams: QueryParams = {}): Promise<T> {
    const queryStr =
      queryParams === {}
        ? ''
        : '?' +
          Object.keys(queryParams)
            .map((key) => `${key}=${queryParams[key]}`)
            .join('&');
    const url = `${baseUrl}${this.basePath}${endpoint}${queryStr}`;
    const request = ajax<T>({
      url,
      method: 'GET',
      headers: this.authHeader,
    }).pipe(map((res) => res.response));
    return lastValueFrom(request);
  }

  post<T = any>(endpoint: string, payload: any): Promise<T> {
    const url = `${baseUrl}${this.basePath}${endpoint}`;
    const request = ajax<T>({
      url,
      method: 'post',
      headers: this.authHeader,
      body: payload,
    }).pipe(map((res) => res.response));
    return lastValueFrom(request);
  }

  put<T = any>(endpoint: string, payload: any): Promise<T | undefined> {
    const url = `${baseUrl}${this.basePath}${endpoint}`;
    const request = ajax<T>({
      url,
      method: 'PUT',
      headers: this.authHeader,
      body: payload,
    }).pipe(map((res) => res.response));
    return lastValueFrom(request);
  }

  patch<T = any>(endpoint: string, payload: any): Promise<T | undefined> {
    const url = `${baseUrl}${this.basePath}${endpoint}`;
    const request = ajax<T>({
      url,
      method: 'PATCH',
      headers: this.authHeader,
      body: payload,
    }).pipe(map((res) => res.response));
    return lastValueFrom(request);
  }

  delete(endpoint: string): Promise<void> {
    const url = `${baseUrl}${this.basePath}${endpoint}`;
    const request = ajax<void>({
      url,
      method: 'DELETE',
      headers: this.authHeader,
    }).pipe(map((res) => { return; }));
    return lastValueFrom(request);
  }
}

class FsFrameApiService extends BaseApiService {
  constructor() {
    super('/api/v1/');
  }
}

const $api = new FsFrameApiService();
export default $api;
