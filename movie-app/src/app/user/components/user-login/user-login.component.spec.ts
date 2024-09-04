import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from './user-login.component';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [UserLoginComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the form with email and password controls', () => {
    expect(component.loginForm.contains('email')).toBeTrue();
    expect(component.loginForm.contains('password')).toBeTrue();
  });

  it('should emit form data when the form is valid and submitted', () => {
    spyOn(component.submitForm, 'emit');

    component.loginForm.setValue({
      email: 'ihab@example.com',
      password: 'password123'
    });

    component.onSubmit();

    expect(component.submitForm.emit).toHaveBeenCalledWith({
      email: 'ihab@example.com',
      password: 'password123'
    });
  });

  it('should display the error message if it exists', () => {
    component.errorMessage = 'Invalid email or password';
    fixture.detectChanges();  // Actualise le rendu du template

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.error-message')?.textContent).toContain('Invalid email or password');
  });

  it('should not submit the form if it is invalid', () => {
    spyOn(component.submitForm, 'emit');
    component.loginForm.setValue({
      email: '',
      password: 'password123'
    });

    component.onSubmit();

    expect(component.submitForm.emit).not.toHaveBeenCalled();
  });
});