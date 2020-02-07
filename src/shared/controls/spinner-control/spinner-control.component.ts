import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'sc-spinner-control',
  templateUrl: './spinner-control.component.html',
  styleUrls: ['./spinner-control.component.scss'],
})
export class SpinnerControlComponent {
  @Input() public applyFullStyle = true;
}
