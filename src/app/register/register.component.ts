import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PasswordValidator } from '../validators/password.validator';
import { Router } from '@angular/router';
import * as firebase from "firebase";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthenticationService]
})
export class RegisterComponent implements OnInit {
  private user;
  registrationForm: FormGroup;
  matching_passwords_group: FormGroup;

  registration_validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'confirmPassword': [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ]
  }

  constructor(public authService: AuthenticationService, private fb: FormBuilder, public router: Router) { }

  ngOnInit() {
    this.createForms();
  }

  ngDoCheck() {
    this.user = firebase.auth().currentUser;
  }

  createForms() {
    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirmPassword: new FormControl('', Validators.required)
      }, (formGroup: FormGroup) => {
        return PasswordValidator.areEqual(formGroup);
    });

    this.registrationForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      matching_passwords: this.matching_passwords_group
    });
  }

  onSubmitRegistration(value) { }

  runRegisterUser(email: string, password: string) {
    this.authService.registerUser(email, password);

    if (this.authService.registrationSuccess) {
      this.router.navigate(['decks']);
    }
  }
}
