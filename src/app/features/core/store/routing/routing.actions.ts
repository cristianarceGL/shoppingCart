import { createAction, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export interface Extras {
  path: any[];
  query?: object;
  extras?: NavigationExtras;
}

export const GO = createAction('[NavRouting/API] Go', props<{ payload: Extras }>());
export const BACK = createAction('[NavRouting/API] Back');
export const FORWARD = createAction('[NavRouting/API] Forward');
