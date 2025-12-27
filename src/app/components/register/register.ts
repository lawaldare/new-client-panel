import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private auth = inject(AuthService);
  private router = inject(Router);

  password!: string;
  email!: string;
  loading: boolean = false;

  onSubmit() {
    this.loading = true;
    this.auth
      .register(this.email, this.password)
      .then((response) => {
        // this.flashMsg.show('You are now logged in', {
        //   cssClass: 'alert-success', timeout: 4000
        // })
        this.router.navigate(['/']);
        this.loading = false;
      })
      .catch((err) => {
        // this.flashMsg.show(err.message, {
        //   cssClass: 'alert-danger', timeout: 4000
        // })
        this.loading = false;
      });
  }
}
