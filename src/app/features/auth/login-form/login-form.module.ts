import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/shared/shared.module';
import { LoginFormComponent } from './login-form.component';

const modules = [CommonModule, RouterModule, HttpClientModule, ReactiveFormsModule, MaterialModule];

@NgModule({
  declarations: [LoginFormComponent],
  imports: [modules],
  exports: [LoginFormComponent],
})
export class LogInFormModule {}
