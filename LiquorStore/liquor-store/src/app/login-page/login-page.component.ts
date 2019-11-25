import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { LoginService } from 'src/service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;

  constructor(private login: LoginService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'usu_email': ['', Validators.required],
      'usu_senha': ['', Validators.required]
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit(form: NgForm) {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.login.userLogin(form).subscribe(res => {
      if (res['message'] === "User not found") {
        this.loginForm.controls['usu_email'].setErrors({ invalid: true });
        this.loginForm.controls['usu_senha'].setErrors({ invalid: true });
      } else {
        this.login.user = res;
        this.login.isLogged = true;
        this.router.navigateByUrl("/home");
      }
    }, err => {
      console.log(err);
    });
  }
}
