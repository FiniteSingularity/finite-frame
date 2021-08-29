import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { delay, retryWhen } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api.service';
import { AuthService } from '../auth/auth.service';

export interface FrameStateResponse {
  model: string;
  view: string;
  id: number;
  frame_id: string;
  gallery: number;
}

export interface FrameState {
  view: string;
  id: number;
  frameId: string;
  gallery: number;
}

@Injectable({
  providedIn: 'root'
})
export class FrameStateService {
  jsonSubject: WebSocketSubject<unknown>;
  subs = new Subscription();
  token: string;

  view: string;
  id: number;
  frameId: string;
  gallery: number;

  frameState = new BehaviorSubject<FrameState>(
    {
      view: null,
      id: null,
      frameId: null,
      gallery: null,
    }
  );

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private http: HttpClient
  ) {
    this.setupSubscriptions();
  }

  get frameState$(): Observable<FrameState> {
    return this.frameState.asObservable();
  }

  state$(id: string): Observable<FrameState> {
    return this.http.get<FrameState>(
      `${this.api.url}/frames/states/${id}/`
    );
  }

  private updateFrameState() {
    this.frameState.next({
      view: this.view,
      id: this.id,
      frameId: this.frameId,
      gallery: this.gallery,
    });
  }

  setupSubscriptions() {
    console.log('setup subs');
    this.auth.authorized$.subscribe((authorized) => {
      if(authorized) {
        this.token = this.auth.token;
        this.openWebSocket();
      }
    })
  }

  openWebSocket() {
    console.log("Open Websocket");
    this.jsonSubject = webSocket({
      url: `${environment.wsUrl}/ws/frames/state/`,
      openObserver: {
        next: () => {
          console.log('Connected to websocket');
          this.jsonSubject.next({token: this.token});
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
      (resp: FrameStateResponse) => {
        console.log(resp);
        this.view = resp.view;
        this.frameId = resp.frame_id;
        this.id = resp.id;
        this.gallery = resp.gallery;
        this.updateFrameState()
      },
    );
  }
}
