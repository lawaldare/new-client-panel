import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);

  password!: string;
  email!: string;
  loading: boolean = false;

  ngOnInit(): void {
    this.auth.getAuth().subscribe((auth) => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit() {
    this.loading = true;
    this.auth
      .login(this.email, this.password)
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
