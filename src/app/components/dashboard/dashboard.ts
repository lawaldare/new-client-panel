import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { Clients } from '../clients/clients';

@Component({
  selector: 'app-dashboard',
  imports: [Sidebar, Clients],
  template: `
    <div class="row">
      <div class="col-md-10">
        <app-clients></app-clients>
      </div>
      <div class="col-md-2">
        <app-sidebar></app-sidebar>
      </div>
    </div>
  `,
  styles: [``],
})
export class Dashboard {}
