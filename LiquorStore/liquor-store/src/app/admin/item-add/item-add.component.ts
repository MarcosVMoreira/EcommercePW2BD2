import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

import { LoginService } from 'src/service/login.service';
import { ProductService } from 'src/service/product.service';
import { Category } from 'src/model/category';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent implements OnInit {
  productForm: FormGroup;
  categories: Category[];
  submitted: boolean = false;

  constructor(
    private login: LoginService,
    private formBuilder: FormBuilder,
    private productApi: ProductService,
    private router: Router) {
    if (!this.login.isAdmin) {
      this.login.redirect();
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
    this.productApi.getCategories().subscribe(res => {
      this.categories = res;
    }, err => {
      console.log(err);
    });
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

    this.productApi.createProduct(form.value).subscribe(err => {
      console.log(err);
    });

    if (this.getSection() === '/admin/item-add')
      this.router.navigateByUrl('/admin/item-add-new')
    else
      this.router.navigateByUrl('/admin/item-add')
  }

  getSection() {
    return this.router.url;
  }
}
