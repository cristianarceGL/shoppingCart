import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'sc-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  @Input() public user: any;
  @Output() public signOut = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  public logOut(): void {
    this.signOut.emit();
  }
}
