import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router) as Router;

  loginForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  error = signal<string>('');
  isLoading = signal<boolean>(false);

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading.set(true);
    this.error.set('');

    // Simulate network delay for effect
    setTimeout(() => {
      const { username, password } = this.loginForm.getRawValue();
      const success = this.authService.login(username, password);

      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.error.set('Invalid credentials. Please try again.');
        this.isLoading.set(false);
      }
    }, 800);
  }
}