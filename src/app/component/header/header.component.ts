import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() isBackButton = true;
  @Input() headerTpl
  @Input() style = {
    'display': 'flex',
    'align-items': 'center',
    'justify-content': 'space-between'
  }

  constructor(
    public location: Location
  ) { }

  back() {
    this.location.back();
  }
}
