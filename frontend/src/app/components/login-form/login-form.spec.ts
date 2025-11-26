import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginForm } from './login-form';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

fdescribe('LoginForm', () => {
  let component: LoginForm;
  let fixture: ComponentFixture<LoginForm>;
  
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logIn', 'saveToken']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    authServiceSpy.logIn.and.returnValue(of({ token: 'fake-token' }));

    await TestBed.configureTestingModule({
      imports: [LoginForm],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should call AuthService.logIn with form data', () => {
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'test123'
    });

    component.logInUser(new Event('submit'));

    expect(authServiceSpy.logIn).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'test123'
    });
  });

  fit('should call AuthService.saveToken with form data', () => {
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'test123'
    });

    component.logInUser(new Event('submit'));

    expect(authServiceSpy.saveToken).toHaveBeenCalledWith('fake-token');
  });

  fit('should call Router to navigate to /home on successful login', () => {
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'test123'
    });

    component.logInUser(new Event('submit'));

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });

});
