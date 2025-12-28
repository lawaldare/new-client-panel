import { Component, computed, inject } from '@angular/core';
import { ClientService } from '../../services/client';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-clients',
  imports: [CommonModule, RouterModule],
  templateUrl: './clients.html',
  styleUrl: './clients.scss',
})
export class Clients {
  private readonly clientService = inject(ClientService);
  public clients = toSignal(this.clientService.getClients(), { initialValue: [] });
  public totalOwed = computed(() => {
    const clients = this.clients();
    return clients.reduce((total, client) => total + Number(client.balance), 0);
  });
}
