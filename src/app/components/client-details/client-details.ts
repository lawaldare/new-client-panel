import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client';

@Component({
  selector: 'app-client-details',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './client-details.html',
  styleUrl: './client-details.scss',
})
export class ClientDetails {
  private route = inject(ActivatedRoute);
  private cs = inject(ClientService);
  private router = inject(Router);

  id = signal('');
  client = signal<Client | null>(null);
  hasBalance = signal(false);
  public balance = 0;
  showBalanceUpdateInput = signal(false);

  constructor() {
    this.route.paramMap.subscribe((params) => {
      this.id.set(params.get('id') ?? '');
      this.cs.getClient(this.id()).subscribe((data) => {
        if (data !== null) {
          if (data.balance ?? 0 > 0) {
            this.hasBalance.set(true);
            this.balance = data.balance ?? 0;
          }
        }
        this.client.set(data);
      });
    });
  }

  onDelete() {
    if (confirm('Are you sure?')) {
      this.cs.deleteClient(this.client() ?? {});
      // this.fm.show('Client removed!', {
      //   cssClass: 'alert-success', timeout: 4000
      // });
      this.router.navigate(['/']);
    }
  }

  public updateBalance() {
    this.client.update((c) => ({ ...c, balance: this.balance }));
    this.cs.updateClient(this.client() ?? {});
    // this.fm.show('Balance updated!', {
    //   cssClass: 'alert-success', timeout: 4000
    // })
  }

  public toggleBalanceIcon() {
    this.showBalanceUpdateInput.update((value) => !value);
  }
}
