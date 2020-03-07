import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'sc-footer',
  template: `
    <mat-toolbar class="mat-footer">
      <div><img src="assets/GL-Logo.png" /></div>
    </mat-toolbar>
  `,
  styles: [''],
})
export class FooterComponent {
  @Input() public user: any;
  @Output() public signOut = new EventEmitter<void>();

  public logOut(): void {
    this.signOut.emit();
  }
}
