import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SettingsService } from '../../services/settings';
import { ISettings } from '../../models/settings';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [RouterModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  private router = inject(Router);
  private settingsService = inject(SettingsService);
  public settings!: ISettings;

  ngOnInit(): void {
    this.settings = this.settingsService.getSettings();
  }

  onSubmit() {
    this.settingsService.changeSettings(this.settings);
    // this.flashMsg.show('Settings saved!', {
    //   cssClass: 'alert-success', timeout: 4000
    // })
  }
}
