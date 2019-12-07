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
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router) {
    if (!this.loginService.isAdmin) {
      this.loginService.redirect();
    } else {
      this.productForm = this.formBuilder.group({
        'prod_nome': ['', Validators.required],
        'prod_categoria': ['', Validators.required],
        'prod_descricao': ['', Validators.required],
        'prod_preco': ['', Validators.required],
        'prod_quantidade': ['', Validators.required],
        'prod_imagem': ''
      });
    }
  }

  ngOnInit() {
    this.productService.getCategories().subscribe(res => {
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
      this.productForm.controls['prod_imagem'].setValue(reader.result);
    }
  }

  onSubmit(form: NgForm) {
    this.submitted = true;

    if (this.productForm.invalid) {
      return;
    }

    this.productService.createProduct(form.value).subscribe(err => {
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
