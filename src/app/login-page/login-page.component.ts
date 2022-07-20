import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CustomValidators } from '../Custom-validator/custom-validator';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent{

  valid:boolean = false;
  loginForm: FormGroup = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password:['', [Validators.required, CustomValidators.minLength(8)]],
      role:[''],
      code:['']
    }
  );

  constructor(
    private formBuilder: FormBuilder,
    private router:Router
  ) { }

  submitForm(): void{
    if(this.loginForm.invalid) return;

    const value = this.loginForm.value;
    console.log(value)
    alert(`${value.role} ${value.email} is logged in`);
    this.router.navigate(['']).then();
  }
}
