import { inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { SettingsService } from '../services/settings';

export const registerGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const afAuth = inject(AngularFireAuth);
  const settings = inject(SettingsService);
  if (settings.getSettings().allowRegistration) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
