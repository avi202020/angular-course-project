import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginModel } from '../../../core/models/auth/login.model';
import { AuthService } from '../../../core/services/auth/auth.service';
import { MatDialogRef } from '@angular/material';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent {
  protected loginForm;

  constructor(protected fb: FormBuilder, public dialogRef: MatDialogRef<LoginComponent>) {
    super();

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
   }

  get email() { return this.loginForm.get('email'); }

  get password() { return this.loginForm.get('password'); }

  onNoClick(): void {
    this.dialogRef.close();
  }
  login(): void {
    console.log('asdf');
  }
}
