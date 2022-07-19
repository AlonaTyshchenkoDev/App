import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';

export const url: string = 'ws://localhost:8999'

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  public socket$!: WebSocketSubject<any>;

  connect(): Observable<any>{
    return this.socket$ =  new WebSocketSubject({url:url,deserializer: msg => msg});
  }
}
