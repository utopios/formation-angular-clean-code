import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserLoginComponent } from '../../components/user-login/user-login.component';

@Component({
  selector: 'app-user-login-container',
  templateUrl:'login.component.html',
  standalone: true,
  imports: [UserLoginComponent]
})
export class UserLoginContainerComponent {
  errorMessage: string | null = null;

  constructor(private userService: UserService) {}

  onLoginSubmit(userData: { email: string, password: string }) {
    this.userService.login(userData).subscribe({
      next: () => {
        // Connexion réussie, rediriger ou afficher un message de succès
      },
      error: (err) => {
        this.errorMessage = err.message || 'Login failed';
      }
    });
  }
}