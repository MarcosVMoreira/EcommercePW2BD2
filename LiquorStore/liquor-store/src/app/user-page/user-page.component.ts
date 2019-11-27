import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Md5 } from 'ts-md5/dist/md5';
import { Router } from '@angular/router';

import { MustMatch } from '../../helper/must-match.validator';
import { UserService } from 'src/service/user.service';
import { LoginService } from 'src/service/login.service';
import { User } from 'src/model/user';

const md5 = new Md5();

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
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
export class UserPageComponent implements OnInit {
  userForm: FormGroup;
  userFormSync: NgForm;
  submitted: boolean = false;
  currentState: string = 'initial';
  change_password: boolean;

  usu_nome: string;
  usu_email: string;
  usu_telefone: number;
  usu_endereco: string;
  usu_senha: string;

  constructor(
    private userApi: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private login: LoginService) {
    if (this.login.isLogged) {
      this.usu_nome = this.login.user[0].usu_nome;
      this.usu_email = this.login.user[0].usu_email;
      this.usu_telefone = this.login.user[0].usu_telefone;
      this.usu_endereco = this.login.user[0].usu_endereco;
      this.usu_senha = this.login.user[0].usu_senha;
    } else {
      this.login.redirect();
    }
  }

  ngOnInit(): void {
    this.change_password = true;

    this.userForm = this.formBuilder.group({
      'usu_nome': [this.usu_nome, Validators.required],
      'usu_senha': [{ value: '', disabled: !this.change_password }, [Validators.required, Validators.minLength(6)]],
      'usu_senhaConfirma': [{ value: '', disabled: !this.change_password }, Validators.required],
      'usu_telefone': [this.usu_telefone, Validators.required],
      'usu_endereco': [this.usu_endereco, Validators.required],
      'change_password': this.change_password
    }, {
      validators: MustMatch('usu_senha', 'usu_senhaConfirma')
    });

    if (this.currentState = "initial") {
      setTimeout(() => {
        this.currentState = 'final';
      });
    }
  }

  handleChange(value: boolean) {
    const senha = this.userForm.get('usu_senha');
    const senhaConfirma = this.userForm.get('usu_senhaConfirma');

    if (value) {
      senha.enable();
      senhaConfirma.enable();
    } else {
      senha.disable();
      senhaConfirma.disable();
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

    this.userApi.updateUser(this.login.user[0].usu_id, form).subscribe(() => {
      this.login.userUpdate();
    }, err => {
      console.log(err);
    });

    this.router.navigateByUrl('/home')
  }
}
