import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  template: `
    <a routerLink="client/add" class="btn btn-success btn-block">
      <i class="fa fa-plus"></i> New
    </a>
  `,
  styles: [``],
})
export class Sidebar {}
