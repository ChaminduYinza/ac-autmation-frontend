import { LoginService } from '../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// import sweet alerts
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFormValues: any;
  loginResponse: any;
  invalidLogin: any;

  constructor(
    private loginService: LoginService,
    private formbuilder: FormBuilder,
    private router: Router
  ) {
    if (localStorage.getItem('token')) {
      // logged in so return true
      this.router.navigateByUrl('/home/dashboard');
    }
  }

  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        ]
      ],
      password: [null, Validators.required]
    });
  }

  onLogin() {
    this.loginFormValues = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };

    this.loginService.loginUser(this.loginFormValues).subscribe(
      response => {
        // Successful login
        // show msg
        swal({
          title: 'Welcome to Valve Systems!',
          text: 'You Have successfully logged in.',
          type: 'success',
          showConfirmButton: false,
          timer: 2000
        });

        // navigate to home page
        this.router.navigateByUrl('/home');
      },
      error => {
        // show msg
        swal({
          title: 'Error',
          text: error.data,
          type: 'error',
          showConfirmButton: false,
          timer: 2500
        });
      }
    );
  }
}
