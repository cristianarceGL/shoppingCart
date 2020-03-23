import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Authenticate } from '@app/features/authentication/models';
import { CustomErrorStateMatcher } from '@app/features/core/utils/error-state-matcher';

@Component({
  selector: 'sc-login-form',
  template: `
    <div class="login-wrapper" fxLayout="row" fxLayoutAlign="center center">
      <mat-card class="container">
        <form class="login-form" [formGroup]="loginForm">
          <mat-card-content>
            <mat-form-field class="login-full-width">
              <mat-label>Email</mat-label>
              <input
                matInput
                [formControl]="emailFormControl"
                [errorStateMatcher]="matcher"
                data-cy="email"
                placeholder="Ex. user.test@gorillalogic.com"
                type="text"
              />
              <mat-error *ngIf="emailFormControl.hasError('email') && !emailFormControl.hasError('required')">
                Please enter a valid email address
              </mat-error>
              <mat-error *ngIf="emailFormControl.hasError('required')"> Email is <strong>required</strong> </mat-error>
            </mat-form-field>
            <mat-form-field class="login-full-width">
              <mat-label>Password</mat-label>
              <input
                matInput
                [formControl]="passwordFormControl"
                [errorStateMatcher]="matcher"
                data-cy="password"
                type="password"
              />
              <mat-error *ngIf="passwordFormControl.hasError('required')">
                Password is <strong>required</strong>
              </mat-error>
            </mat-form-field>
          </mat-card-content>
          <button mat-stroked-button color="primary" class="btn-block" type="button" (click)="login()" data-cy="submit">
            Sign In
          </button>
        </form>
      </mat-card>
    </div>
  `,
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Output() public loginFormSubmit = new EventEmitter<Authenticate>();

  public emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  public passwordFormControl = new FormControl('', [Validators.required]);
  public matcher = new CustomErrorStateMatcher();
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
