import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

import { LoginService } from 'src/service/login.service';
import { ProductService } from 'src/service/product.service';
import { Category } from 'src/model/category';

import {Product} from 'src/model/product'
@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  productForm: FormGroup;
  dataProduct: Product;
  categories: Category[];
  submitted: boolean = false;
  prod_id: number;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
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
    this.prod_id = this.route.snapshot.params['prod_id'];
    this.productService.getCategories().subscribe(res => {
      this.categories = res;
      this.loadProduct();
    }, err => {
      console.log(err);
    });
  }

  
  loadProduct() {
    this.productService.getProductById(this.prod_id).subscribe(res => {
      this.dataProduct = res;
      this.loadForm();
    }, err => {
      console.log(err);
    });
  }

  loadForm() {
    this.productForm.controls['prod_nome'].setValue(this.dataProduct[0].prod_nome);
    this.productForm.controls['prod_categoria'].setValue(this.dataProduct[0].prod_categoria);
    this.productForm.controls['prod_descricao'].setValue(this.dataProduct[0].prod_descricao);
    this.productForm.controls['prod_preco'].setValue(this.dataProduct[0].prod_preco);
    this.productForm.controls['prod_quantidade'].setValue(this.dataProduct[0].prod_quantidade);
    this.productForm.controls['prod_imagem'].setValue(this.dataProduct[0].prod_imagem);
    
  }
  get form() {
    return this.productForm.controls;
  }

  onFileChanged(event) {
    const image = new Blob([event.target.files[0]]);
    var reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      this.productForm.controls['prod_imagem'].setValue('');
      this.productForm.controls['prod_imagem'].setValue(reader.result);
    }
  }

  editProduct(form: NgForm) {
    this.submitted = true;

    if (this.productForm.invalid) {
      return;
    }

    this.productService.updateProduct(this.prod_id, form).subscribe(res => {
      this.router.navigate(['/admin/item-list']);
    }, err => {
      console.log(err);
    });
  }

  getSection() {
    return this.router.url;
  }
}
