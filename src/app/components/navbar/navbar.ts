import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { SettingsService } from '../../services/settings';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  private auth = inject(AuthService);
  private settingsService = inject(SettingsService);
  private router = inject(Router);

  public isLoggedIn = signal(false);
  public loggedInUser = signal<string | null>(null);
  public showRegister = signal(true);

  ngOnInit(): void {
    this.auth.getAuth().subscribe((auth) => {
      if (auth) {
        this.isLoggedIn.set(true);
        this.loggedInUser.set(auth.email);
      } else {
        this.isLoggedIn.set(false);
      }
    });
    this.showRegister.set(this.settingsService.getSettings().allowRegistration ?? false);
  }

  public logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
    // this.flashMsg.show('You are now logout', {
    //   cssClass: 'alert-success', timeout: 4000
    // })
  }
}
