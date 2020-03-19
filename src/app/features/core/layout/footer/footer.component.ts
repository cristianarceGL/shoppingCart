import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'sc-footer',
  template: `
    <mat-toolbar class="mat-footer">
      <div>
        <img src="assets/GL-Logo.png" />
        <p>TERMS OF USE | PRIVACY POLICY | CREDITS</p>
      </div>
    </mat-toolbar>
  `,
  styles: [
    `
      p {
        color: white;
        font-size: 10px;
      }
      .mat-footer {
        color: white;
        text-align: center;
      }
    `,
  ],
})
export class FooterComponent {
  @Input() public user: any;
  @Output() public signOut = new EventEmitter<void>();

  public logOut(): void {
    this.signOut.emit();
  }
}
