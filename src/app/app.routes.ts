import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { authGuard } from './guards/auth-guard';
import { registerGuard } from './guards/register-guard';
import { AddClient } from './components/add-client/add-client';
import { EditClient } from './components/edit-client/edit-client';
import { ClientDetails } from './components/client-details/client-details';
import { Settings } from './components/settings/settings';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Dashboard, canActivate: [authGuard] },
  { path: 'login', component: Login },
  { path: 'register', component: Register, canActivate: [registerGuard] },
  { path: 'client/add', component: AddClient, canActivate: [authGuard] },
  { path: 'client/edit/:id', component: EditClient, canActivate: [authGuard] },
  { path: 'client/:id', component: ClientDetails, canActivate: [authGuard] },
  { path: 'settings', component: Settings, canActivate: [authGuard] },
  { path: '**', component: NotFound },
];
