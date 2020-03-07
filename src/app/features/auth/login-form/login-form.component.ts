import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Authenticate } from '@app/features/auth/models';
import { MyErrorStateMatcher } from '../../core/utils/error-state-matcher';

@Component({
  selector: 'sc-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Output() public loginFormSubmit = new EventEmitter<Authenticate>();

  public emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  public passwordFormControl = new FormControl('', [Validators.required]);
  public matcher = new MyErrorStateMatcher();
  public loginForm = new FormGroup({
    username: this.emailFormControl,
    password: this.passwordFormControl,
  });

  public login(): void {
    this.loginFormSubmit.emit({
      email: this.loginForm.value.username,
      password: this.loginForm.value.password,
    } as Authenticate);
  }
}
