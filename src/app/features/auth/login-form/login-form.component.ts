import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Authenticate } from '@app/features/auth/models';
@Component({
  selector: 'sc-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Output() public loginFormSubmit = new EventEmitter<Authenticate>();

  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  public login(): void {
    this.loginFormSubmit.emit({
      email: this.loginForm.value.username,
      password: this.loginForm.value.password,
    } as Authenticate);
  }
}
