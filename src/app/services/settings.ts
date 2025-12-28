import { Injectable } from '@angular/core';
import { ISettings } from '../models/settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  settings: ISettings = {
    allowRegistration: true,
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: true,
  };

  constructor() {
    if (localStorage.getItem('settings') !== null) {
      this.settings = JSON.parse(localStorage.getItem('settings') ?? '');
    }
  }

  public getSettings(): ISettings {
    return this.settings;
  }

  public changeSettings(settings: ISettings) {
    localStorage.setItem('settings', JSON.stringify(settings));
  }
}
