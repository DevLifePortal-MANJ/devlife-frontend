import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user';
import { User, TechStack, ExperienceLevel } from '../../../core/models/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  registerForm: FormGroup;
  registrationError = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      techStack: ['', Validators.required],
      experience: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    const formValue = this.registerForm.value;

    const userPayload: User = {
      username: formValue.username,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      birthDate: formValue.birthDate,
      techStack: this.mapTechStack(formValue.techStack),
      experienceLevel: this.mapExperienceLevel(formValue.experience),
    };

    this.userService.register(userPayload).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('currentUser', JSON.stringify(res.user));
        this.registrationError = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.registrationError = true;
        console.error('Registration error:', err);
      }
    });
  }

  private mapTechStack(stack: string): TechStack {
    switch (stack) {
      case 'React': return TechStack.React;
      case 'Angular': return TechStack.Angular;
      case 'Vue': return TechStack.Vue;
      case '.NET': return TechStack.Net;
      case 'Python': return TechStack.Python;
      default: return TechStack.React;
    }
  }

  private mapExperienceLevel(exp: string): ExperienceLevel {
    switch (exp) {
      case 'Junior': return ExperienceLevel.Junior;
      case 'Middle': return ExperienceLevel.Middle;
      case 'Senior': return ExperienceLevel.Senior;
      default: return ExperienceLevel.Junior;
    }
  }
}
