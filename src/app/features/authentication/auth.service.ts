import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { User, Authenticate } from '@app/features/authentication/models';
import { MatSnackBarComponent } from '@app/shared/controls/controls.module';
import { SubscriptionService } from '@app/features/core/firebase/services/subscription.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public get isAuthenticated$(): Observable<boolean> {
    return this.afAuth.authState.pipe(map(user => user !== null));
  }

  public get currentUser$(): Observable<User | undefined> {
    return this.afAuth.authState.pipe(map(user => user));
  }

  constructor(
    private afAuth: AngularFireAuth,
    public router: Router,
    private subscriptionService: SubscriptionService,
    private snackBar: MatSnackBarComponent
  ) {
    this.afAuth.authState.pipe(takeUntil(this.subscriptionService.unsubscribe$)).subscribe(user => {
      if (user === null) {
        this.router.navigate([`auth`]);
      }
    });
  }

  public async logIn(authenticate: Authenticate): Promise<void | User> {
    return await this.afAuth.auth
      .signInWithEmailAndPassword(authenticate.email, authenticate.password)
      .then(user => user.user)
      .catch(error => {
        this.snackBar.openSnackBar('There is an error with this credentials, try again.', 'Close', 'red-snackbar');
      });
  }

  public async logOut(): Promise<void> {
    await this.afAuth.auth
      .signOut()
      .then(_ => console.log('user successfully loged out'))
      .catch(_ => console.log('error while loging user out'));
  }
}
