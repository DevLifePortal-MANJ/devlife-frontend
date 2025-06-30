import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  imports:[RouterModule,CommonModule,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginForm: FormGroup;
  loginError = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required]
    });
  }
  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const username = this.loginForm.value.username;

    this.userService.login(username).subscribe({
      next: () => {
        this.loginError = false;
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.loginError = true;
      }
    });
  }

}
