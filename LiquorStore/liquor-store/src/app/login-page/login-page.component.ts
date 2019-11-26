import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { LoginService } from 'src/service/login.service';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  animations: [
    trigger('animate', [
      state('initial', style({
        opacity: 0
      })),
      state('final', style({
        opacity: 1
      })),
      transition('initial=>final', animate('250ms ease-in')),
    ]),
  ]
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  currentState: string = 'initial';

  constructor(private login: LoginService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'usu_email': ['', Validators.required],
      'usu_senha': ['', Validators.required],
      'remember_me': ['']
    });

    if (this.currentState = "initial") {
      setTimeout(() => {
        this.currentState = 'final';
      });
    }

    
    if (localStorage.getItem('Email') !== null) {
      this.loginForm.setValue({
        'usu_email': localStorage.getItem('Email'),
        'usu_senha': localStorage.getItem('Password'),
        'remember_me': ''
      });
    }
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit(form: NgForm) {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    if (this.loginForm.value['remember_me'] === true) {
      localStorage.setItem('Email', this.loginForm.value['usu_email']);
      localStorage.setItem('Password', this.loginForm.value['usu_senha']);
    } else {
      localStorage.clear();
      localStorage.clear();
    }

    this.login.userLogin(form).subscribe(res => {
      if (res['message'] === "User not found") {
        this.loginForm.controls['usu_email'].setErrors({ invalid: true });
        this.loginForm.controls['usu_senha'].setErrors({ invalid: true });
      } else {
        this.login.user = res;
        this.login.isLogged = true;

        if(res[0].usu_perfil === 'Admin') {
          this.login.isAdmin = true;
        }

        this.router.navigateByUrl("/home");
      }
    }, err => {
      console.log(err);
    });
  }
}
