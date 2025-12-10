import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerData: RegisterRequest = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'CLIENT',
    phone: ''
  };
  errorMessage = '';
  loading = false;
  selectedAvatarFile: File | null = null;
  avatarPreview: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onAvatarSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedAvatarFile = file;
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (!this.registerData.firstName || !this.registerData.lastName || !this.registerData.email || !this.registerData.password) {
      this.errorMessage = 'Please fill in all required fields';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    // If avatar is selected, upload it first
    if (this.selectedAvatarFile) {
      this.authService.uploadAvatar(this.selectedAvatarFile, this.registerData.email).subscribe({
        next: (avatarResponse) => {
          // Set avatar URL and register
          this.registerData.avatarUrl = `https://localhost:8083/api/media/files/${avatarResponse.id}`;
          this.registerUser();
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = 'Failed to upload avatar. Please try again.';
        }
      });
    } else {
      // Register without avatar
      this.registerUser();
    }
  }

  private registerUser(): void {
    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.user.role === 'SELLER') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/products']);
        }
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}
