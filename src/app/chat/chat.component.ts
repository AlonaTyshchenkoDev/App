import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public form: FormGroup = this.formBuilder.group({
    message:['', Validators.required]
  });
  public messages: string[] = [''];

  constructor(
    private wsService: WebSocketService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void{
    this.wsService.connect();
  }

  send(): void{
    const mess = this.form.get('message')?.value;
    this.wsService.socket$.next(mess);
    this.wsService.socket$.subscribe(
      res => {
        this.messages.push(res.data)
      },
      error => console.log(error)
    )
  }
}
