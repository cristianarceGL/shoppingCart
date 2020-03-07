import { Component } from '@angular/core';

@Component({
  selector: 'sc-root',
  template: `
    <sc-layout>
      <div class="content"><span>Gorilla Shopping Cart app is running!</span></div>
      <router-outlet></router-outlet>
    </sc-layout>
  `,
  styles: [''],
})
export class AppComponent {
  public title = 'sc-admin-site';
}
