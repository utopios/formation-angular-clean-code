import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class UserLoginComponent {
  @Output() submitForm = new EventEmitter<{ email: string, password: string }>();
  @Input() errorMessage: string | null = null;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.submitForm.emit(this.loginForm.value);
    }
  }
}