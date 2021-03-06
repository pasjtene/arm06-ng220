import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hello-angular',
  template: `
  <p>Hello, {{ who }}</p>
  <button (click)="sayHello()">Say Hello</button>
  `,

})

export class HelloAngular2 {
  @Input() who: string;
  @Output() onSayHello: EventEmitter<any> = new EventEmitter();

  sayHello() {
    this.onSayHello.emit(`hello, ${this.who}`);
  }
}
