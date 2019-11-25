import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ApiService } from 'src/service/api.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { MustMatch } from '../../helper/must-match.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
  animations: [
    trigger('animate', [
      state('initial', style({
        opacity: 0
      })),
      state('final', style({
        opacity: 1
      })),
      transition('initial=>final', animate('500ms ease-in')),
    ]),
  ]
})
export class RegisterPageComponent implements OnInit {
  userForm: FormGroup;
  userFormSync: NgForm;
  submitted: boolean = false;
  currentState: string = 'initial';

  constructor(
    private _api: ApiService,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.userForm = this.formBuilder.group({
      'usu_nome': ['', Validators.required],
      'usu_senha': ['', [Validators.required, Validators.minLength(6)]],
      'usu_senhaConfirma': ['', Validators.required],
      'usu_email': ['', Validators.required],
      'usu_telefone': ['', Validators.required],
      'usu_endereco': ['', Validators.required],
    }, {
      validator: MustMatch('usu_senha', 'usu_senhaConfirma')
    });
  }

  ngOnInit(): void {
    if (this.currentState = "initial") {
      setTimeout(() => {
        this.currentState = 'final';
      });
    }
  }

  get form() {
    return this.userForm.controls;
  }

  onSubmit(form: NgForm) {
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }

    this._api.createUser(form).subscribe(res => {
      if (res['message'] === "Duplicate entry") {
        this.userForm.controls['usu_email'].setErrors({ invalid: true });
      } else {
        this.router.navigateByUrl("/login");
      }
    }, err => {
      console.log(err);
    });
  }
}
