import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/service/login.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ApiService } from 'src/service/api.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent implements OnInit {
  productForm: FormGroup;
  submitted: boolean = false;
src;
  constructor(
    private login: LoginService,
    private formBuilder: FormBuilder,
    private _api: ApiService,
    private router: Router,
    private sanitizer: DomSanitizer) {
    if (this.login.isAdmin) {
      this.router.navigateByUrl('/home');
    } else {
      this.productForm = this.formBuilder.group({
        'prod_nome': ['', Validators.required],
        'prod_cat': ['', Validators.required],
        'prod_desc': ['', Validators.required],
        'prod_preco': ['', Validators.required],
        'prod_qtd': ['', Validators.required],
        'prod_img': ''
      });
    }
  }

  ngOnInit() {
  }

  get form() {
    return this.productForm.controls;
  }

  onFileChanged(event) {
    const image = new Blob([event.target.files[0]]);
    var reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      this.productForm.controls['prod_img'].setValue(reader.result);
    }
  }

  onSubmit(form: NgForm) {
    this.submitted = true;

    if (this.productForm.invalid) {
      return;
    }

    this._api.createProduct(form).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

}
