import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'sc-header',
  template: `
    <mat-toolbar class="mat-header">
      <div><img src="assets/GL-Logo.png" /></div>
      <span class="nav-tool-items">
        <!-- <a *ngIf="user" mat-button id="username">{{user?.email}}</a> -->
        <a *ngIf="user" mat-button>Cart(0)</a>
        <a *ngIf="user" mat-button (click)="logOut()" class="logout">Log out</a>
      </span>
    </mat-toolbar>
  `,
  styles: [''],
})
export class HeaderComponent {
  @Input() public user: any;
  @Output() public signOut = new EventEmitter<void>();

  public logOut(): void {
    this.signOut.emit();
  }
}
