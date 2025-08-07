// import { Component } from '@angular/core';
// import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { signupDto } from '../Interface/Interface';
// import { AuthServiceService } from '../services/auth-service.service';
// import { Router } from '@angular/router';
// import { NgClass } from '@angular/common';

// @Component({
//   selector: 'app-signup-page',
//   standalone: true,
//   imports: [ReactiveFormsModule, NgClass],
//   templateUrl: './signup-page.component.html',
//   styleUrl: './signup-page.component.scss'
// })
// export class SignupPageComponent {
//   authform: FormGroup = new FormGroup({
//     userName: new FormControl("", [Validators.required]),
//     email: new FormControl("", [Validators.required, Validators.email]),
//     password: new FormControl("", [Validators.required])
//   })
//   constructor(private authService: AuthServiceService, private router: Router) { }

//   onSubmit() {
//     const formData = this.authform.value;
//     let signData: signupDto = {
//       userName: formData.userName,
//       email: formData.email,
//       password: formData.password,
//     };

//     this.authService.signup(signData).subscribe({
//       next: (response) => {
//         console.log(response);
//         this.authform.reset();
//         this.router.navigate(['/parent']);
//       },
//       error: (err) => {
//         console.error(err);

//       }
//     });
//   }
//   showPassword: boolean = false;

//   togglePasswordVisibility() {
//     this.showPassword = !this.showPassword;
//   }

// }

import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { signupDto, LoginDto } from '../Interface/Interface';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, CommonModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent {
  isLoginMode = false; // toggle between login and signup
  showPassword = false;

  authform: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]), // optional in login
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthServiceService, private router: Router) { }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;

    const usernameControl = this.authform.get('userName');
    if (this.isLoginMode) {
      usernameControl?.clearValidators();
    } else {
      usernameControl?.setValidators([Validators.required]);
    }
    usernameControl?.updateValueAndValidity();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    const formData = this.authform.value;

    if (this.isLoginMode) {
      const loginData: LoginDto = {
        userNameOrEmail: formData.email || formData.userName,
        password: formData.password
      };

      this.authService.login(loginData).subscribe({
        next: (response: any) => {
          console.log('Login success', response);
          localStorage.setItem('token', response.token); // optional
          this.authform.reset();
          this.router.navigate(['/parent']);
        },
        // 
        error: (err: any) => {
  console.log('Login error:', err);

  let errorMessage = 'Unexpected error occurred.';

  if (err.status === 401) {
    errorMessage = typeof err.error === 'string'
      ? err.error
      : err.error?.message || 'Wrong credentials';
  } else if (err.status === 500) {
    errorMessage = typeof err.error === 'string'
      ? err.error
      : err.error?.message || 'Server error';
  }

  alert(errorMessage);
}

      });

    } else {
      const signData: signupDto = {
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
      };

      // this.authService.signup(signData).subscribe({
      //   next: (response) => {
      //     console.log('Signup success', response);
      //     this.authform.reset();
      //     this.router.navigate(['/parent']);
      //   },
      //   error: (err) => {
      //     console.error('Signup error', err);
      //   }
      // });
    
    
    this.authService.signup(signData).subscribe({
    next: (response) => {
    console.log('Signup success', response);
    this.authform.reset();
    this.router.navigate(['/parent']);
  },
  error: (err) => {
    console.error('Signup error', err);
    if (err.error === 'Account already exists') {
      alert('Account already exists');
    } else {
      alert('Signup failed.Account already exists.');
    }
  }
});

    }
  }
}

