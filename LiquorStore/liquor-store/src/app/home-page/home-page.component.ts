import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  animations: [
    trigger('animate', [
      state('initial', style({
        opacity: 0
      })),
      state('final', style({
        opacity: 1
      })),
      transition('initial=>final', animate('500ms ease-in')),
    ]),
  ]
})
export class HomePageComponent implements OnInit {
  currentState: string = 'initial';

  constructor() { }

  ngOnInit() {
    if (this.currentState = "initial") {
      setTimeout(() => {
        this.currentState = 'final';
      });
    }
  }
}
