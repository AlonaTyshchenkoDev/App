import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WebSocketService } from '../services/web-socket.service';
import { BodyThemeService } from '../services/body-theme.service';
import { DarkTheme, LightTheme } from '../services/constans';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  @ViewChild("stylesContainer") public wrapper: ElementRef;
  @ViewChild("navbar") public navbar: ElementRef;

  public messages: string[] = [''];
  public theme: BehaviorSubject<string> = new BehaviorSubject<string>('Dark Theme');
  public form: FormGroup = this.formBuilder.group({
    message:['', Validators.required]
  });

  constructor(
    private wsService: WebSocketService,
    private formBuilder: FormBuilder,
    private themeService: BodyThemeService,
    ) {
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

  change(event: any, el:ElementRef): void{
    if(event.target.checked){
      this.themeService.toggle(el.nativeElement, DarkTheme);
      this.theme.next('Light Theme')
    } else{
      this.themeService.toggle(el.nativeElement, LightTheme);
      this.theme.next('Dark Theme');
    }
  }
}
