import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { User } from '@app/features/auth/models';

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

  constructor(private afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user === null) {
        this.router.navigate([`auth`]);
      }
    });
  }

  public async logIn(authenticate: any): Promise<any> {
    return await this.afAuth.auth
      .signInWithEmailAndPassword(authenticate.email, authenticate.password)
      .then(user => user.user)
      .catch(_ => console.log('error while looging user in'));
  }

  public async logOut(): Promise<void> {
    await this.afAuth.auth
      .signOut()
      .then(_ => console.log('user successfully loged out'))
      .catch(_ => console.log('error while looging user out'));
  }
}
