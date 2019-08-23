import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComparePasswordValidator } from '../../validators/comparePasswordValidator/compare-password-validator';
import { UserRegistrationService } from '../../services/user-registration.service';

// import sweet alerts
import swal from 'sweetalert2';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  userRegistrationForm: FormGroup;
  userRegistrationFormValues: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userRegistrationService: UserRegistrationService
  ) {}

  ngOnInit() {
    this.userRegistrationForm = this.formBuilder.group(
      {
        email: [
          null,
          [
            Validators.required,
            Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
          ]
        ],
        password: [null, [Validators.required, Validators.minLength(8)]],
        confirmPassword: [null, Validators.required]
      },
      {
        validator: ComparePasswordValidator.checkIfMatchingPasswords(
          'password',
          'confirmPassword'
        )
      }
    );
  }

  registerUser() {
    this.userRegistrationFormValues = {
      email: this.userRegistrationForm.get('email').value,
      password: this.userRegistrationForm.get('password').value
    };

    this.userRegistrationService
      .registerUser(this.userRegistrationFormValues)
      .subscribe(
        response => {
          // Successful register

          // show msg
          swal({
            title: 'Successful!',
            text: 'You Have successfully created an account!',
            type: 'success',
            showConfirmButton: false,
            timer: 2000
          });

          // navigate to login
          this.router.navigateByUrl('login');
        },
        error => {
          // show msg
          swal({
            title: 'Error',
            text: error.msg,
            type: 'error',
            showConfirmButton: false,
            timer: 2500
          });
        }
      );
  }
}
