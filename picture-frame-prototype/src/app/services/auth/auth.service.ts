import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { delay, retryWhen, take } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { BehaviorSubject, Observable } from 'rxjs';

const TOKEN_KEY = 'token';
const USERID_KEY = 'id';
const USERNAME_KEY = 'username';
const LOCATION_KEY = 'frameLocation';

interface LogInResponse {
  id: string;
  username: string;
  actiave: string;
}


export interface UserSetupResponse {
  action: string;
  frame_location: string;
  id: string;
  model: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _authenticated = false;
  token: string = null;
  username: string = null;
  frameLocation: string = null;
  id: string = null;

  authenticated_subject = new BehaviorSubject<boolean>(false);

  jsonSubject: WebSocketSubject<unknown>;

  constructor(
    private http: HttpClient
  ) {
    this.checkLocalStorage();
  }

  get authorized$(): Observable<boolean> {
    return this.authenticated_subject.asObservable();
  }

  isAuthenticated() {
    this._authenticated = !!this.token && !!this.username && !!this.id;
    this.authenticated_subject.next(this._authenticated);
  }

  checkLocalStorage() {
    console.log('Checking Local Storage');
    this.token = localStorage.getItem(TOKEN_KEY);
    this.id = localStorage.getItem(USERID_KEY);
    this.username = localStorage.getItem(USERNAME_KEY);
    this.frameLocation = localStorage.getItem(LOCATION_KEY);
    this.isAuthenticated();
  }

  private setLocalStorage() {
    localStorage.setItem(TOKEN_KEY, this.token);
    localStorage.setItem(USERID_KEY, this.id);
    localStorage.setItem(USERNAME_KEY, this.username);
    localStorage.setItem(LOCATION_KEY, this.frameLocation);
  }

  private setAuthorization(id, username, token, frameLocation) {
    this.token = token;
    this.username = username;
    this.frameLocation = frameLocation;
    this.id = id;
    this.setLocalStorage();
    this.isAuthenticated();
  }

  async login() {
    console.log('Logging in');
    const response = await this.http.post<LogInResponse>(
      `${environment.apiUrl}/api/v1/frames/`,
      {}
    ).pipe(take(1)).toPromise();
    
    this.username = response.username;
    this.id = response.id;
    localStorage.setItem(USERID_KEY, this.id);
    localStorage.setItem(USERNAME_KEY, this.username);
    this.frameSetup();
    return this.username;
  }

  frameSetup() {
    this.jsonSubject = webSocket({
      url: 'ws://192.168.1.114:8000/ws/frames/',
      openObserver: {
        next: () => {
          console.log('Connected to websocket');
        }
      },
    });

    this.jsonSubject.pipe(
      // If we are disconnected, wait 5000ms before attempting to reconnect.
      retryWhen((err) => {
        console.log("Disconnected!  Attempting reconnection shortly...");
        return err.pipe(delay(5000));
      })
    ).subscribe(
      // Once we receieve a message from the server, put the message in our
      // alert div, and the raw response in the raw-data div.
      (resp: UserSetupResponse) => {
        this.setAuthorization(
          resp.id,
          this.username,
          resp.token,
          resp.frame_location
        );
      },
    );
  }
}
