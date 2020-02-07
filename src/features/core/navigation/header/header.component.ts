import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'sc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() public user: any;
  @Output() public sidenavToggle = new EventEmitter();
  @Output() public signOut = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  public logOut(): void {
    this.signOut.emit();
  }
}
