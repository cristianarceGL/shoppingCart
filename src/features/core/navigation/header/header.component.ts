import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'sc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() public user: any;
  @Output() public signOut = new EventEmitter<void>();

  public logOut(): void {
    this.signOut.emit();
  }
}
