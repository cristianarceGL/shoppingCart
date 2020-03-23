import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { action } from '@storybook/addon-actions';
import { moduleMetadata } from '@storybook/angular';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '@app/shared/material';
import { LoginFormComponent } from '@app/features/authentication/login-form/login-form.component';

export default {
  title: 'Login Form',
  excludeStories: /.*Data$/,
  decorators: [
    moduleMetadata({
      declarations: [LoginFormComponent],
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        RouterModule,
        HttpClientModule,
        ReactiveFormsModule,
        MaterialModule,
      ],
    }),
  ],
};

export const actionsData = {
  login: action('Sign In action!'),
};

export const loginFormData = {
  emailData: new FormControl('joe.doe@gorilla.com', [Validators.required, Validators.email]),
  passwordData: new FormControl('Pass123456', [Validators.required, Validators.email]),
};

export const Default = () => ({
  component: LoginFormComponent,
  props: {
    loginFormSubmit: actionsData.login,
  },
});

export const WithEmailAndPassword = () => ({
  component: LoginFormComponent,
  props: {
    emailFormControl: loginFormData.emailData,
    passwordFormControl: loginFormData.passwordData,
    loginFormSubmit: actionsData.login,
  },
});
