import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { UserService } from 'src/service/user.service';

import { MustMatch } from 'src/helper/must-match.validator';
import { Router } from '@angular/router';
import { LoginService } from 'src/service/login.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  userForm: FormGroup;
  userFormSync: NgForm;
  submitted: boolean = false;

  constructor(
    private userApi: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private login: LoginService) {
    if (this.login.isAdmin) {
      this.userForm = this.formBuilder.group({
        'usu_nome': ['', Validators.required],
        'usu_senha': ['', [Validators.required, Validators.minLength(6)]],
        'usu_senhaConfirma': ['', Validators.required],
        'usu_email': ['', Validators.required],
        'usu_telefone': ['', Validators.required],
        'usu_endereco': ['', Validators.required],
        'usu_perfil': ['', Validators.required]
      }, {
        validator: MustMatch('usu_senha', 'usu_senhaConfirma')
      });
    } else {
      this.login.redirect();
    }
  }

  ngOnInit(): void {
  }

  get form() {
    return this.userForm.controls;
  }

  onSubmit(form: NgForm) {
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }

    this.userApi.createUser(form).subscribe(res => {
      if (res['message'] === "Duplicate entry") {
        this.userForm.controls['usu_email'].setErrors({ invalid: true });
      } else {
        this.router.navigateByUrl("/login");
        this.login.userLogout();
      }
    }, err => {
      console.log(err);
    });
  }
}