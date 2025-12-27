import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly afAuth = inject(AngularFireAuth);
  public login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password).then(
        (userData) => resolve(userData),
        (err) => reject(err)
      );
    });
  }

  public getAuth() {
    return this.afAuth.authState.pipe(map((auth) => auth));
  }

  public register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(email, password).then(
        (userData) => resolve(userData),
        (err) => reject(err)
      );
    });
  }

  public logout() {
    this.afAuth.signOut();
  }
}
