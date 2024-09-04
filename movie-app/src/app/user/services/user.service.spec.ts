import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should allow a user to register with a name, email, and password', () => {
    const mockUser = { name: 'John', email: 'john@example.com', password: 'password123' };
    
    service.register(mockUser).subscribe((response: any) => {
      expect(response).toEqual(mockUser);
    });

    const req = httpMock.expectOne('/api/register');
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });

  it('should not allow registration with an already used email', () => {
    const mockError = { message: 'Email already exists' };
    const mockUser = { name: 'John', email: 'john@example.com', password: 'password123' };

    service.register(mockUser).subscribe({
      next: () => fail('should have failed with the email already exists error'),
      error: (error: { message: any; }) => {
        expect(error.message).toBe(mockError.message);
      }
    });

    const req = httpMock.expectOne('/api/register');
    req.flush(mockError, { status: 400, statusText: 'Bad Request' });
  });

  it('should allow a user to login with correct email and password', () => {
    const mockUser = { email: 'john@example.com', password: 'password123' };

    service.login(mockUser).subscribe((response: { email: any; }) => {
      expect(response.email).toBe(mockUser.email);
    });

    const req = httpMock.expectOne('/api/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });

  it('should not allow login with incorrect email or password', () => {
    const mockError = { message: 'Invalid credentials' };
    const mockUser = { email: 'wrong@example.com', password: 'wrongpassword' };

    service.login(mockUser).subscribe({
      next: () => fail('should have failed with invalid credentials'),
      error: (error: { message: any; }) => {
        expect(error.message).toBe(mockError.message);
      }
    });

    const req = httpMock.expectOne('/api/login');
    req.flush(mockError, { status: 401, statusText: 'Unauthorized' });
  });

  it('should allow a logged-in user to update profile information', () => {
    const updatedUser = { name: 'John Updated', email: 'john.updated@example.com' };

    service.updateProfile(updatedUser).subscribe((response: { name: any; }) => {
      expect(response.name).toBe(updatedUser.name);
    });

    const req = httpMock.expectOne('/api/profile');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedUser);
  });

  it('should not allow updating email to one that is already in use', () => {
    const mockError = { message: 'Email already exists' };
    const updatedUser = { name: 'John', email: 'existing@example.com' };

    service.updateProfile(updatedUser).subscribe({
      next: () => fail('should have failed with the email already exists error'),
      error: (error: { message: any; }) => {
        expect(error.message).toBe(mockError.message);
      }
    });

    const req = httpMock.expectOne('/api/profile');
    req.flush(mockError, { status: 400, statusText: 'Bad Request' });
  });
});