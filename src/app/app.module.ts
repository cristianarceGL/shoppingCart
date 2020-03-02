import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthModule } from '@app/features/auth';
import { AppComponent } from '@app/app.component';
import { envModules } from '@enviroments/environment';
import { AppRoutingModule } from '@app/app-routing.module';
import { LayoutModule } from '@app/features/core/layout/layout.module';
import { NotificationModule } from '@app/features/core/notifications/notification.module';
import { RoutingStoreModule } from '@app/features/core/store/routing/routing-store.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    LayoutModule,
    NotificationModule,
    RoutingStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    envModules,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
