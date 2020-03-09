import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { NotificationService } from '@app/features/core/notifications/notification.service';
import { ActionStatus } from '../../common/enums/general.enum';

@Injectable({
  providedIn: 'root',
})
export abstract class FeaturesFacadeService {
  constructor(public notificationService: NotificationService) {}

  public showSuccessMessage(message: string): Observable<boolean> {
    this.notificationService.showSnackBar(message, ActionStatus.Success);
    return of(true);
  }

  public showFailureMessage(message: string): Observable<boolean> {
    this.notificationService.showSnackBar(message, ActionStatus.Failure);
    return of(false);
  }
}
