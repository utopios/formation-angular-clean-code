import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserLoginContainerComponent } from './login.component';
import { UserService } from '../../services/user.service';
import { of, throwError } from 'rxjs';
import { UserLoginComponent } from '../../components/user-login/user-login.component';

describe('UserLoginContainerComponent', () => {
  let component: UserLoginContainerComponent;
  let fixture: ComponentFixture<UserLoginContainerComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['login']);

    await TestBed.configureTestingModule({
      declarations: [UserLoginContainerComponent, UserLoginComponent],
      providers: [{ provide: UserService, useValue: mockUserService }]
    }).compileComponents();

    fixture = TestBed.createComponent(UserLoginContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call the login method in UserService when form is submitted', () => {
    const mockUser = { email: 'john@example.com', password: 'password123' };
    mockUserService.login.and.returnValue(of(mockUser));

    component.onLoginSubmit(mockUser);

    expect(mockUserService.login).toHaveBeenCalledWith(mockUser);
  });

  it('should handle login errors', () => {
    const mockUser = { email: 'john@example.com', password: 'password123' };
    mockUserService.login.and.returnValue(throwError(() => new Error('Login failed')));

    component.onLoginSubmit(mockUser);

    expect(component.errorMessage).toBe('Login failed');
  });
});