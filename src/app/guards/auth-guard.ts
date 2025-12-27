import { inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const afAuth = inject(AngularFireAuth);
  return afAuth.authState.pipe(
    map((auth) => {
      if (!auth) {
        router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    })
  );
};
