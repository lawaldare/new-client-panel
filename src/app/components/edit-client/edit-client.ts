import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClientService } from '../../services/client';
import { SettingsService } from '../../services/settings';
import { Client } from '../../models/client';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-client',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-client.html',
  styleUrl: './edit-client.scss',
})
export class EditClient implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private clientService = inject(ClientService);
  private settingsService = inject(SettingsService);

  public id = signal('');
  public client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  };

  public clientDataSet = signal(false);

  public disableBalanceOnEdit = signal(false);

  constructor() {
    this.route.paramMap.subscribe((params) => {
      this.id.set(params.get('id') ?? '');
      this.clientService.getClient(this.id()).subscribe((data) => {
        if (data) {
          this.client = data;
          this.clientDataSet.set(true);
        }
      });
    });
    this.disableBalanceOnEdit.set(this.settingsService.getSettings().disableBalanceOnEdit ?? false);
  }

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      // this.fm.show('Please fill out the form correctly', {
      //   cssClass: 'alert-danger', timeout: 4000
      // })
    } else {
      form.value.id = this.id();
      this.clientService.updateClient(form.value);
      this.router.navigate(['/']);
      // this.fm.show('Client Updated', {
      //   cssClass: 'alert-success', timeout: 4000
      // })
      this.router.navigate(['/client/' + this.id]);
    }
  }
}
