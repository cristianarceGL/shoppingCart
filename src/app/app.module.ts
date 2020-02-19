import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthModule } from '@app/features/auth';
import { AppComponent } from '@app/app.component';
import { environment } from '@enviroments/environment';
import { AppRoutingModule } from '@app/app-routing.module';
import { LayoutModule } from '@app/features/core/layout/layout.module';
import { NotificationModule } from '@app/features/core/notifications/notification.module';
import { NavRoutingStoreModule } from '@app/features/core/nav-routing/+state/+nav-routing-store.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    LayoutModule,
    NotificationModule,
    NavRoutingStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !environment.production, // Restrict extension to log-only mode
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
