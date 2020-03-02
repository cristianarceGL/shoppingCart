import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '@app/shared/shared.module';
import { AuthComponent } from '@app/features/auth/auth.component';
import { AuthRoutingModule } from '@app/features/auth/auth-routing.module';
import { FirebaseModule } from '@app/features/core/firebase/firebase.module';
import { AuthStoreModule } from '@app/features/auth/+state/+auth-store.module';
import { LogInFormModule } from '@app/features/auth/login-form/login-form.module';

const modules = [
  CommonModule,
  AuthRoutingModule,
  RouterModule,
  HttpClientModule,
  MaterialModule,
  ReactiveFormsModule,
  AuthStoreModule,
  FirebaseModule,
  LogInFormModule,
];

@NgModule({
  imports: [...modules],
  declarations: [AuthComponent],
})
export class AuthModule {}
