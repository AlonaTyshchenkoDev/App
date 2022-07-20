import { ElementRef, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BodyThemeService {

  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2
  ) {this.renderer = this.rendererFactory.createRenderer(null, null);}

  toggle(el: ElementRef,theme: string): void{
    this.renderer.setAttribute(el,'style', theme);
  }
}
