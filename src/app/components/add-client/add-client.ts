import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client';
import { SettingsService } from '../../services/settings';

@Component({
  selector: 'app-add-client',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './add-client.html',
  styleUrl: './add-client.scss',
})
export class AddClient implements OnInit {
  private router = inject(Router);
  private clientService = inject(ClientService);
  private settingsService = inject(SettingsService);

  public client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  };

  public disableBalanceOnAdd = signal(false);

  ngOnInit(): void {
    this.disableBalanceOnAdd.set(this.settingsService.getSettings().disableBalanceOnAdd ?? false);
  }

  public saveClient(form: NgForm) {
    console.log(form.value);
    if (this.disableBalanceOnAdd()) {
      form.value.balance = 0;
    }

    if (!form.valid) {
      // this.flashMsg.show('Please fill out the form correctly', {
      //   cssClass: 'alert-danger', timeout: 4000
      // })
      alert('Please fill out the form correctly');
    } else {
      this.clientService.newClient(form.value);
      this.router.navigate(['/']);
      // this.flashMsg.show('New Client Added', {
      //   cssClass: 'alert-success', timeout: 4000
      // })
    }
  }
}
