import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from '@app/app.component';
import { envModules } from '@enviroments/environment';
import { AuthModule } from '@app/features/authentication';
import { AppRoutingModule } from '@app/app-routing.module';
import { LayoutModule } from '@app/features/core/layout/layout.module';
import { RoutingStoreModule } from '@app/features/core/store/routing/routing-store.module';
import { initialReducerMap, getInitialState, metaReducers } from '@app/features/global-state/app.state';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    LayoutModule,
    RoutingStoreModule,
    StoreModule.forRoot(initialReducerMap, { initialState: getInitialState, metaReducers }),
    EffectsModule.forRoot([]),
    envModules,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
