// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyBFldEwbfLg-hELBIgPL5vzThkOp_lIRww',
    authDomain: 'gl-shoppingcart.firebaseapp.com',
    databaseURL: 'https://gl-shoppingcart.firebaseio.com',
    projectId: 'gl-shoppingcart',
    storageBucket: 'gl-shoppingcart.appspot.com',
    messagingSenderId: '429007400535',
    appId: '1:429007400535:web:7a8e7f53b2e41b58e4bd12',
    measurementId: 'G-5NLWRW7X8P',
  },
};

export const envModules = [
  StoreDevtoolsModule.instrument({
    maxAge: 25, // Retains last 25 states
    logOnly: !environment.production, // Restrict extension to log-only mode
  }),
];

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
